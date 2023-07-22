import { Button, Input, message, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import React, { useEffect, useRef, useState } from "react";
import { setLoadingOff } from "../../redux/reducers/loadingReducer";
import { store } from "../..";
import HouseAdminModal from "../../Component/Modal/HouseAdminModal";
import { houseService } from "../../services/houseService";
import { currencyFormat } from '../../helper/currency';
import { useSelector } from 'react-redux';

export default function HouseAdminPage() {
  let userInfo = useSelector((state) => state.userReducer.userInfo);
  const [houseArr, setHouseArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);

  useEffect(() => {
    let handleDeleteHouse = (houseId) => {
      houseService
        .deleteHouse(houseId)
        .then((res) => {
          message.success("Xóa phòng thành công!");
          fetchHouseList();
        })
        .catch((err) => {
          store.dispatch(setLoadingOff());
          message.error(err.response.data.content);
        });
    };

    let fetchHouseList = (hostId) => {
      houseService
        .getHousePagination(hostId, currentPage)
        .then((res) => {
          setTotalCount(res.data.content.totalCount);
          let houseList = res.data.content.data.map((item, index) => {
            return {
              ...item,
              key: index,
              location: item.location.location,
              image: <img src={item.HouseImage[0].image} alt="" className="h-10" />,
              price: <span>{currencyFormat.format(item.price)}</span>,
              action: (
                <>
                {["ADMIN", "HOST"].includes(userInfo.user.role) ? (
                  <>
                  <HouseAdminModal
                    houseId={item.id}
                    hostId={hostId}
                    fetchHouseList={fetchHouseList}
                    action={"edit"}
                  />
                  </>
                ) : null}
                </>
              ),
            };
          });
          setHouseArr(houseList);
        })
        .catch((err) => {
          console.log("gethouseList: ", err);
        });
    };
    fetchHouseList(userInfo.user.id);
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

  const columnsHouse = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Tên Phòng",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
      key: "location",
      ...getColumnSearchProps("location"),
    },
    {
      title: "Giá Tiền",
      dataIndex: "price",
      key: "price",
      ...getColumnSearchProps("price"),
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
      {(["ADMIN", "HOST"].includes(userInfo.user.role)) ? <HouseAdminModal houseId={null} hostId={userInfo.user.id} action={"add"} /> : null}
      <Table
        columns={columnsHouse}
        dataSource={houseArr}
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
