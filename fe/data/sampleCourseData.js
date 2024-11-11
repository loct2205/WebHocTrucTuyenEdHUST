// fakeCourseData.js
export const fakeCourseData = {
    data: {
      courseDetails: {
        _id: "123456",
        courseName: "JavaScript Basics",
        courseDescription: "A comprehensive introduction to JavaScript for beginners.",
        thumbnail: "https://example.com/course-thumbnail.jpg",
        price: 49.99,
        whatYouWillLearn: [
          "Understanding variables and data types",
          "Learning basic operators and expressions",
          "Control structures like loops and conditionals",
          "Functions and scope in JavaScript",
        ],
        courseContent: [
          {
            title: "Introduction to JavaScript",
            subSection: [
              { title: "What is JavaScript?", duration: "10 min" },
              { title: "Installing JavaScript", duration: "8 min" },
            ],
          },
          {
            title: "JavaScript Basics",
            subSection: [
              { title: "Variables and Data Types", duration: "15 min" },
              { title: "Operators and Expressions", duration: "12 min" },
            ],
          },
        ],
        ratingAndReviews: [
          { rating: 5, review: "Excellent course!" },
          { rating: 4, review: "Very informative and clear." },
          { rating: 5, review: "Loved the examples!" },
        ],
        instructor: {
          name: "John Doe",
          bio: "Experienced web developer with over 10 years of teaching experience.",
        },
        studentsEnrolled: 200,
        createdAt: "2023-01-01T00:00:00.000Z",
        tag: ["JavaScript", "Programming", "Web Development"],
      },
    },
  };
  