import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";

import Img from './../../../common/Img';

export default function RenderCartCourses() {
  // Dữ liệu mẫu
  const cart = [
    {
      _id: "1",
      courseName: "Khóa học Lập trình Web",
      category: { name: "Lập trình" },
      ratingAndReviews: [{ rating: 4.5 }],
      price: 500000,
      thumbnail: "https://via.placeholder.com/150",
    },
    {
      _id: "2",
      courseName: "Khóa học Khoa học Dữ liệu",
      category: { name: "Dữ liệu" },
      ratingAndReviews: [{ rating: 4.0 }],
      price: 700000,
      thumbnail: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className={`flex w-full flex-wrap items-start justify-between gap-6 ${
            indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
          } ${indx !== 0 && "mt-6"} `}
        >
          <div className="flex flex-1 flex-col gap-4 xl:flex-row">
            <Img
              src={course.thumbnail}
              alt={course.courseName}
              className="h-[148px] w-[220px] rounded-lg object-cover"
            />

            <div className="flex flex-col space-y-1">
              <p className="text-lg font-medium text-richblack-5">
                {course.courseName}
              </p>
              <p className="text-sm text-richblack-300">
                {course.category.name}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-5">4.5</span>
                <ReactStars
                  count={5}
                  value={course.ratingAndReviews.length}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <span className="text-richblack-400">
                  {course.ratingAndReviews.length} đánh giá
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <button
              className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
            >
              <RiDeleteBin6Line />
              <span>Xóa</span>
            </button>
            <p className="mb-6 text-3xl font-medium text-yellow-100">
              {course.price.toLocaleString("vi-VN")}₫
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}