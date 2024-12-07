import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API, } = profileEndpoints


// ================ get User Details  ================
export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, { Authorization: `Bearer ${token}`, })
      console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data || response.data?.id) {
        throw new Error(response.data.message)
      }
      const userImage = response.data?.imageUrl
        ? response.data?.imageUrl
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data?.firstName} ${response.data?.lastName}`
      dispatch(setUser({ ...response.data, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

// ================ get User Enrolled Courses  ================
export async function getUserEnrolledCourses(token) {
  // const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null, { Authorization: `Bearer ${token}`, })

    console.log("GET_USER_ENROLLED_COURSES_API API RESPONSE............", response)

    if (!response.data) {
      throw new Error('Get User Enrolled Courses failed!')
    }
    result = response.data;
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  // toast.dismiss(toastId)
  return result
}

// ================ get Instructor Data  ================
export async function getInstructorData(token) {
  // const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    })
    console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response)
    result = response?.data || [];
  } catch (error) {
    console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error)
    toast.error("Could Not Get Instructor Data")
  }
  // toast.dismiss(toastId)
  return result
}