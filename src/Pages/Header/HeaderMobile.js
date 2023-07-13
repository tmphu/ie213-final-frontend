import React from "react";
import { NavLink } from "react-router-dom";
import { logo } from "../../assets";
import UserNavMobile from "./UserNavMobile";

export default function HeaderMobile({ children }) {
  return (
    <div
      className="w-screen fixed z-10 flex px-2 py-6 justify-between items-center bg-black text-white"
      style={{ height: "40px" }}
    >
      <NavLink to="/">
        <img src={logo} alt="logo" className="h-11" />
      </NavLink>
      <nav>
        <UserNavMobile>{children}</UserNavMobile>
      </nav>
    </div>
  );
}
