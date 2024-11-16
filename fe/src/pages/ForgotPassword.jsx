import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPasswordResetToken } from "../services/operations/authAPI";

function ForgotPassword() {
  const [email, setEmail] = useState(""); 
  const [emailSent, setEmailSent] = useState(false); 
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  // Xử lý sự kiện Submit
  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {
        loading ? (
          <div className="spinner"></div>
        ) : (
          <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {!emailSent ? "Đặt lại mật khẩu" : "Kiểm tra Email"}
          </h1>
          <div className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {!emailSent
              ? "Kiểm tra Email để xem hướng dẫn khôi phục mật khẩu. Nếu không thể truy cập, hãy thử khôi phục tài khoản"
              : (
                <p>Email đã gửi tới địa chỉ <span className="text-yellow-200">{email}</span></p>
              )}
          </div>

          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Địa chỉ Email<sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập địa chỉ Email"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 "
                />
              </label>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              {!emailSent ? "Gửi" : "Gửi lại Email"}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Trở lại Đăng nhập
              </p>
            </Link>
          </div>
        </div>
        )
      }
    </div>
  );
}

export default ForgotPassword;
