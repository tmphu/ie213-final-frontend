import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setLocationInfo } from "../../../redux/reducers/locationReducer";

const InputField = styled.input``;

function LocationSearch({ locationArr }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [value, setValue] = useState("");
  const divRef = useRef(null);
  const inputRef = useRef(null);
  let dispatch = useDispatch();
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !( divRef.current.contains(event.target) || inputRef.current.contains(event.target) )) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {};
  }, [divRef]);

  const handleShowDropdown = () => {
    return locationArr?.slice(0, 5).map((loc) => {
      return (
        <div
          className="flex flex-row items-center py-4 px-4 cursor-pointer hover:bg-gray-100"
          key={loc.id}
          onClick={() =>
            handleDropdownClick(`${loc.city} , ${loc.location}`, loc)
          }
        >
          <span className="mr-2 bg-gray-300 rounded-md w-9 h-9 flex justify-center items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </span>
          <p>
            {loc.city}, {loc.location}
          </p>
        </div>
      );
    });
  };

  const handleInputClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleDropdownClick = (item, locationInfo) => {
    setValue(item);
    setIsDropdownVisible(false);
    dispatch(setLocationInfo(locationInfo));
    console.log('locationinfo', locationInfo);
  };

  return (
    <div className="relative overflow-visible">
      <InputField
        className="border-0 p-0 m-0 focus:border-0 focus:outline-0 focus:ring-0 w-full"
        type="text"
        placeholder="Bạn sắp đi đâu?"
        value={value}
        onFocus={handleInputClick}
        onChange={handleInputChange}
        ref={inputRef}
      />
      {isDropdownVisible && (
        <div
          className="absolute mt-2 bg-white rounded-lg shadow-lg w-max overflow-hidden"
          ref={divRef}
        >
          {handleShowDropdown()}
        </div>
      )}
    </div>
  );
}

export default LocationSearch;
