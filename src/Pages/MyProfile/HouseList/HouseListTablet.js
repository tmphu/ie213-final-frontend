import React from "react";
import HorizontalHouseItem from "../../../Component/Card/HorizontalHouseItem";

export default function HouseListTablet({ houseArr }) {
  const renderHouseList = () => {
    return houseArr.map((item, index) => {
      return <HorizontalHouseItem houseInfo={item} key={index} />;
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 py-5">{renderHouseList()}</div>
    </>
  );
}
