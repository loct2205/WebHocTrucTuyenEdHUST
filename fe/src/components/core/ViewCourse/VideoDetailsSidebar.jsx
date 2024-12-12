import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import IconBtn from "./../../common/IconBtn";
import { setCourseViewSidebar } from "../../../slices/sidebarSlice"

import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";

import { IoMdClose } from 'react-icons/io';
import { HiMenuAlt1 } from 'react-icons/hi';
import { useDispatch, useSelector } from "react-redux";

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState(""); // store curr section id
  const [videoBarActive, setVideoBarActive] = useState(""); // store curr SubSection Id
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)
  const { courseViewSidebar } = useSelector(state => state.sidebar)

  // Đặt phần và bài học đang hoạt động
  useEffect(() => {
    if (!courseSectionData.length) return;
    const currentSectionIndex = courseSectionData.findIndex((data) => data.id === Number(sectionId));
    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSections.findIndex((data) => data.id === Number(subSectionId));
    const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSections[currentSubSectionIndex]?.id;
    setActiveStatus(courseSectionData[currentSectionIndex]?.id);
    setVideoBarActive(activeSubSectionId);
  }, [courseSectionData, location.pathname, sectionId, subSectionId]);

  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between">
            <div
              className="sm:hidden text-white cursor-pointer"
              onClick={() => setCourseViewSidebar(!courseViewSidebar)}
            >
              {courseViewSidebar ? <IoMdClose size={33} /> : <HiMenuAlt1 size={33} />}
            </div>

            <button
              onClick={() => navigate(`/dashboard/enrolled-courses`)}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              title="Quay lại"
            >
              <IoIosArrowBack size={30} />
            </button>

            <IconBtn
              text="Thêm đánh giá"
              onClick={() => setReviewModal(true)}
            />
          </div>

          <div className="flex flex-col">
            <p>{courseEntireData?.courseName || "Tên khóa học"}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData?.map((section, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() => setActiveStatus(section.id)}
              key={index}
            >
              <div className="flex justify-between bg-richblack-700 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {section?.sectionName || "Tên phần học"}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-medium">
                    Bài học {section?.subSections?.length}
                  </span>
                  <span
                    className={`${activeStatus === section?.id
                      ? "rotate-0 transition-all duration-500"
                      : "rotate-180"
                      } `}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {activeStatus === section.id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {section.subSections.map((topic, i) => (
                    <div
                      className={`flex gap-3 px-5 py-2 ${videoBarActive === topic.id
                        ? "bg-yellow-200 font-semibold text-richblack-800"
                        : "hover:bg-richblack-900"
                        } `}
                      key={i}
                      onClick={() => {
                        navigate(`/view-course/${courseEntireData.id}/section/${section.id}/sub-section/${topic.id}`);
                        setVideoBarActive(topic.id);
                        courseViewSidebar && window.innerWidth <= 640 && setCourseViewSidebar(false);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures?.includes(topic.id)}
                        onChange={() => { }}
                      />
                      {topic.title || "Tên bài học"}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
