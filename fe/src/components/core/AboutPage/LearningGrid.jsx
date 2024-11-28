import React from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "Học trực tuyến",
    highlightText: "Mọi người, bất cứ đâu",
    description:
      "EdHUST hợp tác với hơn 275+ trường đại học và công ty hàng đầu để mang đến các khóa học trực tuyến linh hoạt, chi phí hợp lý và phù hợp với công việc cho cá nhân và tổ chức trên toàn cầu.",
    BtnText: "Đăng ký ngay",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Dựa trên nhu cầu thực tế",
    description:
      "Tiết kiệm thời gian và chi phí! Chương trình giảng dạy của EdHUST được thiết kế dễ hiểu và phù hợp với nhu cầu thực tế của ngành.",
  },
  {
    order: 2,
    heading: "Phương pháp",
    description:
      "Đến từ hơn 275+ trường đại học và công ty hàng đầu hợp tác với EdHUST.",
  },
  {
    order: 3,
    heading: "Chứng chỉ",
    description:
      "Được cấp bởi hơn 275+ trường đại học và công ty hàng đầu.",
  },
  {
    order: 4,
    heading: `Tiêu chuẩn chất lượng"`,
    description:
      "Khóa học đạt tiêu chuẩn cao, phù hợp với nhu cầu thực tế của ngành. Giảng viên là các giảng viên, chuyên gia.",
  },
  {
    order: 5,
    heading: "Việc làm",
    description:
      "Đến từ hơn 275+ trường đại học và công ty hàng đầu hợp tác với EdHUST.",
  },
];

const LearningGrid = () => {

  return (
    <div className="grid mx-auto w-[350px] lg:w-fit grid-cols-1 lg:grid-cols-4 mb-12">
      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`${i === 0 && "lg:col-span-2 lg:h-[294px]"}  ${card.order % 2 === 1
              ? "bg-richblack-700 h-[294px]"
              : card.order % 2 === 0
                ? "bg-richblack-800 h-[294px]"
                : "bg-transparent"
              } ${card.order === 3 && "lg:col-start-2"}  `}
          >
            {card.order < 0 ? (
              <div className="lg:w-[90%] flex flex-col gap-3 pb-10 lg:pb-0">
                <div className="text-4xl font-semibold ">
                  {card.heading}
                  <HighlightText text={card.highlightText} />
                </div>
                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>

                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-8">
                <h1 className="text-richblack-5 text-lg">{card.heading}</h1>

                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;