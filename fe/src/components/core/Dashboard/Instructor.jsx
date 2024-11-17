import { useState } from "react";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorDashboard/InstructorChart";
import Img from './../../common/Img';

export default function Instructor() {
  // Dữ liệu mẫu 
  const mockInstructorData = [
    { totalAmountGenerated: 5000, totalStudentsEnrolled: 150 },
    { totalAmountGenerated: 3000, totalStudentsEnrolled: 75 },
  ];

  const mockCourses = [
    {
      _id: "1",
      courseName: "React Basics",
      studentsEnrolled: Array(50).fill(null), 
      price: 1000,
      thumbnail: "https://via.placeholder.com/201",
    },
    {
      _id: "2",
      courseName: "Advanced JavaScript",
      studentsEnrolled: Array(100).fill(null), 
      price: 1500,
      thumbnail: "https://via.placeholder.com/201",
    },
    {
      _id: "3",
      courseName: "Web Development",
      studentsEnrolled: Array(75).fill(null), 
      price: 1200,
      thumbnail: "https://via.placeholder.com/201",
    },
  ];

  const [loading, setLoading] = useState(false);

  // Tiền và học sinh
  const totalAmount = mockInstructorData.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
  const totalStudents = mockInstructorData.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);

  const skItem = () => {
    return (
      <div className="mt-5 w-full flex flex-col justify-between  rounded-xl ">
        <div className="flex border p-4 border-richblack-600 ">
          <div className="w-full">
            <p className="w-[100px] h-4 rounded-xl skeleton"></p>
            <div className="mt-3 flex gap-x-5">
              <p className="w-[200px] h-4 rounded-xl skeleton"></p>
              <p className="w-[100px] h-4 rounded-xl skeleton"></p>
            </div>

            <div className="flex justify-center items-center flex-col">
              <div className="w-[80%] h-24 rounded-xl mt-5 skeleton"></div>
              <div className="w-60 h-60 rounded-full  mt-4 grid place-items-center skeleton"></div>
            </div>
          </div>
          <div className="sm:flex hidden min-w-[250px] flex-col rounded-xl p-6 skeleton"></div>
        </div>
        <div className="flex flex-col gap-y-6  mt-5">
          <div className="flex justify-between">
            <p className="text-lg font-bold text-richblack-5 pl-5">Khóa học của bạn</p>
            <Link to="/dashboard/my-courses">
              <p className="text-xs font-semibold text-yellow-50 hover:underline pr-5">Xem tất cả</p>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row  gap-6 ">
            <p className=" h-[201px] w-full rounded-xl  skeleton"></p>
            <p className=" h-[201px] w-full rounded-xl  skeleton"></p>
            <p className=" h-[201px] w-full rounded-xl  skeleton"></p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-richblack-5 text-center sm:text-left">
          Xin chào 👋
        </h1>
      </div>

      {loading ? (
        <div>
          {skItem()}
        </div>
      ) : mockCourses.length > 0 ? (
        <div>
          <div className="my-4 flex h-[450px] space-x-4">
         
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={mockInstructorData} />
            ) : (
              <div className="flex-1 rounded-md bg-richblack-800 p-6">
                <p className="text-lg font-bold text-richblack-5">Biểu đồ</p>
                <p className="mt-4 text-xl font-medium text-richblack-50">
                  Không đủ dữ liệu phân tích
                </p>
              </div>
            )}
            <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
              <p className="text-lg font-bold text-richblack-5">Thống kê</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-lg text-richblack-200">Tổng số khóa học</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {mockCourses.length}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">Tổng số học viên</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {totalStudents}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">Tổng học phí</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    VND {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md bg-richblack-800 p-6">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-richblack-5">Khóa học của bạn</p>
              <Link to="/dashboard/my-courses">
                <p className="text-xs font-semibold text-yellow-50 hover:underline">Xem tất cả</p>
              </Link>
            </div>
            <div className="my-4 flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0 ">
              {mockCourses.slice(0, 3).map((course) => (
                <div key={course._id} className="sm:w-1/3 flex flex-col items-center justify-center">
                  <Img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-[201px] w-full rounded-2xl object-cover"
                  />
                  <div className="mt-3 w-full">
                    <p className="text-sm font-medium text-richblack-50">
                      {course.courseName}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <p className="text-xs font-medium text-richblack-300">
                        {course.studentsEnrolled.length} học sinh
                      </p>
                      <p className="text-xs font-medium text-richblack-300">
                        |
                      </p>
                      <p className="text-xs font-medium text-richblack-300">
                        VND {course.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
          <p className="text-center text-2xl font-bold text-richblack-5">
            Chưa tạo khóa học
          </p>
          <Link to="/dashboard/add-course">
            <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
              Tạo khóa học
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
