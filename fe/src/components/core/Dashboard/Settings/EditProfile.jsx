import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../../../services/operations/SettingsAPI";

import IconBtn from "../../../common/IconBtn";

const genders = ["Nam", "Nữ", "Khác"];

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  console.log(user);
  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-6 sm:px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Thông tin cá nhân
          </h2>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="lable-style">
                Tên
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Nhập tên"
                className="form-style"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Vui lòng nhập tên.
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="lable-style">
                Họ
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Nhập họ"
                className="form-style"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Vui lòng nhập họ.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dob" className="lable-style">
                Ngày sinh
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                className="form-style"
                {...register("dob", {
                  required: {
                    value: true,
                    message: "Vui lòng nhập ngày sinh.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Ngày sinh không hợp lệ.",
                  },
                })}
                defaultValue={user?.profile?.dob}
              />
              {errors.dob && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dob.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="lable-style">
                Giới tính
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style"
                {...register("gender", { required: true })}
                defaultValue={user?.profile?.gender}
              >
                {genders.map((ele, i) => (
                  <option key={i} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Vui lòng chọn giới tính.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="lable-style">
                Số liên hệ
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Nhập số liên hệ"
                className="form-style"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Vui lòng nhập số liên hệ.",
                  },
                  maxLength: { value: 12, message: "Không hợp lệ" },
                  minLength: { value: 10, message: "Không hợp lệ" },
                })}
                defaultValue={user?.profile?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="lable-style">
                Giới thiệu
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Nhập nội dung"
                className="form-style"
                {...register("about", { required: true })}
                defaultValue={user?.profile?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Vui lòng nhập nội dung.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile");
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Hủy
          </button>
          <IconBtn type="submit" text="Lưu" />
        </div>
      </form>
    </>
  );
}
