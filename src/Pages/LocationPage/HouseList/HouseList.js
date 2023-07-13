import React from "react";
import { Desktop, Tablet, Mobile } from "../../../HOC/Responsive";
import HouseListDesktop from "./HouseListDesktop";
import HouseListTablet from "./HouseListTablet";
import HouseListMobile from "./HouseListMobile";

export default function HouseList({ houseArr }) {
  return (
    <>
      <div>
        <Desktop>
          <HouseListDesktop houseArr={houseArr}></HouseListDesktop>
        </Desktop>
        <Tablet>
          <HouseListTablet houseArr={houseArr}></HouseListTablet>
        </Tablet>
        <Mobile>
          <HouseListMobile houseArr={houseArr}></HouseListMobile>
        </Mobile>
      </div>
    </>
  );
}
