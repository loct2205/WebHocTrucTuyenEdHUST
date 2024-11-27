import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";

import IconBtn from "../../../common/IconBtn";
import Img from "../../../common/Img";

export default function ChangeProfilePicture() {
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        console.log("Tải lên thành công:", profileImage);
      }, 1000);
    } catch (error) {
      console.log("Lỗi khi tải lên:", error.message);
    }
  };

  useEffect(() => {
    if (profileImage) {
      previewFile(profileImage);
    }
  }, [profileImage]);

  return (
    <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-3 sm:px-12 text-richblack-5">
      <div className="flex items-center gap-x-4">
        <Img
          src={previewSource || "/default-profile.png"}
          alt="profile-preview"
          className="aspect-square w-[78px] rounded-full object-cover"
        />

        <div className="space-y-2">
          <p className="font-medium">Thay đổi ảnh đại diện</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg, image/jpg"
            />

            <button
              onClick={handleClick}
              disabled={loading}
              className="cursor-pointer rounded-md py-2 px-5 font-semibold bg-richblack-200 text-richblack-900 hover:bg-richblack-900 hover:text-richblack-200 duration-300"
            >
              Chọn ảnh
            </button>

            <IconBtn
              text={loading ? "Đang tải lên..." : "Tải lên"}
              onclick={handleFileUpload}
            >
              {!loading && <FiUpload className="text-lg" />}
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
