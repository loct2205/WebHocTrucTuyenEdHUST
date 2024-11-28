import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Img from "./../../common/Img";

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  // Giả lập danh sách khóa học đã ghi danh
  useEffect(() => {
    setTimeout(() => {
      const fakeEnrolledCourses = [
        {
          _id: "1",
          thumbnail: "https://via.placeholder.com/150",
          courseName: "Khóa học 1",
          courseDescription: "Mô tả khóa học 1",
          totalDuration: "10 giờ",
          progressPercentage: 50,
          courseContent: [{ _id: "section1", subSection: [{ _id: "sub1" }] }],
        },
        {
          _id: "2",
          thumbnail: "https://via.placeholder.com/150",
          courseName: "Khóa học 2",
          courseDescription: "Mô tả khóa học 2",
          totalDuration: "15 giờ",
          progressPercentage: 70,
          courseContent: [{ _id: "section2", subSection: [{ _id: "sub2" }] }],
        },
      ];
      setEnrolledCourses(fakeEnrolledCourses);
    }, 1000);
  }, []);

  // Hiển thị khi đang tải
  const sklItem = () => {
    return (
      <div className="flex border border-richblack-700 px-5 py-3 w-full">
        <div className="flex flex-1 gap-x-4 ">
          <div className="h-14 w-14 rounded-lg skeleton "></div>

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

  // Hiển thị nếu không có khóa học nào
  if (enrolledCourses?.length === 0) {
    return (
      <p className="grid h-[50vh] w-full place-content-center text-center text-richblack-5 text-3xl">
        Bạn chưa đăng ký khóa học nào.
      </p>
    );
  }

  return (
    <>
      <div className="text-4xl text-richblack-5 font-boogaloo text-center sm:text-left">
        Khóa học đã đăng ký
      </div>
      {
        <div className="my-8 text-richblack-5">
          {/* Tiêu đề */}
          <div className="flex rounded-t-2xl bg-richblack-800 ">
            <p className="w-[45%] px-5 py-3">Tên khóa học</p>
            <p className="w-1/4 px-2 py-3">Thời lượng</p>
            <p className="flex-1 px-2 py-3">Tiến độ</p>
          </div>

          {/* Hiển thị khi đang tải */}
          {!enrolledCourses && (
            <div>
              {sklItem()}
              {sklItem()}
              {sklItem()}
              {sklItem()}
              {sklItem()}
            </div>
          )}

          {/* Tên khóa học */}
          {enrolledCourses?.map((course, i, arr) => (
            <div
              className={`flex flex-col sm:flex-row sm:items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-2xl" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex sm:w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  );
                }}
              >
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

              {/* chỉ hiển thị cho thiết bị nhỏ */}
              {/* thời lượng - tiến độ */}
              <div className="sm:hidden">
                <div className=" px-2 py-3">{course?.totalDuration}</div>

                <div className="flex sm:w-2/5 flex-col gap-2 px-2 py-3">
                  <p>Tiến độ: {course.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>
              </div>

              {/* chỉ hiển thị cho thiết bị lớn */}
              {/* thời lượng - tiến độ */}
              <div className="hidden w-1/5 sm:flex px-2 py-3">
                {course?.totalDuration}
              </div>
              <div className="hidden sm:flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Tiến độ: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      }
    </>
  );
}
