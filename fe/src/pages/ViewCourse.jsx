import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";

import { setCourseViewSidebar } from "../slices/sidebarSlice";

export default function ViewCourse() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);

  // Dữ liệu mẫu
  const courseData = {
    courseDetails: {
      courseContent: [
        {
          title: "Giới thiệu về khóa học",
          subSection: [{ title: "Bài giảng 1" }, { title: "Bài giảng 2" }],
        },
        {
          title: "Phần nâng cao",
          subSection: [{ title: "Bài giảng 3" }, { title: "Bài giảng 4" }],
        },
      ],
      title: "Khóa học lập trình cơ bản",
    },
    completedVideos: ["Bài giảng 1", "Bài giảng 2"],
  };

  useEffect(() => {
    // Mô phỏng dữ liệu
    dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
    dispatch(setEntireCourseData(courseData.courseDetails));
    dispatch(setCompletedLectures(courseData.completedVideos));

    // Tính tổng số bài giảng
    let lectures = 0;
    courseData?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length;
    });
    dispatch(setTotalNoOfLectures(lectures));
  }, [dispatch]);

  // Xử lý sidebar cho thiết bị nhỏ
  const { courseViewSidebar } = useSelector((state) => state.sidebar);
  const [screenSize, setScreenSize] = useState(undefined);

  // Cập nhật kích thước màn hình hiện tại
  useEffect(() => {
    const handleScreenSize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleScreenSize);
    handleScreenSize();
    return () => window.removeEventListener("resize", handleScreenSize);
  }, []);

  // Đóng/mở sidebar theo kích thước màn hình
  useEffect(() => {
    if (screenSize <= 640) {
      dispatch(setCourseViewSidebar(false));
    } else dispatch(setCourseViewSidebar(true));
  }, [screenSize, dispatch]);

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)] ">
        {/* Sidebar hiển thị thông tin khóa học */}
        {courseViewSidebar && (
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
        )}

        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto mt-14">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Modal đánh giá khóa học */}
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
}
