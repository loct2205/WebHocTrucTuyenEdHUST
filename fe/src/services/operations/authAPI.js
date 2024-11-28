import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice.js"
import { resetCart } from "../../slices/cartSlice.js"
import { setUser } from "../../slices/profileSlice.js"
import { apiConnector } from "../apiConnector.js"
import { endpoints } from "../apis.js"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {

    const toastId = toast.loading("Đang tải...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      navigate("/verify-email");
      toast.success("Gửi OTP thành công");
    } catch (error) {
      console.log("Gửi OTP gặp lỗi:", error);
      toast.error(error.response.data?.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}

export function signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate) {
  return async (dispatch) => {

    const toastId = toast.loading("Đang tải...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      if (!response.data.success) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }

      toast.success("Đăng ký thành công");
      navigate("/login");
    } catch (error) {
      console.log("Lỗi kết nối đăng ký ", error);
      toast.error("OTP không hợp lệ");

    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {

    const toastId = toast.loading("Đang tải...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Đăng nhập thành công")
      dispatch(setToken(response.data.token))

      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

      dispatch(setUser({ ...response.data.user, image: userImage }));
      localStorage.setItem("token", JSON.stringify(response.data?.token));

      localStorage.setItem("user", JSON.stringify({ ...response.data.user, image: userImage }));

      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("Lỗi kết nối đăng nhập:", error)
      toast.error(error.response?.data?.message)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {

    const toastId = toast.loading("Đang tải...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      })

      console.log("RESET PASS TOKEN RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Email đặt lại đã gửi")
      setEmailSent(true)
    } catch (error) {
      console.log("RESET PASS TOKEN ERROR............", error)
      toast.error(error.response?.data?.message)
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Đang tải...")
    dispatch(setLoading(true))

    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })

      console.log("RESETPASSWORD RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Đặt lại mật khẩu thành công")
      navigate("/login")
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error)
      toast.error(error.response?.data?.message)
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Thoát đăng nhập")
    navigate("/")
  }
}