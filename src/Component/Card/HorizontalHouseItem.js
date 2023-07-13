import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { currencyFormat } from '../../helper/currency';

function HorizontalHouseItem({ houseInfo }) {
  let amenities = `${houseInfo.max_guests} Khách - ${houseInfo.bedrooms} Phòng ngủ - ${houseInfo.beds} Giường - ${houseInfo.bathrooms} Phòng tắm`;

  const a = houseInfo.amenity.map(e => e.name);
  const amenityList = a.join(' - ');
  if (houseInfo.amenity.length !== 0) {
    amenities = amenities + ' - ' + amenityList;
  }
  return (
    <NavLink
      className="flex md:flex-row flex-col border rounded-lg shadow md:max-w-6xl p-5 md:gap-10 gap-5"
      to={`/house/details/${houseInfo.id}`}
    >
      <img
        className="object-cover lg:w-80 lg:h-60 md:w-60 md:h-32 h-44 rounded-md"
        src={houseInfo.HouseImage[0]?.image}
        alt=""
      />
      <div className="w-full flex flex-col justify-between">
        <div className="flex flex-row">
          <div className="w-full">
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              {houseInfo.name}
            </h3>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {amenities}
            </p>
          </div>
          <FontAwesomeIcon
            icon={faHeart}
            className="text-right"
            style={{
              width: "30px",
              height: "30px",
            }}
          />
        </div>
        <p className="text-right text-2xl">
          <span className="font-bold">{currencyFormat.format(houseInfo.price)}</span>/ đêm
        </p>
      </div>
    </NavLink>
  );
}

export default HorizontalHouseItem;
