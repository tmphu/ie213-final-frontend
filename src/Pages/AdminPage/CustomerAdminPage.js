import { Button, Input, message, Space, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import React, { useEffect, useRef, useState } from "react";
import { customerAdminService } from "../../services/admin/customerAdminService";
import { setLoadingOff } from "../../redux/reducers/loadingReducer";
import { store } from "../..";
import CustomerAdminModal from "../../Component/Modal/CustomerAdminModal";
import { useSelector } from 'react-redux';

export default function CustomerAdminPage() {
  let userInfo = useSelector((state) => state.userReducer.userInfo);
  const [customerArr, setCustomerArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRow, setTotalRow] = useState(1);

  useEffect(() => {
    let fetchCustomerList = () => {
      customerAdminService
        .getCustomerPagination(currentPage)
        .then((res) => {
          console.log('res', res);
          setCustomerArr(res.data.content.data);
          setTotalRow(res.data.content.totalCount);
          let customerList = res.data.content.data.map((item, index) => {
            return {
              ...item,
              key: index,
              gender: item.gender === 'male' ? 'Nam' : 'Nữ',
              action: (
                <>
                <CustomerAdminModal
                  customerId={item.customer_id}
                  fetchCustomerList={fetchCustomerList}
                  action={"view"}
                />
                </>
              ),
            };
          });
          setCustomerArr(customerList);
        })
        .catch((err) => {
          console.log("getCustomerList: ", err);
        });
    };
    fetchCustomerList();
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

  const columnsCustomer = [
    {
      title: "ID",
      dataIndex: "customer_id",
      key: "customer_id",
      ...getColumnSearchProps("customer_id"),
    },
    {
      title: "Họ",
      dataIndex: "last_name",
      key: "last_name",
      ...getColumnSearchProps("last_name"),
    },
    {
      title: "Tên",
      dataIndex: "first_name",
      key: "first_name",
      ...getColumnSearchProps("first_name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      key: "phone_number",
      ...getColumnSearchProps("phone_number"),
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      ...getColumnSearchProps("gender"),
    },
    {
      title: "Loại Khách",
      dataIndex: "role",
      key: "role",
      ...getColumnSearchProps("role"),
      render: (text) => {
        if (text === "ADMIN") {
          return <Tag color="red">Quản Trị</Tag>;
        } else {
          return <Tag color="green">Khách Hàng</Tag>;
        }
      },
    },
    {
      title: "Điều chỉnh",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <div>
      <Table
        columns={columnsCustomer}
        dataSource={customerArr}
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
