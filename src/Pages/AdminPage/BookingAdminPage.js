import { Button, Input, message, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import React, { useEffect, useRef, useState } from "react";
import { setLoadingOff } from "../../redux/reducers/loadingReducer";
import { store } from "../..";
import BookingAdminModal from "../../Component/Modal/BookingAdminModal";
import { bookingService } from "../../services/admin/bookingService";

export default function BookingAdminPage() {
  const [bookingArr, setBookingArr] = useState([]);

  useEffect(() => {
    let handleDeleteBooking = (bookingId) => {
      bookingService
        .deleteBooking(bookingId)
        .then((res) => {
          message.success("Xóa đặt phòng thành công!");
          fetchBookingList();
        })
        .catch((err) => {
          store.dispatch(setLoadingOff());
          message.error(err.response.data.content);
        });
    };

    let fetchBookingList = () => {
      bookingService
        .getBookings()
        .then((res) => {
          setBookingArr(res.data.content);
          let bookingList = res.data.content.map((item, index) => {
            return {
              ...item,
              key: index,
              action: (
                <>
                  <button
                    onClick={() => {
                      handleDeleteBooking(item.id);
                    }}
                    className="mx-1 px-2 py-1 rounded bg-red-700 text-white"
                  >
                    Xóa
                  </button>
                  <BookingAdminModal
                    bookingId={item.id}
                    fetchBookingList={fetchBookingList}
                    action={"edit"}
                  />
                </>
              ),
            };
          });
          setBookingArr(bookingList);
        })
        .catch((err) => {
          console.log("getBookingList: ", err);
        });
    };
    fetchBookingList();
  }, []);

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

  const columnsBooking = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Mã Phòng",
      dataIndex: "maPhong",
      key: "maPhong",
      ...getColumnSearchProps("maPhong"),
    },
    {
      title: "Ngày Đến",
      dataIndex: "ngayDen",
      key: "ngayDen",
      ...getColumnSearchProps("ngayDen"),
    },
    {
      title: "Ngày Đi",
      dataIndex: "ngayDi",
      key: "ngayDi",
      ...getColumnSearchProps("ngayDi"),
    },
    {
      title: "SL Khách",
      dataIndex: "soLuongKhach",
      key: "soLuongKhach",
    },
    {
      title: "Mã Khách Hàng",
      dataIndex: "maNguoiDung",
      key: "maNguoiDung",
    },
    {
      title: "Điều chỉnh",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <div>
      <BookingAdminModal bookingId={null} action={"add"} />
      <Table columns={columnsBooking} dataSource={bookingArr}></Table>
    </div>
  );
}
