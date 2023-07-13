import { Button, Input, message, Space, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import React, { useEffect, useRef, useState } from "react";
import { userAdminService } from "../../services/admin/userAdminService";
import { setLoadingOff } from "../../redux/reducers/loadingReducer";
import { store } from "../..";
import UserAdminModal from "../../Component/Modal/UserAdminModal";

export default function UserAdminPage() {
  const [userArr, setUserArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRow, setTotalRow] = useState(1);

  useEffect(() => {
    let handleDeleteUser = (userId) => {
      userAdminService
        .deleteUser(userId)
        .then((res) => {
          message.success("Xóa người dùng thành công!");
          fetchUserList();
        })
        .catch((err) => {
          store.dispatch(setLoadingOff());
          message.error(err.response.data.content);
        });
    };

    let fetchUserList = () => {
      userAdminService
        .getUserPagination(currentPage)
        .then((res) => {
          setUserArr(res.data.content.data);
          setTotalRow(res.data.content.totalRow);
          let userList = res.data.content.data.map((item, index) => {
            return {
              ...item,
              key: index,
              action: (
                <>
                  <button
                    onClick={() => {
                      handleDeleteUser(item.id);
                    }}
                    className="mx-1 px-2 py-1 rounded bg-red-700 text-white"
                  >
                    Xóa
                  </button>
                  <UserAdminModal
                    userId={item.id}
                    fetchUserList={fetchUserList}
                    action={"edit"}
                  />
                </>
              ),
            };
          });
          setUserArr(userList);
        })
        .catch((err) => {
          console.log("getUserList: ", err);
        });
    };
    fetchUserList();
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

  const columnsUser = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Họ Tên",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
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
      <UserAdminModal userId={null} action={"add"} />
      <Table
        columns={columnsUser}
        dataSource={userArr}
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
