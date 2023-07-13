import React from "react";
import { useSelector } from "react-redux";
import { ClockLoader } from "react-spinners";

export default function Loading() {
  let { isLoading } = useSelector((state) => state.loadingReducer);
  return isLoading ? (
    <div
      className="fixed w-screen h-screen z-50 top-0 left-0 flex flex-col justify-center items-center"
      style={{ backgroundColor: "rgba(49,46,129,.95)" }}
    >
      <p>
        <ClockLoader color="#ADA2FF" size={100} speedMultiplier={1} />
      </p>
      <p className="text-indigo-50 py-2">Loading ...</p>
    </div>
  ) : (
    <></>
  );
}
