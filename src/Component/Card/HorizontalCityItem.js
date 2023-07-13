import React from "react";
import { NavLink } from "react-router-dom";

export default function HorizontalCityItem(props) {
  return (
    <NavLink
      className="flex flex-row items-center border rounded-lg shadow md:flex-row md:max-w-xl"
      to="/"
    >
      <img
        className="object-cover w-24 h-24 rounded-md"
        src={props.photo}
        alt=""
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
          {props.name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          45 phút lái xe
        </p>
      </div>
    </NavLink>
  );
}
