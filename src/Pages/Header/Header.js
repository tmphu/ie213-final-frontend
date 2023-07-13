import React from "react";
import { Desktop, Tablet, Mobile } from "../../HOC/Responsive";
import HeaderDesktop from "./HeaderDesktop";
import HeaderTablet from "./HeaderTablet";
import HeaderMobile from "./HeaderMobile";

export default function Header({ children }) {
  return (
    <>
      <div>
        <Desktop>
          <HeaderDesktop children={children}></HeaderDesktop>
        </Desktop>
        <Tablet>
          <HeaderTablet children={children}></HeaderTablet>
        </Tablet>
        <Mobile>
          <HeaderMobile children={children}></HeaderMobile>
        </Mobile>
      </div>
    </>
  );
}
