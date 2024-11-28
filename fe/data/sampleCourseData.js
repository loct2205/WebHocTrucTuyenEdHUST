// data/SampleData
export const SampleData = {
  selectedCategory: {
    courses: [
      {
        _id: "1",
        courseName: "React cho Người Mới Bắt Đầu",
        courseDescription: "Học những kiến thức cơ bản về React, một thư viện front-end mạnh mẽ.",
        thumbnail: "../../../src/assets/Images/course img/Programming/NenTang.png",
        price: 200,
        whatYouWillLearn: "Hiểu về các thành phần (Components) của React\nQuản lý State\nXây dựng giao diện người dùng động",
        courseContent: [
          {
            sectionName: "Giới Thiệu",
            subSection: [
              { title: "React là gì?", duration: "5 phút" },
              { title: "Bắt đầu với React", duration: "10 phút" },
            ],
          },
          {
            sectionName: "Các Chủ Đề Nâng Cao",
            subSection: [
              { title: "Quản lý State", duration: "15 phút" },
              { title: "Routing", duration: "12 phút" },
            ],
          },
        ],
        ratingAndReviews: [{ rating: 4.5 }, { rating: 5 }, { rating: 4 }],
        instructor: {
          firstName: "Ngô",
          lastName: "Thanh F",
          image: "../../../src/assets/avatar/avatar1.jpg",
          additionalDetails: { about: "Kỹ sư phần mềm với 10 năm kinh nghiệm." },
        },
        studentsEnrolled: 120,
        createdAt: "2023-01-01",
        tag: ["React", "Frontend", "JavaScript"],
      },
    ],
  },
};
