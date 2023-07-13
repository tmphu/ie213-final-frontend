import React from "react";
import VerticalCityItem from "../../../Component/Card/VerticalCityItem";

export default function FeaturedPlaceDesktop({ categoryArr }) {
  const renderFeaturedPlace = () => {
    return categoryArr.map((item, index) => {
      return (
        <VerticalCityItem
          photo={item.photo}
          description={item.description}
          key={index}
        />
      );
    });
  };

  return (
    <>
      <h2 className="text-3xl">Ở bất cứ đâu</h2>
      <div className="grid grid-cols-4 gap-40 py-5">{renderFeaturedPlace()}</div>
    </>
  );
}
