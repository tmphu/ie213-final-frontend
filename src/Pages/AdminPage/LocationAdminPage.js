import { Button, Input, message, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import React, { useEffect, useRef, useState } from "react";
import { setLoadingOff } from "../../redux/reducers/loadingReducer";
import { store } from "../..";
import { locationService } from "../../services/locationService";
import LocationAdminModal from "../../Component/Modal/LocationAdminModal";

export default function LocationAdminPage() {
  const [locationArr, setLocationArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRow, setTotalRow] = useState(1);

  useEffect(() => {
    let handleDeleteLocation = (locationId) => {
      locationService
        .deleteLocation(locationId)
        .then((res) => {
          message.success("Xóa vị trí thành công!");
          fetchLocationList();
        })
        .catch((err) => {
          store.dispatch(setLoadingOff());
          message.error(err.response.data.content);
        });
    };

    let fetchLocationList = () => {
      locationService
        .getCityPagination(currentPage) // getLocation
        .then((res) => {
          setLocationArr(res.data.content.data);
          setTotalRow(res.data.content.totalRow);
          let locationList = res.data.content.data.map((item, index) => {
            return {
              ...item,
              key: index,
              hinhAnh: <img src={item.hinhAnh} alt="" className="h-10" />,
              action: (
                <>
                  <button
                    onClick={() => {
                      handleDeleteLocation(item.id);
                    }}
                    className="mx-1 px-2 py-1 rounded bg-red-700 text-white"
                  >
                    Xóa
                  </button>
                  <LocationAdminModal
                    locationId={item.id}
                    fetchLocationList={fetchLocationList}
                    action={"edit"}
                  />
                </>
              ),
            };
          });
          setLocationArr(locationList);
        })
        .catch((err) => {
          console.log("getLocationList: ", err);
        });
    };
    fetchLocationList();
    // window.location.reload();
  }, [currentPage]);

  // Table with Search
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
              color: "indigo",
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#A555EC" : undefined,
          fontSize: "20px",
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columnsLocation = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Tên Vị Trí",
      dataIndex: "tenViTri",
      key: "tenViTri",
      ...getColumnSearchProps("tenViTri"),
    },
    {
      title: "Tỉnh Thành",
      dataIndex: "tinhThanh",
      key: "tinhThanh",
      ...getColumnSearchProps("tinhThanh"),
    },
    {
      title: "Quốc Gia",
      dataIndex: "quocGia",
      key: "quocGia",
      ...getColumnSearchProps("quocGia"),
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
    },
    {
      title: "Điều chỉnh",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <div>
      <LocationAdminModal locationId={null} action={"add"} />
      <Table
        columns={columnsLocation}
        dataSource={locationArr}
        pagination={{
          current: currentPage,
          onChange: (page) => setCurrentPage(page),
          pageSize: 10,
          total: totalRow,
        }}
      ></Table>
    </div>
  );
}
