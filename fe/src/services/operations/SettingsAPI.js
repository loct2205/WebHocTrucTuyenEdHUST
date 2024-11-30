import { settingsEndpoints, profileEndpoints } from "../apis"
import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { logout } from "./authAPI"
import { setUser } from "../../slices/profileSlice"

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints
const { GET_USER_DETAILS_API } = profileEndpoints;

// ================ change Password  ================
export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data) {
      throw new Error('Change password failed.')
    }
    toast.success("Password Changed Successfully")
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response?.data?.description)
  }
  toast.dismiss(toastId)
}

// ================ update User Profile Image  ================
export function updateUserProfileImage(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")

    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............", response);

      if (!response.data) {
        throw new Error('Update user profile image failed.')
      }
      toast.success("Display Picture Updated Successfully")

      const userResponse = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`
      });
      const userImage = userResponse.data?.imageUrl
        ? userResponse.data.imageUrl
        : `https://api.dicebear.com/5.x/initials/svg?seed=${userResponse.data.firstName} ${userResponse.data.lastName}`;
      const userData = { ...userResponse.data, image: userImage };

      dispatch(setUser(userData));

      // below line is must - if not code - then as we refresh the page after changing profile image then old profile image will show 
      // as we only changes in user(store) not in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Profile Picture")
    }
    toast.dismiss(toastId)
  }
}

// ================ update Profile  ================
export function updateProfile(token, formData) {
  return async (dispatch) => {
    // console.log('This is formData for updated profile -> ', formData)
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("PATCH", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      if (!response.data || !response.data.firstName) {
        throw new Error('Update Profile failed.')
      }
      
      const userResponse = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`
      });
      const userImage = userResponse.data?.imageUrl
        ? userResponse.data.imageUrl
        : `https://api.dicebear.com/5.x/initials/svg?seed=${userResponse.data.firstName} ${userResponse.data.lastName}`;
      const userData = { ...userResponse.data, image: userImage };

      dispatch(setUser(userData))

   
      // console.log('DATA = ', data)
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Profile Updated Successfully")
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId)
  }
}

// ================ delete Profile ================
export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data) {
        throw new Error('Delete profile failed.')
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}