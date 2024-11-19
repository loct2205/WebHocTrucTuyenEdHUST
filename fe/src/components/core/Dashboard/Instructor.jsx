import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import InstructorChart from "./InstructorDashboard/InstructorChart";
import Img from "./../../common/Img";

export default function Instructor() {
  const { user } = useSelector((state) => state.profile);

  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);

  // Giảng viên
  useEffect(() => {
    setLoading(true);
    // Giả lập API
    setTimeout(() => {
      const fakeInstructorData = [
        {
          totalAmountGenerated: 5000000,
          totalStudentsEnrolled: 200,
        },
      ];
      const fakeCourses = [
        {
          _id: "1",
          thumbnail: "https://via.placeholder.com/150",
          courseName: "Khóa học 1",
          studentsEnrolled: ["Sinh viên 1", "Sinh viên 2"],
          price: 1000000,
        },
        {
          _id: "2",
          thumbnail: "https://via.placeholder.com/150",
          courseName: "Khóa học 2",
          studentsEnrolled: ["Sinh viên 3", "Sinh viên 4"],
          price: 1200000,
        },
        {
          _id: "3",
          thumbnail: "https://via.placeholder.com/150",
          courseName: "Khóa học 3",
          studentsEnrolled: ["Sinh viên 5", "Sinh viên 6"],
          price: 1500000,
        },
      ];
      setInstructorData(fakeInstructorData);
      setCourses(fakeCourses);
      setLoading(false);
    }, 1000);
  }, []);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );
  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

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
              {/* vòng tròn */}
              <div className="w-60 h-60 rounded-full  mt-4 grid place-items-center skeleton"></div>
            </div>
          </div>
          {/* cột phải */}
          <div className="sm:flex hidden min-w-[250px] flex-col rounded-xl p-6 skeleton"></div>
        </div>

        {/* hàng dưới */}
        <div className="flex flex-col gap-y-6  mt-5">
          <div className="flex justify-between">
            <p className="text-lg font-bold text-richblack-5 pl-5">
              Các khóa học của bạn
            </p>
            <Link to="/dashboard/my-courses">
              <p className="text-xs font-semibold text-yellow-50 hover:underline pr-5">
                Xem tất cả
              </p>
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
          Xin chào {user?.firstName} 👋
        </h1>
        <p className="font-medium text-richblack-200 text-center sm:text-left">
          Hãy bắt đầu điều gì đó mới
        </p>
      </div>

      {loading ? (
        <div>{skItem()}</div>
      ) : courses.length > 0 ? (
        <div>
          <div className="my-4 flex h-[450px] space-x-4">
            {/* Hiển thị biểu đồ */}
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={instructorData} />
            ) : (
              <div className="flex-1 rounded-md bg-richblack-800 p-6">
                <p className="text-lg font-bold text-richblack-5">
                  Hình ảnh hóa
                </p>
                <p className="mt-4 text-xl font-medium text-richblack-50">
                  Không đủ dữ liệu để hiển thị
                </p>
              </div>
            )}

            {/* cột trái */}
            {/* Thống kê tổng */}
            <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
              <p className="text-lg font-bold text-richblack-5">Thống kê</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-lg text-richblack-200">Tổng số khóa học</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {courses.length}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">
                    Tổng số sinh viên
                  </p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {totalStudents}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">Tổng thu nhập</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {totalAmount.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hiển thị 3 khóa học */}
          <div className="rounded-md bg-richblack-800 p-6">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-richblack-5">
                Các khóa học của bạn
              </p>
              <Link to="/dashboard/my-courses">
                <p className="text-xs font-semibold text-yellow-50 hover:underline">
                  Xem tất cả
                </p>
              </Link>
            </div>

            <div className="my-4 flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0 ">
              {courses.slice(0, 3).map((course) => (
                <div
                  key={course._id}
                  className="sm:w-1/3 flex flex-col items-center justify-center"
                >
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
                        {course.studentsEnrolled.length} sinh viên
                      </p>
                      <p className="text-xs font-medium text-richblack-300">
                        |
                      </p>
                      <p className="text-xs font-medium text-richblack-300">
                        {course.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
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
            Bạn chưa tạo khóa học nào
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
