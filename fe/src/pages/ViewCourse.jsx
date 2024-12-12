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
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";

import { setCourseViewSidebar } from "../slices/sidebarSlice";

export default function ViewCourse() {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);

 // get Full Details Of Course
  useEffect(() => {
  ; (async () => {
    const courseData = await getFullDetailsOfCourse(courseId, token)
    dispatch(setCourseSectionData(courseData?.sections ?? []))
    dispatch(setEntireCourseData(courseData))
    dispatch(setCompletedLectures(courseData?.completedLectures ?? []))
    let lectures = 0
    courseData?.sections?.forEach((sec) => {
      lectures += sec?.subSections?.length ?? 0
    })
    dispatch(setTotalNoOfLectures(lectures))
  })()

}, [])

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
