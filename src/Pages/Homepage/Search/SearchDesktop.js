import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import LocationSearch from "./LocationSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import { setSearchLocation } from '../../../redux/reducers/locationReducer';

function SearchDesktop({ locationArr }) {
  let navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const [guestNo, setGuestNo] = useState(1);
  const locationInfo = useSelector((state) => state.locationReducer.locationInfo);
  const dispatch = useDispatch();

  return (
    <>
      <div className="bg-white mx-auto lg:w-8/12 w-10/12 lg:py-6 py-3 rounded-full flex flex-row px-6 items-center">
        <div className="shrink w-full">
          <div className="font-bold">Địa điểm</div>
          <LocationSearch locationArr={locationArr} />
        </div>
        <div className='flex-none w-36'>
          <div className="font-bold px-1">Nhận phòng</div>
          <DatePicker
            name="startDate"
            selected={startDate}
            className="px-1 py-0"
            minDate={new Date()}
            onChange={(date) => {
              setStartDate(date);
              if (date.getDate() >= endDate.getDate()) {
                setEndDate(addDays(date, 1));
              }
            }}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className='flex-none w-36'>
          <div className="font-bold px-1">Trả phòng</div>
          <DatePicker
            name="endDate"
            className='px-1 py-0'
            selected={endDate}
            minDate={addDays(startDate, 1)}
            maxDate={addDays(startDate, 30)}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className='flex-none w-36'>
          <div className="font-bold">Khách</div>
          <input
            name="guestNo"
            type="text"
            className='w-20 px-1 py-0 border-0'
            value={guestNo}
            onChange={(event) => setGuestNo(event.target.value)}
          />
        </div>
        <div
          className="bg-pink-600 text-white p-3 cursor-pointer flex-none"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => (
            dispatch(setSearchLocation({ location: locationInfo.location.toString(), startDate: startDate.toISOString(), endDate: endDate.toISOString(), guestNo })),
            setTimeout(() => {
              navigate(`/location/${locationInfo?.id}`, {
                state: { locationInfo },
              })
            }, 0)
          )}
        >
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
    </>
  );
}

export default SearchDesktop;
