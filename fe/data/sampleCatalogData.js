// sampleData.js
export const sampleCatalogData = {
  selectedCategory: {
      name: "Programming",
      description: "Learn about various programming languages and techniques.",
      courses: [
          {
              id: 1,
              courseName: "Java Basics",
              description: "A course on Java basics.",
              price: 49.99,
              thumbnail: "image-url",
          },
          // thêm các course khác nếu có
      ]
  },
  differentCategory: {
      name: "Web Development",
      courses: [
          {
              id: 2,
              courseName: "HTML & CSS",
              description: "A course on HTML and CSS.",
              price: 29.99,
              thumbnail: "image-url",
          },
          // thêm các course khác nếu có
      ]
  },
  mostSellingCourses: [
      {
          id: 3,
          courseName: "JavaScript Essentials",
          description: "Learn JavaScript from scratch.",
          price: 39.99,
          thumbnail: "image-url",
      },
      // thêm các khóa học khác nếu có
  ]
};
