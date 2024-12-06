import React from "react";
import ReactStars from "react-rating-stars-component";
import Img from './Img';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaStar } from "react-icons/fa";
import { apiConnector } from "../../services/apiConnector.js";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ratingsEndpoints } from "../../services/apis.js";

function ReviewSlider() {
  // const { token } = useSelector(state => state.auth)
  const [reviews, setReviews] = useState(null)
  const truncateWords = 15;

  useEffect(() => {
    ; (async () => {
      const response = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      )
      if (response?.data) {
        setReviews(response?.data)
      }
    })()
  }, [])
  if(!reviews) return;

  return (
    <div className="text-white relative w-full">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
          // modules={[Navigation]} 
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4,
            },
          }}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="w-full "
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25 min-h-[180px] max-h-[180px] glass-bg">
                  <div className="flex items-center gap-4">
                    <Img
                      src={review?.user?.imageUrl} 
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5 capitalize">{`${review.user.firstName} ${review.user.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>

                  <p className="font-medium text-richblack-25">
                    {review?.review?.split(" ").length > truncateWords
                      ? `${review.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>

                  <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-yellow-100">
                      {review?.rating}
                    </h3>
                    <ReactStars
                      count={5}
                      value={parseInt(review?.rating)} 
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
          {/* <div className="swiper-button-next text-white/50 hover:text-white transition duration-300"></div>
          <div className="swiper-button-prev text-white/50 hover:text-white transition duration-300"></div> */}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;
