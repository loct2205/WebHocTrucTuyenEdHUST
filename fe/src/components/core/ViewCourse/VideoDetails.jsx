import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "video-react/dist/video-react.css";
import { BigPlayButton, Player } from "video-react";
import IconBtn from "../../common/IconBtn";
import { HiMenuAlt1 } from "react-icons/hi";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef(null);

  // Dữ liệu mẫu cho khóa học
  const courseSectionData = [
    {
      _id: "section1",
      sectionName: "Phần 1",
      subSection: [
        { _id: "subsection1", title: "Bài 1", videoUrl: "video1.mp4", description: "Mô tả bài 1" },
        { _id: "subsection2", title: "Bài 2", videoUrl: "video2.mp4", description: "Mô tả bài 2" }
      ]
    },
    {
      _id: "section2",
      sectionName: "Phần 2",
      subSection: [
        { _id: "subsection3", title: "Bài 3", videoUrl: "video3.mp4", description: "Mô tả bài 3" }
      ]
    }
  ];
  const courseEntireData = { thumbnail: "thumbnail.jpg" };
  const completedLectures = ["subsection1"]; // Dữ liệu hoàn thành mẫu

  const [videoData, setVideoData] = useState({});
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courseViewSidebar, setCourseViewSidebar] = useState(false); // trạng thái sidebar

  useEffect(() => {
    if (!courseSectionData.length) return;
    if (!courseId && !sectionId && !subSectionId) {
      navigate(`/dashboard/enrolled-courses`);
    } else {
      const filteredData = courseSectionData.find((course) => course._id === sectionId);
      const filteredVideoData = filteredData?.subSection.find((data) => data._id === subSectionId);
      if (filteredVideoData) setVideoData(filteredVideoData);
      setPreviewSource(courseEntireData.thumbnail);
      setVideoEnded(false);
    }
  }, [courseSectionData, courseEntireData, location.pathname, navigate, courseId, sectionId, subSectionId]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId);
    return currentSectionIndex === 0 && currentSubSectionIndex === 0;
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    const noOfSubsections = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== noOfSubsections - 1) {
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
    }
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    const noOfSubsections = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId);
    return currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === noOfSubsections - 1;
  };

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== 0) {
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
    } else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
    }
  };

  const handleLectureCompletion = () => {
    setLoading(true);
    console.log("Đã đánh dấu hoàn thành:", subSectionId);
    setLoading(false);
  };

  if (courseViewSidebar && window.innerWidth <= 640) return null;

  return (
    <div className="flex flex-col gap-5 text-white">
      <div
        className="sm:hidden text-white absolute left-7 top-3 cursor-pointer"
        onClick={() => setCourseViewSidebar(!courseViewSidebar)}
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
              {!completedLectures.includes(subSectionId) && (
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
