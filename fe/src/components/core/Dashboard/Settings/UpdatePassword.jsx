import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { changePassword } from "../../../../services/operations/SettingsAPI";

import IconBtn from "../../../common/IconBtn";

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitPasswordForm = async (data) => {
    console.log("Nội dung mật khẩu", data);
    try {
      await changePassword(token, data)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-6 sm:px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Thay đổi mật khẩu</h2>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="oldPassword" className="lable-style">
                Mật khẩu hiện tại
              </label>

              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Nhập mật khẩu hiện tại"
                className="form-style"
                {...register("oldPassword", { required: true })}
              />

              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>

              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Vui lòng nhập mật khẩu hiện tại.
                </span>
              )}
            </div>

            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newPassword" className="lable-style">
                Mật khẩu mới
              </label>

              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Nhập mật khẩu mới"
                className="form-style"
                {...register("newPassword", { required: true })}
              />

              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Vui lòng nhập mật khẩu mới.
                </span>
              )}
            </div>

            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="confirmPassword" className="lable-style">
                Xác nhận mật khẩu mới
              </label>

              <input
                type={showConfirmNewPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Xác nhận mật khẩu mới"
                className="form-style"
                {...register("confirmPassword", { required: true })}
              />

              <span
                onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.confirmPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Vui nhập xác thực mật khẩu mới.
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
