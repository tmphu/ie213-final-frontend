import { faUserCheck, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import HouseList from "./HouseList/HouseList";
import { houseService } from "../../services/houseService";
import ProfilePhoto from "./ProfilePhoto";
import UserAdminModal from "../../Component/Modal/CustomerAdminModal";

export default function MyProfile() {
  let userInfo = useSelector((state) => state.userReducer.userInfo);
  const [bookedHouseArr, setBookedHouseArr] = React.useState([]);

  useEffect(() => {
    houseService
      .getBookedHouse(userInfo.user.id)
      .then((res) => {
        console.log('bookedHouse', res);
        const bookedHouse = res.data?.content?.map((item) => {
          return item.house;
        });
        console.log('bookedHouse arr', bookedHouse);
        setBookedHouseArr(bookedHouse);
      })
      .catch((err) => {
        console.log("getBookedHouse err: ", err);
      });
  }, [userInfo.user.id]);

  return (
    <div className="profile__page flex lg:flex-row flex-col container mx-auto m-10">
      <div className="profile__block lg:w-1/3">
        <div className="border-2 rounded-2xl p-6 mx-5">
          <ProfilePhoto />
          <div className="profile__identity p-6">
            <FontAwesomeIcon icon={faUserCheck} />
            <h3 className="font-bold text-xl">Xác minh danh tính</h3>
            <p>Xác thực danh tính của bạn với huy hiệu xác minh danh tính.</p>
            <button className="border-2 border-black p-3 rounded-md bg-blue-400 my-3">
              Nhận huy hiệu
            </button>
          </div>
          <hr />
          <div className="proof p-6">
            <h3 className="font-bold text-xl">
              {userInfo.user.name} đã xác nhận
            </h3>
            <div className="flex gap-3">
              <span>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              Địa chỉ email
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div className="profile__bookedHouse lg:w-2/3">
        <div className="container p-6">
          <h3 className="font-bold text-3xl">Xin chào, {userInfo.user.name}</h3>
          <p>Bắt đầu tham gia vào 2021</p>
          <UserAdminModal userId={userInfo.user.id} isSelfEdit={true} />
          <h3 className="font-bold text-3xl pt-10">Phòng đã thuê</h3>
          {bookedHouseArr.length !== 0 ? (
            <HouseList houseArr={bookedHouseArr} />
          ) : (
            <p>Chưa có phòng thuê nào!</p>
          )}
        </div>
      </div>
    </div>
  );
}
