/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";
import UserNav from "./UserNav";
import { logo } from "../../assets";

export default function HeaderDesktop({ children }) {
  return (
    <div
      className="w-screen fixed z-10 flex px-10 py-5 justify-between items-center bg-black text-white"
      style={{ height: "80px" }}
    >
      <NavLink to="/">
        <img src={logo} alt="logo" className="h-20" />
      </NavLink>
      <nav>
        <ul className="flex flex-row gap-x-10">
          <li>Nơi ở</li>
          <li>Trải nghiệm</li>
          <li>Trải nghiệm trực tuyến</li>
        </ul>
      </nav>
      <nav>
        <UserNav>{children}</UserNav>
      </nav>
    </div>
  );
}
