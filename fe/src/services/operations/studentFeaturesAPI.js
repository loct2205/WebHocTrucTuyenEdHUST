import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";


const { COURSE_PAYMENT_API} = studentEndpoints;

// ================ buyCourse ================ 
export async function buyCourse(token, coursesId, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try {
        // initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,
            { courseIds: coursesId },
            {
                Authorization: `Bearer ${token}`,
            })
        // console.log("orderResponse... ", orderResponse);
        if (!orderResponse.data) {
            throw new Error("Submit order failed!");
        }

        const paymentUrl = orderResponse.data;
        if (!paymentUrl) { 
            throw new Error("Unable to get payment URL from VNPAY"); 
        } 
        window.open(paymentUrl, '_blank');

    }
    catch (error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
        // toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}