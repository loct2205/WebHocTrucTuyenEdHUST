import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { setLoading, setToken } from "../../slices/authSlice";
import { endpoints, profileEndpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;
const { GET_USER_DETAILS_API } = profileEndpoints;

// ================ Login ================
export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Đang tải...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data || !response.data.token) {
        throw new Error("Đăng nhập thất bại. Không nhận được token.");
      }

      toast.success("Đăng nhập thành công");
      dispatch(setToken(response.data.token));
      localStorage.setItem("token", JSON.stringify(response.data?.token));

      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR.......", error);
      toast.error(error.response?.data?.description || "Lỗi khi đăng nhập");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// ================ send Otp ================
export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Đang tải...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email
      });

      if (!response.data) {
        throw new Error('Gửi OTP thất bại.');
      }

      navigate("/verify-email");
      toast.success("OTP đã gửi thành công");
    } catch (error) {
      console.log("SENDOTP API ERROR --> ", error);
      toast.error(error.response?.data?.description || "Lỗi khi gửi OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// ================ sign Up ================
export function signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate) {
  return async (dispatch) => {

    const toastId = toast.loading("Đang tải...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      if (!response.data || !response.data.password) {
        toast.error('Đăng ký thất bại.');
        throw new Error('SignUp failed.');
      }

      toast.success("Đăng ký thành công");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR --> ", error);
      toast.error("OTP không hợp lệ");
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

// ================ get Password Reset Token ================
export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {

    const toastId = toast.loading("Đang tải...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      if (!response.data) {
        throw new Error('Yêu cầu lấy token reset mật khẩu thất bại.');
      }

      toast.success("Đã gửi email reset mật khẩu");
      setEmailSent(true);
    } catch (error) {
      console.log("RESET PASS TOKEN ERROR............", error);
      toast.error(error.response?.data?.description || "Lỗi khi gửi email reset mật khẩu");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  }
}

// ================ reset Password ================
export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Đang tải...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
      }, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data) {
        throw new Error('Reset mật khẩu thất bại.');
      }

      toast.success("Đổi mật khẩu thành công");
      navigate("/login");
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error);
      toast.error(error.response?.data?.description || "Lỗi khi đổi mật khẩu");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  }
}

// ================ Logout ================
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Đăng xuất thành công");
    navigate("/");
  };
}
