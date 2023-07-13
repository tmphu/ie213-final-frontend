import React from "react";
import { NavLink } from "react-router-dom";
import { logo } from "../../assets";
import UserNav from "./UserNav";

export default function HeaderTablet({ children }) {
  return (
    <div
      className="w-screen fixed z-10 flex px-10 py-5 justify-between items-center bg-black text-white"
      style={{ height: "60px" }}
    >
      <NavLink to="/">
        <img src={logo} alt="logo" className="h-14" />
      </NavLink>
      <nav>
        <UserNav>{children}</UserNav>
      </nav>
    </div>
  );
}
