import React, { useEffect, useState } from "react";
import Search from "./Search/Search";
import {
  bgBanner,
  smallHouse,
  houseAboveSea,
  houseNatural,
  dogInBed,
} from "../../assets";
import { locationService } from "../../services/locationService";
import CityList from "./CityList/CityList";
import FeaturedPlace from "./FeaturedPlace/FeaturedPlace";

export default function HomePage() {
  const [locationArr, setLocationArr] = useState([]);
  useEffect(() => {
    locationService
      .getLocation(1)
      .then((res) => {
        console.log('location: ', res);
        setLocationArr(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const categoryArr = [
    { photo: smallHouse, description: "Toàn bộ nhà" },
    { photo: houseAboveSea, description: "Chỗ ở độc đáo" },
    { photo: houseNatural, description: "Trang trại và thiên nhiên" },
    { photo: dogInBed, description: "Cho phép mang thú cưng" },
  ];

  return (
    <>
      <div className="bg-black relative w-screen">
        <div className="absolute inset-x-0">
          <Search locationArr={locationArr} />
        </div>
        <div className="lg:px-10 lg:py-10 py-5">
          <img
            src={bgBanner}
            alt=""
            style={{
              width: "100vw",
              height: "60vh",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
        <h2 className="text-white text-center lg:pb-10 pb-5 lg:text-3xl text-md">
          Trải nghiệm chuyến du lịch tuyệt vời cùng với UITbooking
        </h2>
      </div>
      <div className="container mx-auto lg:p-10 p-5">
        <CityList locationArr={locationArr}></CityList>
      </div>
      <div className="container mx-auto lg:p-10 p-5">
        <FeaturedPlace categoryArr={categoryArr}></FeaturedPlace>
      </div>
    </>
  );
}
