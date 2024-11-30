import React, { useEffect, useState } from "react";
import { SampleData } from "../../data/sampleCourseData";

import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import ConfirmationModal from "../components/common/ConfirmationModal"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStars"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { formatDate } from "../services/formatDate"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
// import { buyCourse } from "../services/operations/studentFeaturesAPI"

import GetAvgRating from "../utils/avgRating"
import { ACCOUNT_TYPE } from './../utils/constants';
import { addToCart } from "../slices/cartSlice"

import { GiReturnArrow } from 'react-icons/gi'
import { MdOutlineVerified } from 'react-icons/md'
import Img from './../components/common/Img';
import toast from "react-hot-toast"
const fakeUser = {
  _id: "12345",
  firstName: "Nguyễn",
  lastName: "Hải",
  email: "nguyen.hai@example.com",
  accountType: "STUDENT",
  profilePicture: "/images/profile-picture.jpg",
  additionalDetails: {
    about: "Học viên đầy nhiệt huyết với đam mê lập trình."
  },
};

const guestUser = {
  _id: null,
  firstName: "Khách",
  lastName: "Vãng Lai",
  email: "",
  accountType: "GUEST",
  isAuthenticated: false,
  profilePicture: "/images/default-profile.jpg",
  additionalDetails: {
    about: "Người dùng chưa đăng nhập."
  },
};


function CourseDetails() {
  const { user } = useSelector((state) => state.profile) || { user: guestUser }
  const { token } = useSelector((state) => state.auth || {})
  const { loading } = useSelector((state) => state.profile || {})
  const { paymentLoading } = useSelector((state) => state.course || {})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Getting courseId from url parameter
  const { courseId } = useParams()

  // Declare a state to save the course details
  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)
  useEffect(() => {
    // Thay thế việc gọi API bằng việc lấy dữ liệu từ SampleData
    const courseDetails = SampleData.selectedCategory.courses.find(
      (course) => course._id === courseId
    );
    setResponse({ data: { courseDetails } });
  }, [courseId])

  // Calculate avg rating and review count
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews)
    setAvgReviewCount(count)
  }, [response])

  // Collapse all
  // const [collapse, setCollapse] = useState("")
  const [isActive, setIsActive] = useState(Array(0))
  const handleActive = (id) => {
    // console.log("called", id)
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    )
  }

  // Calculate total number of lectures
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  useEffect(() => {
    let lectures = 0
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [response])

  if (paymentLoading || loading || !response) {
    return (
      <div className={`mt-24 p-5 flex flex-col justify-center gap-4  `}>
        {/* Loading Skeleton */}
      </div>
    )
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
    tag
  } = response?.data?.courseDetails

  const handleBuyCourse = () => {
    if (token) {
      // Handle buy course logic
    } else {
      // Handle not logged in scenario
    }
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Bạn là một giảng viên. Bạn không thể mua khóa học.")
      return
    }
    if (token) {
      dispatch(addToCart(response?.data.courseDetails))
      return
    }
    setConfirmationModal({
      text1: "Bạn chưa đăng nhập!",
      text2: "Vui lòng đăng nhập để thêm vào giỏ hàng.",
      btn1Text: "Đăng nhập",
      btn2Text: "Hủy bỏ",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  return (
    <>
      <div className={`relative w-full bg-richblack-800`}>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-cente py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">

            {/* Go back button */}
            <div className="mb-5 lg:mt-10 lg:mb-0 z-[100]  " onClick={() => navigate(-1)}>
              <GiReturnArrow className="w-10 h-10 text-yellow-100 hover:text-yellow-50 cursor-pointer" />
            </div>

            {/* will appear only for small size */}
            <div className="relative block max-h-[30rem] lg:hidden">
              <Img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
            </div>

            {/* Course data */}
            <div className={`mb-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}>
              <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">{courseName}</p>
              <p className='text-richblack-200'>{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews.length} đánh giá)`}</span>
                <span>{`${studentsEnrolled} học viên đăng ký`}</span>
              </div>
              <p className="capitalize "> Được tạo bởi <span className="font-semibold underline">{instructor.firstName} {instructor.lastName}</span></p>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Được tạo vào {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">{" "} <HiOutlineGlobeAlt /> Việt Nam</p>
              </div>
            </div>

            {/* will appear only for small size */}
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">{price}đ</p>
              <button className="yellowButton" onClick={handleBuyCourse}>Mua ngay</button>
              <button onClick={handleAddToCart} className="blackButton">Thêm vào giỏ hàng</button>
            </div>
          </div>

          {/* Floating Courses Card */}
          <div className="right-[1.5rem] top-[60px] mx-auto hidden lg:block lg:absolute min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0">
            <CourseDetailsCard
              course={response?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">Bạn sẽ học được gì</p>
            <div className="mt-3">
              {whatYouWillLearn && (
                whatYouWillLearn.split('\n').map((line, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <p className="font-bold">{index + 1}.</p>
                    <p className="ml-2">{line}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col lg:flex-row gap-4">
            <p className="text-xl font-bold">Tags</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {
                tag && tag.map((item, ind) => (
                  <p key={ind} className="bg-yellow-50 p-[2px] text-black rounded-full text-center font-semibold" >
                    {item}
                  </p>
                ))
              }
            </div>
          </div>

          {/* Course Content Section */}
          <div className="max-w-[830px] mt-9">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Nội dung khóa học</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    {courseContent.length} {`section(s)`}
                  </span>
                  <span>
                    {totalNoOfLectures} {`lecture(s)`}
                  </span>
                  <span>{response.data?.totalDuration} Tổng thời gian</span>
                </div>
                <button
                  className="text-yellow-25"
                  onClick={() => setIsActive([])}
                >
                  Thu gọn tất cả các mục
                </button>
              </div>
            </div>

            {/* Course Details Accordion - section Subsection */}
            <div className="py-4 ">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author Details */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Tác giả</p>
              <div className="flex items-center gap-4 py-4">
                <Img
                  src={instructor.image}
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <p className="text-lg capitalize flex items-center gap-2 font-semibold">{`${instructor.firstName} ${instructor.lastName}`}
                    <span><MdOutlineVerified className='w-5 h-5 text-[#00BFFF]' /></span>
                  </p>
                  <p className="text-richblack-50">{instructor?.additionalDetails?.about}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

export default CourseDetails;
