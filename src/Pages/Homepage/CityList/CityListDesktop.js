import React from "react";
import HorizontalCityItem from "../../../Component/Card/HorizontalCityItem";

export default function CityListDesktop({ locationArr }) {
  const renderCityList = () => {
    return locationArr.slice(0, 8).map((item, index) => {
      return (
        <HorizontalCityItem
          photo={item.image}
          name={item.city}
          key={index}
        />
      );
    });
  };

  return (
    <>
      <h2 className="text-3xl">Khám phá những điểm đến gần đây</h2>
      <div className="grid grid-cols-4 gap-4 py-5">{renderCityList()}</div>
    </>
  );
}
