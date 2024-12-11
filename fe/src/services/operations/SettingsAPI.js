import { toast } from "react-hot-toast";

import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { settingsEndpoints, profileEndpoints } from "../apis";
import { logout } from "./authAPI";

const { 
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

const { GET_USER_DETAILS_API } = profileEndpoints;

// ================ change Password  ================
export async function changePassword(token, formData) {
  const toastId = toast.loading("Đang tải...");
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response);

    if (!response.data) {
      throw new Error('Đổi mật khẩu thất bại.');
    }
    toast.success("Đổi mật khẩu thành công");
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error);
    toast.error(error.response?.data?.description || "Lỗi khi đổi mật khẩu");
  }
  toast.dismiss(toastId);
}

// ================ update User Profile Image  ================
export function updateUserProfileImage(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Đang tải...");

    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............", response);

      if (!response.data) {
        throw new Error('Cập nhật hình ảnh hồ sơ thất bại.');
      }
      toast.success("Hình ảnh hồ sơ đã được cập nhật thành công!");

      const userResponse = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });
      const userImage = userResponse.data?.imageUrl
        ? userResponse.data.imageUrl
        : `https://api.dicebear.com/5.x/initials/svg?seed=${userResponse.data.firstName} ${userResponse.data.lastName}`;
      const userData = { ...userResponse.data, image: userImage };

      dispatch(setUser(userData));

      // Cập nhật lại thông tin người dùng trong localStorage
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
      toast.error("Không thể cập nhật hình ảnh hồ sơ");
    }
    toast.dismiss(toastId);
  };
}

// ================ update Profile  ================
export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Đang tải...");
    try {
      const response = await apiConnector("PATCH", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });
      console.log("UPDATE_PROFILE_API API RESPONSE............", response);

      if (!response.data || !response.data.firstName) {
        throw new Error('Cập nhật hồ sơ thất bại.');
      }

      const userResponse = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });
      const userImage = userResponse.data?.imageUrl
        ? userResponse.data.imageUrl
        : `https://api.dicebear.com/5.x/initials/svg?seed=${userResponse.data.firstName} ${userResponse.data.lastName}`;
      const userData = { ...userResponse.data, image: userImage };

      dispatch(setUser(userData));

      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Cập nhật hồ sơ thành công!");
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error);
      toast.error("Không thể cập nhật hồ sơ");
    }
    toast.dismiss(toastId);
  };
}

// ================ delete Profile ================
export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Đang tải...");
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("DELETE_PROFILE_API API RESPONSE............", response);

      if (!response.data) {
        throw new Error('Xóa hồ sơ thất bại.');
      }
      toast.success("Xóa hồ sơ thành công");
      dispatch(logout(navigate));
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error);
      toast.error("Không thể xóa hồ sơ");
    }
    toast.dismiss(toastId);
  };
}
