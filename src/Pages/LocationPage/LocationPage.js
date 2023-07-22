import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { map } from "../../assets";
import { houseService } from "../../services/houseService";
import HouseList from "./HouseList/HouseList";
import { useSelector } from 'react-redux';
import moment from 'moment';
import MapContainer from './Map';

export default function LocationPage() {
  const locationInfo = useLocation().state.locationInfo;
  const searchLocation = useSelector((state) => state.locationReducer?.searchLocation);
  const [houseArr, setHouseArr] = React.useState([]);
  const [houseCount, setHouseCount] = useState(0);

  useEffect(() => {
    houseService
      .getHousesByLocationId(locationInfo.id)
      .then((res) => {
        console.log('house', res);
        setHouseArr(res.data.content);
        setHouseCount(res.data.content.length);
      })
      .catch((err) => {
        console.log("getHouses error", err);
      });
  }, [locationInfo.id]);

  return (
    <div className="flex lg:flex-row flex-col container mx-auto lg:p-10 p-5 gap-4">
      <div className="lg:w-2/3">
        <h3 className="lg:text-2xl text-xl">{`Toàn bộ ${houseCount} phòng có sẵn ngày ${moment(searchLocation.startDate).format('DD/MM/YYYY')} - ${moment(searchLocation.endDate).format('DD/MM/YYYY')}`}</h3>
        <h2 className="lg:text-2xl text-xl">
          {`tại địa điểm ${locationInfo.location} - ${locationInfo.city} đã chọn`}
        </h2>
        <div className="grid lg:grid-cols-5 grid-cols-2 lg:gap-4 gap-1 mt-4">
          <button className="bg-blue-700 text-white rounded-lg py-2">
            Loại nơi ở
          </button>
          <button className="bg-blue-700 text-white rounded-lg py-2">
            Giá
          </button>
          <button className="bg-blue-700 text-white rounded-lg py-2">
            Đặt ngay
          </button>
          <button className="bg-blue-700 text-white rounded-lg py-2">
            Phòng ngủ
          </button>
          <button className="bg-blue-700 text-white rounded-lg py-2">
            Bộ lọc khác
          </button>
        </div>
        <hr />
        <HouseList houseArr={houseArr} />
      </div>
      <div className="lg:w-1/3 h-full">
        {/* <img src={map} alt="" className="object-cover" /> */}
        <MapContainer />
      </div>
    </div>
  );
}
