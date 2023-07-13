import React from "react";
import { Desktop, Tablet, Mobile } from "../../../HOC/Responsive";
import FeaturedPlaceDesktop from "./FeaturedPlaceDesktop";
import FeaturedPlaceTablet from "./FeaturedPlaceTablet";
import FeaturedPlaceMobile from "./FeaturedPlaceMobile";

export default function FeaturedPlace({ categoryArr }) {
  return (
    <>
      <div>
        <Desktop>
          <FeaturedPlaceDesktop categoryArr={categoryArr}></FeaturedPlaceDesktop>
        </Desktop>
        <Tablet>
          <FeaturedPlaceTablet categoryArr={categoryArr}></FeaturedPlaceTablet>
        </Tablet>
        <Mobile>
          <FeaturedPlaceMobile categoryArr={categoryArr}></FeaturedPlaceMobile>
        </Mobile>
      </div>
    </>
  );
}
