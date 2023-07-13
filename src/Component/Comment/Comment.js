import React from "react";
import { user } from "../../assets";

export default function Comment({ commentObj }) {
  return (
    <div>
      <div className="flex flex-row justify-start gap-3 pb-3">
        <img
          src={commentObj.avatar ? commentObj.avatar : user}
          alt=""
          style={{ width: "50px", height: "50px", borderRadius: "25px" }}
        />
        <div className="flex flex-col">
          <p className="font-bold">{commentObj.tenNguoiBinhLuan}</p>
          <p className="text-gray-400">{commentObj.ngayBinhLuan}</p>
        </div>
      </div>
      <div className="col-span-2">{commentObj.noiDung}</div>
    </div>
  );
}
