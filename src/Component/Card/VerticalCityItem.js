import React from "react";
import { NavLink } from "react-router-dom";

export default function VerticalCityItem(props) {
  return (
    <NavLink to="/">
      <img
        className="object-cover lg:w-60 lg:h-60 h-40 rounded-md w-full"
        src={props.photo}
        alt=""
      />
      <p>{props.description}</p>
    </NavLink>
  );
}
