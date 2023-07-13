import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import LocationSearch from "./LocationSearch";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SearchDesktop({ locationArr }) {
  let navigate = useNavigate();
  let locationInfo = useSelector((state) => state.locationReducer.locationInfo);

  return (
    <>
      <div className="bg-white mx-auto lg:w-8/12 w-10/12 lg:py-6 py-3 rounded-full flex flex-row px-6 items-center justify-between">
        <div>
          <div className="font-bold">Địa điểm</div>
          <LocationSearch locationArr={locationArr} />
        </div>
        <div>
          <div className="font-bold">Nhận phòng</div>
          <div>Thêm ngày</div>
        </div>
        <div>
          <div className="font-bold">Trả phòng</div>
          <div>Thêm ngày</div>
        </div>
        <div>
          <div className="font-bold">Khách</div>
          <div>Thêm khách</div>
        </div>
        <div
          className="bg-pink-600 text-white p-3 cursor-pointer"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() =>
            navigate(`/location/${locationInfo?.id}`, {
              state: { locationInfo },
            })
          }
        >
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
    </>
  );
}

export default SearchDesktop;
