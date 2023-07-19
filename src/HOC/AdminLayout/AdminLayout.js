import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  GlobalOutlined,
  HomeOutlined,
  CreditCardOutlined,
  ApiOutlined,
} from "@ant-design/icons";
import {
  faGlobe,
  faBars,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AdminLayout.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { userLocalService } from "../../services/localStorageService";

const { Header, Sider, Content } = Layout;
const items = [
  { key: "1", icon: <UserOutlined />, label: "Khách hàng", path: "/admin/customer" },
  { key: "2", icon: <GlobalOutlined />, label: "Địa điểm", path: "/admin/location" },
  { key: "3", icon: <ApiOutlined />, label: "Tiện nghi", path: "/admin/amenity" },
  { key: "4", icon: <HomeOutlined />,label: "Danh sách phòng", path: "/admin/house" },
  { key: "5", icon: <CreditCardOutlined />, label: "Phòng đã đặt", path: "/admin/booking" },
]

const AdminLayout = ({ children }) => {
  let navigate = useNavigate();
  let location = useLocation();
  let userInfo = useSelector((state) => state.userReducer.userInfo);
  const [isShowContextMenu, setIsShowContextMenu] = React.useState(false);
  const [selectedKey, setSelectedKey] = useState(items.find(_item => location.pathname.startsWith(_item.path)).key);
  
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  let handleLogout = () => {
    userLocalService.removeItem();
    window.location.href = "/";
  };

  const handleMenuClick = (key) => {
    const clicked = items.find(_item => _item.key === key);
    navigate(clicked.path);
  };

  useEffect(() => {
    setSelectedKey(items.find(_item => location.pathname.startsWith(_item.path)).key);
  }, [location])

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">Admin Dashboard</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedKey]}
          onClick={({ key }) => handleMenuClick(key)}
          items={items}
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
              className="bg-blue-700 text-white px-5 py-1 rounded-full flex flex-row gap-x-3 items-center"
              onClick={() => setIsShowContextMenu(!isShowContextMenu)}
            >
              {userInfo.user.avatar ? (
                <img
                  src={userInfo.user.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <FontAwesomeIcon icon={faUserCircle} className="w-8 h-8" />
              )}
              <span className="leading-10">{userInfo.user.email}</span>
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
