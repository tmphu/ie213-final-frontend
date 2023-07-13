import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { map } from "../../assets";
import { houseService } from "../../services/houseService";
import HouseList from "./HouseList/HouseList";

export default function LocationPage() {
  let locationInfo = useLocation().state.locationInfo;
  const [houseArr, setHouseArr] = React.useState([]);

  useEffect(() => {
    houseService
      .getHousesByLocationId(locationInfo.id)
      .then((res) => {
        console.log('house', res);
        setHouseArr(res.data.content);
      })
      .catch((err) => {
        console.log("getHouses error", err);
      });
  }, [locationInfo.id]);

  return (
    <div className="flex lg:flex-row flex-col container mx-auto lg:p-10 p-5 gap-4">
      <div className="lg:w-2/3">
        <h3 className="lg:text-2xl text-xl">Hơn 300 chỗ ở 16/04 - 14/05</h3>
        <h2 className="lg:text-2xl text-xl">
          Chỗ ở tại địa điểm đã chọn
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
            Phòng và phòng ngủ
          </button>
          <button className="bg-blue-700 text-white rounded-lg py-2">
            Bộ lọc khác
          </button>
        </div>
        <hr />
        <HouseList houseArr={houseArr} />
      </div>
      <div className="lg:w-1/3 h-full">
        <img src={map} alt="" className="object-cover" />
      </div>
    </div>
  );
}
