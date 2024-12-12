import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import "video-react/dist/video-react.css";
import { BigPlayButton, Player } from "video-react";

import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import { setCourseViewSidebar } from "../../../slices/sidebarSlice"

import IconBtn from "../../common/IconBtn";
import { HiMenuAlt1 } from "react-icons/hi";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { useDispatch, useSelector } from "react-redux";


const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef(null);
  const dispatch = useDispatch()
  
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState([]);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [courseViewSidebar, setCourseViewSidebar] = useState(false); // trạng thái sidebar

  useEffect(() => {
    ; (async () => {
      if (!courseSectionData.length) return
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`)
      } else {
        // console.log("courseSectionData", courseSectionData)
        const filteredData = courseSectionData.filter(
          (course) => course.id === Number(sectionId)
        )
        // console.log("filteredData", filteredData)
        const filteredVideoData = filteredData[0]?.subSections?.filter(
          (data) => data.id === Number(subSectionId)
        )
        // console.log("filteredVideoData = ", filteredVideoData)
        if (filteredVideoData) setVideoData(filteredVideoData[0])
        setPreviewSource(courseEntireData.thumbnail)
        setVideoEnded(false)
      }
    })()
  }, [courseSectionData, courseEntireData, location.pathname])

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data.id === Number(sectionId));
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSections.findIndex((data) => data.id === Number(subSectionId));
    return currentSectionIndex === 0 && currentSubSectionIndex === 0;
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data.id === Number(sectionId));
    const noOfSubsections = courseSectionData[currentSectionIndex]?.subSections?.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSections?.findIndex((data) => data.id === Number(subSectionId));

    if (currentSubSectionIndex !== noOfSubsections - 1) {
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSections[currentSubSectionIndex + 1].id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1].id;
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSections[0].id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
    }
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data.id === Number(sectionId));
    const noOfSubsections = courseSectionData[currentSectionIndex].subSections.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSections.findIndex((data) => data.id === Number(subSectionId));
    return currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === noOfSubsections - 1;
  };

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data.id === Number(sectionId));
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSections.findIndex((data) => data.id === Number(subSectionId));

    if (currentSubSectionIndex !== 0) {
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSections[currentSubSectionIndex - 1].id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
    } else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1].id;
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSections.length;
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSections[prevSubSectionLength - 1].id;
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
    }
  };

  // handle Lecture Completion
  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    )
    if (res) {
      dispatch(updateCompletedLectures(Number(subSectionId)))
    }
    setLoading(false)
  }
  const { courseViewSidebar } = useSelector(state => state.sidebar)
  if (courseViewSidebar && window.innerWidth <= 640) return;
  return (
    <div className="flex flex-col gap-5 text-white">
      <div
        className="sm:hidden text-white absolute left-7 top-3 cursor-pointer"
        onClick={() => dispatch(setCourseViewSidebar(!courseViewSidebar))}
      >
        {!courseViewSidebar && <HiMenuAlt1 size={33} />}
      </div>

      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          autoPlay
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
        >
          <BigPlayButton position="center" />
          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              {!completedLectures.includes(Number(subSectionId)) && (
                <IconBtn
                  disabled={loading}
                  onClick={() => handleLectureCompletion()}
                  text={!loading ? "Đánh dấu đã hoàn thành" : "Đang tải..."}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )}
              <IconBtn
                disabled={loading}
                onClick={() => {
                  if (playerRef?.current) {
                    playerRef?.current?.seek(0);
                    setVideoEnded(false);
                  }
                }}
                text="Xem lại"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />

              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="blackButton"
                  >
                    Trước
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Tiếp theo
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;
