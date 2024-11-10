import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal.jsx";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar.jsx";

export default function ViewCourse() {
  const [reviewModal, setReviewModal] = useState(false);
  const [courseViewSidebar, setCourseViewSidebar] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  // Dữ liệu mẫu cho khóa học
  const [courseData, setCourseData] = useState({
    courseName: "Khóa học React cơ bản",
    thumbnail: "link-hình-ảnh",
    sections: [
      {
        _id: "section1",
        sectionName: "Giới thiệu",
        subSections: [
          {
            _id: "sub1",
            title: "Chào mừng",
            videoUrl: "link-video-1",
            description: "Mô tả bài học chào mừng",
          },
          {
            _id: "sub2",
            title: "Cài đặt môi trường",
            videoUrl: "link-video-2",
            description: "Mô tả cài đặt môi trường",
          },
        ],
      },
      {
        _id: "section2",
        sectionName: "React cơ bản",
        subSections: [
          {
            _id: "sub3",
            title: "JSX là gì?",
            videoUrl: "link-video-3",
            description: "Mô tả về JSX",
          },
          {
            _id: "sub4",
            title: "Component và Props",
            videoUrl: "link-video-4",
            description: "Mô tả về Component và Props",
          },
        ],
      },
    ],
  });

  // Trạng thái bài học đã hoàn thành
  const [completedLectures, setCompletedLectures] = useState(["sub1"]);

  // Tổng số bài học
  const [totalLectures, setTotalLectures] = useState(0);

  // Tính tổng số bài học khi dữ liệu khóa học thay đổi
  useEffect(() => {
    if (courseData.sections) {
      const total = courseData.sections.reduce(
        (acc, section) => acc + section.subSections.length,
        0
      );
      setTotalLectures(total);
    }
  }, [courseData]);

  // Cập nhật kích thước màn hình
  useEffect(() => {
    const handleScreenSize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleScreenSize);
    handleScreenSize();
    return () => window.removeEventListener("resize", handleScreenSize);
  }, []);

  // Đóng/mở sidebar dựa vào kích thước màn hình
  useEffect(() => {
    if (screenSize <= 640) {
      setCourseViewSidebar(false);
    } else {
      setCourseViewSidebar(true);
    }
  }, [screenSize]);

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        {courseViewSidebar && (
          <VideoDetailsSidebar
            setReviewModal={setReviewModal}
            courseData={courseData}
            completedLectures={completedLectures}
            totalLectures={totalLectures}
            setCourseViewSidebar={setCourseViewSidebar}
          />
        )}

        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto mt-14">
          <div className="mx-6">
            <Outlet
              context={{
                courseData,
                completedLectures,
                setCompletedLectures,
              }}
            />
          </div>
        </div>
      </div>

      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
}
