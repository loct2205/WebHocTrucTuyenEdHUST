import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { setLoading, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { endpoints, profileEndpoints } from "../apis"
const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} = endpoints
const {
    GET_USER_DETAILS_API,
} = profileEndpoints
// ================ Login ================
export function login(email, password, navigate) {
    return async (dispatch) => {
  
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
  
      try {
        const response = await apiConnector("POST", LOGIN_API, { email, password });
  
        console.log("LOGIN API RESPONSE............", response);
  
        if (!response.data || !response.data.token) {
            throw new Error("Login failed. Token not received.");
        }
  
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        // Call API to get user data
        const userResponse = await apiConnector("GET", GET_USER_DETAILS_API);
        const userImage = userResponse.data?.imageUrl
           ? userResponse.data.imageUrl
           : `https://api.dicebear.com/5.x/initials/svg?seed=${userResponse.data.firstName} ${userResponse.data.lastName}`
  
        dispatch(setUser({ ...userResponse.data, image: userImage }));
        console.log('User data - ', userResponse.data);
        localStorage.setItem("token", JSON.stringify(response.data?.token));
  
        localStorage.setItem("user", JSON.stringify({ ...userResponse.data}));
  
        navigate("/dashboard/my-profile");
      } catch (error) {
        console.log("LOGIN API ERROR.......", error)
        toast.error(error.response?.data?.description)
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }