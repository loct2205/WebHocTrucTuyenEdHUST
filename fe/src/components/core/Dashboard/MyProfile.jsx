import { useEffect, useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { formattedDate } from "../../../utils/dateFormatter";
import IconBtn from "../../common/IconBtn";
import { apiConnector } from "../../../services/apiConnector"
import { profileEndpoints } from "../../../services/apis"
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { setUser as setUserSlice } from "../../../slices/profileSlice";
import Img from "../../common/Img";

export default function MyProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const {
    GET_USER_DETAILS_API,
  } = profileEndpoints
  // Load user data from localStorage
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        if (!token) {
          throw new Error("No token found");
        }
        const userResponse = await apiConnector("GET", GET_USER_DETAILS_API, null, {
          Authorization: `Bearer ${token}`
        });
        const userImage = userResponse.data?.imageUrl
          ? userResponse.data.imageUrl
          : `https://api.dicebear.com/5.x/initials/svg?seed=${userResponse.data.firstName} ${userResponse.data.lastName}`;
        const userData = { ...userResponse.data, image: userImage };
        setUser(userData);
        dispatch(setUserSlice(userData));
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };
    fetchUserDetails();
    window.scrollTo(0, 0);
  }, []);

  // Handle if user data is not yet loaded
  if (!user) return <p>Loading...</p>;

  return (
    <>
      <h1 className="mb-14 text-4xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left">
        Hồ sơ của tôi
      </h1>

      <div className="flex items-center justify-between rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-3 sm:px-12">
        <div className="flex items-center gap-x-4">
          <Img
            src={user.imageUrl}
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
          onClick={() => navigate("/dashboard/settings")}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-7 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">Giới thiệu</p>
          <IconBtn text="Chỉnh sửa" onClick={() => navigate("/dashboard/settings")}>
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p className={`text-sm font-medium ${user.profile?.about ? "text-richblack-5" : "text-richblack-400"}`}>
          {user.profile?.about ?? "Viết thông tin về bạn"}
        </p>
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-7 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">Thông tin Cá nhân</p>
          <IconBtn text="Chỉnh sửa" onClick={() => navigate("/dashboard/settings")}>
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
                {user.profile?.gender ?? "Add Gender"}
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
                {user.profile?.contactNumber ?? "Thêm số điện thoại"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Ngày sinh</p>
              <p className="text-sm font-semibold text-richblack-5">
                {formattedDate(user.profile?.dob) ?? "Thêm ngày sinh"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
