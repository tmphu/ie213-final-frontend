import React, { useState, useRef } from "react";
import { userLocalService } from "../../services/localStorageService";
import { userService } from "../../services/userService";
import { useSelector } from "react-redux";
import { user } from "../../assets";
import classnames from "classnames";

function ProfilePhoto() {
  let userInfo = useSelector((state) => state.userReducer.userInfo);
  const [avatarUrl, setAvatarUrl] = useState(userInfo.user.avatar);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadBtnDisabled, setUploadBtnDisabled] = useState(true); // true: disabled, false: enabled
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadBtnDisabled(false);
  };

  const handleUpload = async () => {
    setUploading(true);
    setUploadBtnDisabled(true);

    const formData = new FormData();
    formData.append("formFile", selectedFile, selectedFile.name);

    try {
      const response = await userService.uploadAvatar(formData);
      setAvatarUrl(response.data.content.avatar);
      let userLocal = userLocalService.getItem();
      userLocal.user = response.data.content;
      userLocalService.setItem(userLocal);

      fileInputRef.current.value = "";
    } catch (error) {
      console.log("upload avatar error", error);
    }

    setUploading(false);
  };

  return (
    <div className="profile__avatar flex flex-col justify-center items-center gap-1">
      <img
        src={avatarUrl ? avatarUrl : user}
        alt=""
        className="w-60 h-60 rounded-full object-cover"
      />
      <input type="file" onChange={handleFileSelect} ref={fileInputRef} />
      <button
        disabled={uploadBtnDisabled}
        onClick={handleUpload}
        className={classnames("rounded-md", "text-white", "px-10", "py-2", {
          "bg-blue-500": !uploadBtnDisabled,
          "bg-gray-400": uploadBtnDisabled,
        })}
      >
        {uploading ? "Đang cập nhật..." : "Cập nhật ảnh"}
      </button>
    </div>
  );
}

export default ProfilePhoto;
