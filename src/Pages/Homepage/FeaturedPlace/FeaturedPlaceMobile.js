import React from "react";
import VerticalCityItem from "../../../Component/Card/VerticalCityItem";

export default function FeaturedPlaceMobile({ categoryArr }) {
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
      <h2 className="text-lg">Ở bất cứ đâu</h2>
      <div className="grid grid-cols-1 gap-4 py-5">{renderFeaturedPlace()}</div>
    </>
  );
}
