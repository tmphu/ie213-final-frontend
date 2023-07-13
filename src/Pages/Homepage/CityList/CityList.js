import React from "react";
import { Desktop, Tablet, Mobile } from "../../../HOC/Responsive";
import CityListDesktop from "./CityListDesktop";
import CityListTablet from "./CityListTablet";
import CityListMobile from "./CityListMobile";

export default function CityList({ locationArr }) {
  return (
    <>
      <div>
        <Desktop>
          <CityListDesktop locationArr={locationArr}></CityListDesktop>
        </Desktop>
        <Tablet>
          <CityListTablet locationArr={locationArr}></CityListTablet>
        </Tablet>
        <Mobile>
          <CityListMobile locationArr={locationArr}></CityListMobile>
        </Mobile>
      </div>
    </>
  );
}
