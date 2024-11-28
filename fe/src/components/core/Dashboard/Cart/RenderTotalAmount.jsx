import { useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";

export default function RenderTotalAmount() {
  const { total } = useSelector((state) => state.cart || { total: 0 }); // Fallback cho `state.cart`

  const handleBuyCourse = () => {
    alert("Chức năng mua khóa học đang được phát triển!"); // Giả lập hành động mua khóa học
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
