import { useEffect } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { formattedDate } from "../../../utils/dateFormatter";
import IconBtn from "../../common/IconBtn";

export default function MyProfile() {
  // Dữ liệu mẫu
  const user = {
    firstName: "Long",
    lastName: "Nguyễn",
    email: "long.nv215601@gmail.com",
    accountType: "Tiêu chuẩn",
    image: "https://via.placeholder.com/150",
    additionalDetails: {
      about: "Tôi là sinh viên CNTT.",
      gender: "Nam",
      contactNumber: "0969396505",
      dateOfBirth: "2003-05-29",
    },
  };

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <h1 className="mb-14 text-4xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left">
        Hồ sơ Cá nhân
      </h1>

      <div className="flex items-center justify-between rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-3 sm:px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user.image}
            alt={`profile-${user.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5 capitalize">
              {user.firstName + " " + user.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user.email}</p>
          </div>
        </div>

        <IconBtn
          text="Chỉnh sửa"
          onClick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      {/* Section: Giới thiệu */}
      <div className="my-10 flex flex-col gap-y-10 rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-7 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">Giới thiệu</p>
          <IconBtn
            text="Chỉnh sửa"
            onClick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p className="text-sm font-medium text-richblack-5">
          {user.additionalDetails.about}
        </p>
      </div>

      {/* Section: Thông tin Cá nhân */}
      <div className="my-10 flex flex-col gap-y-10 rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-7 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Thông tin Cá nhân
          </p>
          <IconBtn
            text="Chỉnh sửa"
            onClick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Tên</p>
              <p className="text-sm font-semibold text-richblack-5 capitalize">
                {user.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Loại tài khoản</p>
              <p className="text-sm font-semibold text-richblack-5 capitalize">
                {user.accountType}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-semibold text-richblack-5">
                {user.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Giới tính</p>
              <p className="text-sm font-semibold text-richblack-5">
                {user.additionalDetails.gender}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Họ</p>
              <p className="text-sm font-semibold text-richblack-5 capitalize">
                {user.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Số điện thoại</p>
              <p className="text-sm font-semibold text-richblack-5">
                {user.additionalDetails.contactNumber}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Ngày sinh</p>
              <p className="text-sm font-semibold text-richblack-5">
                {formattedDate(user.additionalDetails.dateOfBirth)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
