import { useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";

export default function RenderTotalAmount() {
  const { total = 0, cart = [] } = useSelector((state) => state.cart || {});
  const { token = "", user = {} } = useSelector((state) => state.auth || {});

  const buyCourse = async (token, courses, user) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Giả lập mua khóa học với thông tin:");
        console.log("Token:", token);
        console.log("Courses:", courses);
        console.log("User:", user);
        alert("Mua khóa học thành công (giả lập)");
        resolve();
      }, 1000);
    });
  };

  const handleBuyCourse = async () => {
    const courses = cart.map((course) => course._id);
    await buyCourse(token, courses, user);
  };

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Tổng cộng:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">
        {total.toLocaleString("vi-VN")}₫
      </p>
      <IconBtn
        text="Mua ngay"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  );
}
