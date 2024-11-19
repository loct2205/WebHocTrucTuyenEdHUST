import { useEffect } from "react"
import { RiEditBoxLine } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import IconBtn from "../../common/IconBtn"
import Img from './../../common/Img';

export default function MyProfile() {
  const navigate = useNavigate();

  // Dữ liệu mẫu giả lập
  const user = {
    firstName: "Nguyễn",
    lastName: "Văn A",
    email: "nguyenvana@example.com",
    image: "https://via.placeholder.com/78",
    accountType: "Người dùng",
    additionalDetails: {
      about: "Tôi là một lập trình viên yêu thích công nghệ.",
      gender: "Nam",
      contactNumber: "0123456789",
      dateOfBirth: "1990-01-01",
    },
  };

  // Cuộn lên đầu trang khi component được tải
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <h1 className="mb-14 text-4xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left">
        Hồ sơ của tôi
      </h1>

      <div className="flex items-center justify-between rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-3 sm:px-12">
        <div className="flex items-center gap-x-4">
          <Img
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
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-7 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">Giới thiệu</p>
          <IconBtn
            text="Chỉnh sửa"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <p
          className={`${user.additionalDetails?.about
            ? "text-richblack-5"
            : "text-richblack-400"
            } text-sm font-medium`}
        >
          {user.additionalDetails?.about || "Viết gì đó về bản thân bạn"}
        </p>
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-7 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Thông tin cá nhân
          </p>
          <IconBtn
            text="Chỉnh sửa"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="flex max-w-[500px] justify-between ">
          <div className="flex flex-col gap-y-5">

            <div>
              <p className="mb-2 text-sm text-richblack-600">Họ</p>
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
                {user.additionalDetails?.gender || "Thêm giới tính"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Tên</p>
              <p className="text-sm font-semibold text-richblack-5 capitalize">
                {user.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Số điện thoại</p>
              <p className="text-sm font-semibold text-richblack-5">
                {user.additionalDetails?.contactNumber || "Thêm số điện thoại"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Ngày sinh</p>
              <p className="text-sm font-semibold text-richblack-5">
                {user.additionalDetails?.dateOfBirth || "Thêm ngày sinh"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
