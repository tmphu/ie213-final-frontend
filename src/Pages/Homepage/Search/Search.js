import React from "react";
import { Desktop, Tablet, Mobile } from "../../../HOC/Responsive";
import SearchDesktop from "./SearchDesktop";
import SearchMobile from "./SearchMobile";

export default function Search({ locationArr }) {
  return (
    <>
      <div>
        <Desktop>
          <SearchDesktop locationArr={locationArr}></SearchDesktop>
        </Desktop>
        <Tablet>
          <SearchDesktop locationArr={locationArr}></SearchDesktop>
        </Tablet>
        <Mobile>
          <SearchMobile locationArr={locationArr}></SearchMobile>
        </Mobile>
      </div>
    </>
  );
}
