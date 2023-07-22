import { Button, Input, message, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import React, { useEffect, useRef, useState } from "react";
import { setLoadingOff } from "../../redux/reducers/loadingReducer";
import { store } from "../..";
import { locationService } from "../../services/locationService";
import LocationAdminModal from "../../Component/Modal/LocationAdminModal";
import { useSelector } from 'react-redux';

export default function LocationAdminPage() {
  let userInfo = useSelector((state) => state.userReducer.userInfo);
  const [locationArr, setLocationArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);

  useEffect(() => {
    let fetchLocationList = () => {
      locationService
        .getLocation(currentPage) // getLocation
        .then((res) => {
          console.log('res', res);
          setLocationArr(res.data.content.data);
          setTotalCount(res.data.content.totalCount);
          let locationList = res.data.content.data.map((item, index) => {
            return {
              ...item,
              key: index,
              image: <img src={item.image} alt="" className="h-10" />,
              action: (
                <>
                {["ADMIN", "HOST"].includes(userInfo.user.role) ? (
                  <>
                  <LocationAdminModal
                    locationId={item.id}
                    fetchLocationList={fetchLocationList}
                    action={"edit"}
                  />
                  </>
                ) : null}
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
      title: "Tên địa điểm",
      dataIndex: "location",
      key: "location",
      ...getColumnSearchProps("location"),
    },
    {
      title: "Tỉnh Thành",
      dataIndex: "city",
      key: "city",
      ...getColumnSearchProps("city"),
    },
    {
      title: "Hình Ảnh",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Điều chỉnh",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <div>
      {(["ADMIN", "HOST"].includes(userInfo.user.role)) ? <LocationAdminModal locationId={null} action={"add"} /> : null}
      <Table
        columns={columnsLocation}
        dataSource={locationArr}
        pagination={{
          current: currentPage,
          onChange: (page) => setCurrentPage(page),
          pageSize: 10,
          total: totalCount,
        }}
      ></Table>
    </div>
  );
}
