import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const { COURSE_PAYMENT_API } = studentEndpoints;

// ================ buyCourse ================
export async function buyCourse(token, coursesId, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Đang tải...");
    try {
        // Initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,
            { courseIds: coursesId },
            {
                Authorization: `Bearer ${token}`,
            });

        if (!orderResponse.data) {
            throw new Error("Gửi đơn hàng thất bại!");
        }

        const paymentUrl = orderResponse.data;
        if (!paymentUrl) { 
            throw new Error("Không thể lấy URL thanh toán từ VNPAY"); 
        } 
        window.location.href = paymentUrl

    }
    catch (error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Không thể thực hiện thanh toán");
    }
    toast.dismiss(toastId);
}
