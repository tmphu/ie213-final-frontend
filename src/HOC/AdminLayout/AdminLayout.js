import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  GlobalOutlined,
  HomeOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import {
  faGlobe,
  faBars,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLayout.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { userLocalService } from "../../services/localStorageService";

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }) => {
  let userInfo = useSelector((state) => state.userReducer.userInfo);
  const [isShowContextMenu, setIsShowContextMenu] = React.useState(false);
  let navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  let handleLogout = () => {
    userLocalService.removeItem();
    window.location.href = "/";
  };

  const handleMenuClick = (key) => {
    switch (key) {
      case "1":
        navigate("/admin/user");
        break;
      case "2":
        navigate("/admin/location");
        break;
      case "3":
        navigate("/admin/house");
        break;
      case "4":
        navigate("/admin/booking");
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">Admin Dashboard</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => handleMenuClick(key)}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Người dùng",
            },
            {
              key: "2",
              icon: <GlobalOutlined />,
              label: "Vị trí",
            },
            {
              key: "3",
              icon: <HomeOutlined />,
              label: "Phòng thuê",
            },
            {
              key: "4",
              icon: <CreditCardOutlined />,
              label: "Đặt phòng",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="flex flex-row justify-between items-center"
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="mr-4 relative">
            <button
              className="bg-blue-500 text-black px-2 py-1 rounded-2xl flex flex-row gap-x-3 items-center"
              onClick={() => setIsShowContextMenu(!isShowContextMenu)}
            >
              <FontAwesomeIcon icon={faBars} className="text-white" />
              {userInfo.user.avatar ? (
                <img
                  src={userInfo.user.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <FontAwesomeIcon icon={faUserCircle} className="w-8 h-8" />
              )}
            </button>
            {isShowContextMenu && (
              <div className="bg-white shadow-xl text-gray-600 rounded-lg flex flex-col cursor-pointer absolute w-60 right-0 z-10">
                <div className="">
                  <NavLink
                    to={"/"}
                    onClick={() => setIsShowContextMenu(!isShowContextMenu)}
                  >
                    <p className="px-4 hover:bg-gray-200">Về trang chính</p>
                  </NavLink>
                  <hr />
                  <p
                    className="px-4 hover:bg-gray-200"
                    onClick={function () {
                      handleLogout();
                      setIsShowContextMenu(!isShowContextMenu);
                    }}
                  >
                    Thoát
                  </p>
                </div>
              </div>
            )}
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <div>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
