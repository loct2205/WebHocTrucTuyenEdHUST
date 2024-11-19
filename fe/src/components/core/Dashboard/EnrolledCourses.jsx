import { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import Img from '../../common/Img';

export default function EnrolledCourses() {
  // Dữ liệu mẫu cho khóa học đã đăng ký
  const mockEnrolledCourses = [
    {
      id: 1,
      courseName: "Khóa học Lập trình React",
      courseDescription: "Học cách xây dựng ứng dụng web bằng React.",
      thumbnail: "https://via.placeholder.com/150",
      totalDuration: "10 giờ",
      progressPercentage: 70,
    },
    {
      id: 2,
      courseName: "Khóa học Node.js",
      courseDescription: "Tìm hiểu về phát triển backend với Node.js.",
      thumbnail: "https://via.placeholder.com/150",
      totalDuration: "8 giờ",
      progressPercentage: 50,
    },
    {
      id: 3,
      courseName: "Khóa học HTML & CSS",
      courseDescription: "Cơ bản về HTML và CSS để xây dựng giao diện web.",
      thumbnail: "https://via.placeholder.com/150",
      totalDuration: "5 giờ",
      progressPercentage: 30,
    },
  ];

  // Hiển thị khóa học đã đăng ký
  const [enrolledCourses, setEnrolledCourses] = useState(mockEnrolledCourses);

  // Hiển thị đang tải
  const sklItem = () => {
    return (
      <div className="flex border border-richblack-700 px-5 py-3 w-full">
        <div className="flex flex-1 gap-x-4">
          <div className='h-14 w-14 rounded-lg skeleton '></div>
          <div className="flex flex-col w-[40%] ">
            <p className="h-2 w-[50%] rounded-xl  skeleton"></p>
            <p className="h-2 w-[70%] rounded-xl mt-3 skeleton"></p>
          </div>
        </div>
        <div className="flex flex-[0.4] flex-col ">
          <p className="h-2 w-[20%] rounded-xl skeleton mt-2"></p>
          <p className="h-2 w-[40%] rounded-xl skeleton mt-3"></p>
        </div>
      </div>
    );
  };

  // Kiểm tra danh sách rỗng
  if (enrolledCourses.length === 0) {
    return (
      <p className="grid h-[50vh] w-full place-content-center text-center text-richblack-5 text-3xl">
        Bạn chưa đăng ký khóa học nào.
      </p>
    );
  }

  return (
    <>
      <div className="text-4xl text-richblack-5 font-boogaloo text-center sm:text-left">Khóa Học Đã Đăng Ký</div>
      <div className="my-8 text-richblack-5">
        {/* Tiêu đề */}
        <div className="flex rounded-t-2xl bg-richblack-800 ">
          <p className="w-[45%] px-5 py-3">Tên Khóa Học</p>
          <p className="w-1/4 px-2 py-3">Thời Gian</p>
          <p className="flex-1 px-2 py-3">Tiến Độ</p>
        </div>

        {/* Hiển thị Skeleton khi dữ liệu chưa có */}
        {enrolledCourses.length === 0 && (
          <div>
            {sklItem()}
            {sklItem()}
            {sklItem()}
            {sklItem()}
            {sklItem()}
          </div>
        )}

        {/* Hiển Thị Danh Sách Khóa Học */}
        {enrolledCourses.map((course, i) => (
          <div
            className={`flex flex-col sm:flex-row sm:items-center border border-richblack-700 ${i === enrolledCourses.length - 1 ? "rounded-b-2xl" : "rounded-none"}`}
            key={course.id}
          >
            <div className="flex sm:w-[45%] cursor-pointer items-center gap-4 px-5 py-3">
              <Img
                src={course.thumbnail}
                alt="course_img"
                className="h-14 w-14 rounded-lg object-cover"
              />
              <div className="flex max-w-xs flex-col gap-2">
                <p className="font-semibold">{course.courseName}</p>
                <p className="text-xs text-richblack-300">
                  {course.courseDescription.length > 50
                    ? `${course.courseDescription.slice(0, 50)}...`
                    : course.courseDescription}
                </p>
              </div>
            </div>

            {/* Mobile*/}
            <div className='sm:hidden'>
              <div className="px-2 py-3">{course.totalDuration}</div>
              <div className="flex sm:w-2/5 flex-col gap-2 px-2 py-3">
                <p>Tiến Độ: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>

            {/* Big Device */}
            <div className="hidden w-1/5 sm:flex px-2 py-3">{course.totalDuration}</div>
            <div className="hidden sm:flex w-1/5 flex-col gap-2 px-2 py-3">
              <p>Tiến Độ: {course.progressPercentage || 0}%</p>
              <ProgressBar
                completed={course.progressPercentage || 0}
                height="8px"
                isLabelVisible={false}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}