import React from "react";
import { useSelector } from "react-redux";
// import { NavLink } from 'react-router-dom';
import { userLocalService } from "../../services/localStorageService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faBars,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

export default function UserNav() {
  let userInfo = useSelector((state) => state.userReducer.userInfo);
  const [isShowContextMenu, setIsShowContextMenu] = React.useState(false);

  let handleLogout = () => {
    userLocalService.removeItem();
    window.location.href = "/";
  };

  const renderContent = () => {
    // if login
    if (userInfo) {
      return (
        <nav className="relative">
          <ul className="flex flex-row gap-x-5 items-center">
            <li>Đón tiếp khách</li>
            <li>
              <FontAwesomeIcon icon={faGlobe} />
            </li>
            <li>
              <button
                className="bg-white text-black px-2 py-1 rounded-2xl flex flex-row gap-x-3 items-center"
                onClick={() => setIsShowContextMenu(!isShowContextMenu)}
              >
                <FontAwesomeIcon icon={faBars} />
                {userInfo.user.profile_photo ? (
                  <img
                    src={userInfo.user.profile_photo}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUserCircle} className="w-8 h-8" />
                )}
              </button>
            </li>
          </ul>
          {isShowContextMenu && (
            <div className="bg-white shadow-xl text-gray-600 rounded-lg flex flex-col cursor-pointer absolute w-60">
              <div className="py-4">
                <NavLink
                  to={"/my-profile"}
                  onClick={() => setIsShowContextMenu(!isShowContextMenu)}
                >
                  <p className="py-2 px-4 hover:bg-gray-200">Cá nhân</p>
                </NavLink>
                {userInfo.user.role === "ADMIN" ? (
                  <NavLink
                    to={"/admin/user"}
                    onClick={() => setIsShowContextMenu(!isShowContextMenu)}
                  >
                    <p className="py-2 px-4 hover:bg-gray-200">
                      Quản trị website
                    </p>
                  </NavLink>
                ) : (
                  <></>
                )}
                <hr />
                <p
                  className="py-2 px-4 hover:bg-gray-200"
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
        </nav>
      );
    } else {
      return (
        <nav>
          <ul className="flex flex-row gap-x-5 items-center">
            <li>Đón tiếp khách</li>
            <li>
              <FontAwesomeIcon icon={faGlobe} />
            </li>
            <li>
              <button
                className="bg-white text-black px-2 py-1 rounded-2xl flex flex-row gap-x-3 items-center"
                onClick={() => setIsShowContextMenu(!isShowContextMenu)}
              >
                <FontAwesomeIcon icon={faBars} />
                <FontAwesomeIcon icon={faUserCircle} className="w-8 h-8" />
              </button>
            </li>
          </ul>
          {isShowContextMenu && (
            <div className="bg-white shadow-xl text-gray-600 rounded-lg flex flex-col cursor-pointer absolute w-60">
              <div className="py-4">
                <NavLink
                  to={"/login"}
                  onClick={() => setIsShowContextMenu(!isShowContextMenu)}
                >
                  <p className="py-2 px-4 hover:bg-gray-200">Đăng nhập</p>
                </NavLink>
                <NavLink
                  to={"/signup"}
                  onClick={() => setIsShowContextMenu(!isShowContextMenu)}
                >
                  <p className="py-2 px-4 hover:bg-gray-200">Đăng ký</p>
                </NavLink>
              </div>
            </div>
          )}
        </nav>
      );
    }
  };
  return <>{renderContent()}</>;
}
