// sampleData.js
export const sampleCatalogData = {
    selectedCategory:[
        {
            name: "Lập trình",
            description: "Tìm hiểu về các ngôn ngữ lập trình và kỹ thuật khác nhau là bước đầu quan \
      trọng để trở thành một nhà phát triển phần mềm chuyên nghiệp. Khám phá cách sử dụng các \
      ngôn ngữ như Python, JavaScript, Java và C++ để giải quyết các vấn đề thực tế. Ngoài ra, bạn sẽ học được các \
      kỹ thuật như lập trình hướng đối tượng, xử lý dữ liệu, và phát triển web. Chương trình học linh hoạt, dễ tiếp cận, \
      giúp bạn tiến bộ dù bạn là người mới bắt đầu hay đã có kinh nghiệm. Hãy sẵn sàng nâng cao kỹ năng và mở rộng cơ hội \
      nghề nghiệp của bạn ngay hôm nay!",
            courses: [
                {
                    _id: 1,
                    courseName: "Kiến Thức Nhập Môn IT",
                    description: "Cung cấp cái nhìn tổng quan về ngành IT - Lập trình web",
                    price: 499000,
                    thumbnail: "../../../src/assets/Images/course img/Programming/NenTang.png",
                    instructor: { firstName: "Nguyễn", lastName: "Văn A" },
                    avgReviewCount: 4.8,
                    ratingAndReviews: [
                        { review: "Rất hữu ích!", rating: 5 },
                        { review: "Nội dung cơ bản nhưng đủ chi tiết.", rating: 4 }
                    ]
                },
                {
                    _id: 2,
                    courseName: "Lập trình C++ cơ bản, nâng cao",
                    description: "Khóa học lập trình C++ từ cơ bản tới nâng cao dành cho người mới bắt đầu...",
                    price: 499000,
                    thumbnail: "../../../src/assets/Images/course img/Programming/C++.png",
                    instructor: { firstName: "Trần", lastName: "Bảo B" },
                    avgReviewCount: 4.7,
                    ratingAndReviews: [
                        { review: "Rất tuyệt!", rating: 5 },
                        { review: "Rõ ràng và chi tiết.", rating: 4 }
                    ]
                },
                {
                    _id: 3,
                    courseName: "HTML CSS từ Zero to Hero",
                    description: "Trong khóa này chúng ta sẽ cùng nhau xây dựng giao diện 2 trang web là The Band & Shopee.",
                    price: 450000,
                    thumbnail: "../../../src/assets/Images/course img/Programming/HTMLCSS.png",
                    instructor: { firstName: "Phạm", lastName: "Cẩm C" },
                    avgReviewCount: 4.5,
                    ratingAndReviews: [
                        { review: "Thực hành rất tốt!", rating: 5 },
                        { review: "Giảng viên dễ hiểu.", rating: 4 }
                    ]
                },
                {
                    _id: 4,
                    courseName: "Responsive Với Grid System",
                    description: "Trong khóa này chúng ta sẽ học về cách xây dựng giao diện web responsive với Grid System...",
                    price: 299000,
                    thumbnail: "../../../src/assets/Images/course img/Programming/Responsive.png",
                    instructor: { firstName: "Lê", lastName: "Duy D" },
                    avgReviewCount: 4.2,
                    ratingAndReviews: [
                        { review: "Khá bổ ích.", rating: 4 },
                        { review: "Học xong làm được ngay!", rating: 5 }
                    ]
                },
                {
                    _id: 5,
                    courseName: "Lập Trình JavaScript Cơ Bản",
                    description: "Học Javascript cơ bản phù hợp cho người chưa từng học lập trình...",
                    price: 299000,
                    thumbnail: "../../../src/assets/Images/course img/Programming/JSCoBan.png",
                    instructor: { firstName: "Nguyễn", lastName: "Thị E" },
                    avgReviewCount: 4.6,
                    ratingAndReviews: [
                        { review: "Nội dung dễ hiểu.", rating: 5 },
                        { review: "Học rất thực tế.", rating: 4 }
                    ]
                },
                {
                    _id: 6,
                    courseName: "Lập Trình JavaScript Nâng Cao",
                    description: "Hiểu sâu hơn về cách Javascript hoạt động, tìm hiểu về IIFE, closure...",
                    price: 299000,
                    thumbnail: "../../../src/assets/Images/course img/Programming/JSNangCao.png",
                    instructor: { firstName: "Ngô", lastName: "Thanh F" },
                    avgReviewCount: 4.8,
                    ratingAndReviews: [
                        { review: "Nâng cao rất cần thiết.", rating: 5 },
                        { review: "Thực sự đáng học.", rating: 5 }
                    ]
                },
                {
                    _id: 7,
                    courseName: "Xây Dựng Website với ReactJS",
                    description: "Khóa học ReactJS từ cơ bản tới nâng cao, kết quả của khóa học này là bạn có thể làm hầu hết...",
                    price: 299000,
                    thumbnail: "../../../src/assets/Images/course img/Programming/ReactJS.png",
                    instructor: { firstName: "Hoàng", lastName: "Văn G" },
                    avgReviewCount: 4.9,
                    ratingAndReviews: [
                        { review: "Ứng dụng thực tế cao.", rating: 5 },
                        { review: "Dự án cuối khóa rất hay.", rating: 5 }
                    ]
                },
                {
                    _id: 8,
                    courseName: "Node & ExpressJS",
                    description: "Học Back-end với Node & ExpressJS framework, hiểu các khái niệm khi làm Back-end...",
                    price: 299000,
                    thumbnail: "../../../src/assets/Images/course img/Programming/NodeExpressJS.png",
                    instructor: { firstName: "Vũ", lastName: "Quốc H" },
                    avgReviewCount: 4.7,
                    ratingAndReviews: [
                        { review: "Backend đầy đủ kiến thức cơ bản.", rating: 5 },
                        { review: "RESTful API rất dễ hiểu.", rating: 4 }
                    ]
                }
                // thêm các course khác nếu có
            ]
        },
        {
            name: "Lập trình",
            description: "Tìm hiểu về các ngôn ngữ lập trình và kỹ thuật khác nhau là bước đầu quan \
      trọng để trở thành một nhà phát triển phần mềm chuyên nghiệp. Khám phá cách sử dụng các \
      ngôn ngữ như Python, JavaScript, Java và C++ để giải quyết các vấn đề thực tế. Ngoài ra, bạn sẽ học được các \
      kỹ thuật như lập trình hướng đối tượng, xử lý dữ liệu, và phát triển web. Chương trình học linh hoạt, dễ tiếp cận, \
      giúp bạn tiến bộ dù bạn là người mới bắt đầu hay đã có kinh nghiệm. Hãy sẵn sàng nâng cao kỹ năng và mở rộng cơ hội \
      nghề nghiệp của bạn ngay hôm nay!",
            courses: [
                {
                    _id: 1,
                    courseName: "Kiến Thức Nhập Môn IT",
                    description: "Cung cấp cái nhìn tổng quan về ngành IT - Lập trình web",
                    price: 499000,
                    thumbnail: "../../../src/assets/Images/course img/Programming/NenTang.png",
                    instructor: { firstName: "Nguyễn", lastName: "Văn A" },
                    avgReviewCount: 4.8,
                    ratingAndReviews: [
                        { review: "Rất hữu ích!", rating: 5 },
                        { review: "Nội dung cơ bản nhưng đủ chi tiết.", rating: 4 }
                    ]
                },
            ]
        },    
    ],
    differentCategory:
        {
            name: "Lập trình",
            courses: [
                {
                    _id: 3,
                    courseName: "HTML CSS từ Zero to Hero",
                    description: "Trong khóa này chúng ta sẽ cùng nhau xây dựng giao diện 2 trang web là The Band & Shopee.",
                    price: 450000,
                    thumbnail: "../../../src/assets/Images/course img/Programming/HTMLCSS.png",
                    instructor: { firstName: "Phạm", lastName: "Cẩm C" },
                    avgReviewCount: 4.5,
                    ratingAndReviews: [
                        { review: "Thực hành rất tốt!", rating: 5 },
                        { review: "Giảng viên dễ hiểu.", rating: 4 }
                    ]
                },
                {
                    _id: 5,
                    courseName: "Lập Trình JavaScript Cơ Bản",
                    description: "Học Javascript cơ bản phù hợp cho người chưa từng học lập trình...",
                    price: 299000,
                    thumbnail: "../../../src/assets/Images/course img/Programming/JSCoBan.png",
                    instructor: { firstName: "Nguyễn", lastName: "Thị E" },
                    avgReviewCount: 4.6,
                    ratingAndReviews: [
                        { review: "Nội dung dễ hiểu.", rating: 5 },
                        { review: "Học rất thực tế.", rating: 4 }
                    ]
                },
                {
                    _id: 7,
                    courseName: "Xây Dựng Website với ReactJS",
                    description: "Khóa học ReactJS từ cơ bản tới nâng cao, kết quả của khóa học này là bạn có thể làm hầu hết...",
                    price: 299000,
                    thumbnail: "../../../src/assets/Images/course img/Programming/ReactJS.png",
                    instructor: { firstName: "Hoàng", lastName: "Văn G" },
                    avgReviewCount: 4.9,
                    ratingAndReviews: [
                        { review: "Ứng dụng thực tế cao.", rating: 5 },
                        { review: "Dự án cuối khóa rất hay.", rating: 5 }
                    ]
                },
                {
                    _id: 8,
                    courseName: "Node & ExpressJS",
                    description: "Học Back-end với Node & ExpressJS framework, hiểu các khái niệm khi làm Back-end...",
                    price: 299000,
                    thumbnail: "../../../src/assets/Images/course img/Programming/NodeExpressJS.png",
                    instructor: { firstName: "Vũ", lastName: "Quốc H" },
                    avgReviewCount: 4.7,
                    ratingAndReviews: [
                        { review: "Backend đầy đủ kiến thức cơ bản.", rating: 5 },
                        { review: "RESTful API rất dễ hiểu.", rating: 4 }
                    ]
                }
                // thêm các course khác nếu có
            ]
        },
    mostSellingCourses: [
        {
            _id: 1,
            courseName: "Kiến Thức Nhập Môn IT",
            description: "Cung cấp cái nhìn tổng quan về ngành IT - Lập trình web",
            price: 499000,
            thumbnail: "../../../src/assets/Images/course img/Programming/NenTang.png",
            instructor: { firstName: "Nguyễn", lastName: "Văn A" },
            avgReviewCount: 4.8,
            ratingAndReviews: [
                { review: "Rất hữu ích!", rating: 5 },
                { review: "Nội dung cơ bản nhưng đủ chi tiết.", rating: 4 }
            ]
        },
        {
            _id: 2,
            courseName: "Lập trình C++ cơ bản, nâng cao",
            description: "Khóa học lập trình C++ từ cơ bản tới nâng cao dành cho người mới bắt đầu...",
            price: 499000,
            thumbnail: "../../../src/assets/Images/course img/Programming/C++.png",
            instructor: { firstName: "Trần", lastName: "Bảo B" },
            avgReviewCount: 4.7,
            ratingAndReviews: [
                { review: "Rất tuyệt!", rating: 5 },
                { review: "Rõ ràng và chi tiết.", rating: 4 }
            ]
        },
        {
            _id: 3,
            courseName: "HTML CSS từ Zero to Hero",
            description: "Trong khóa này chúng ta sẽ cùng nhau xây dựng giao diện 2 trang web là The Band & Shopee.",
            price: 450000,
            thumbnail: "../../../src/assets/Images/course img/Programming/HTMLCSS.png",
            instructor: { firstName: "Phạm", lastName: "Cẩm C" },
            avgReviewCount: 4.5,
            ratingAndReviews: [
                { review: "Thực hành rất tốt!", rating: 5 },
                { review: "Giảng viên dễ hiểu.", rating: 4 }
            ]
        },
        {
            _id: 4,
            courseName: "Responsive Với Grid System",
            description: "Trong khóa này chúng ta sẽ học về cách xây dựng giao diện web responsive với Grid System...",
            price: 299000,
            thumbnail: "../../../src/assets/Images/course img/Programming/Responsive.png",
            instructor: { firstName: "Lê", lastName: "Duy D" },
            avgReviewCount: 4.2,
            ratingAndReviews: [
                { review: "Khá bổ ích.", rating: 4 },
                { review: "Học xong làm được ngay!", rating: 5 }
            ]
        },
        {
            _id: 5,
            courseName: "Lập Trình JavaScript Cơ Bản",
            description: "Học Javascript cơ bản phù hợp cho người chưa từng học lập trình...",
            price: 299000,
            thumbnail: "../../../src/assets/Images/course img/Programming/JSCoBan.png",
            instructor: { firstName: "Nguyễn", lastName: "Thị E" },
            avgReviewCount: 4.6,
            ratingAndReviews: [
                { review: "Nội dung dễ hiểu.", rating: 5 },
                { review: "Học rất thực tế.", rating: 4 }
            ]
        },
        {
            _id: 6,
            courseName: "Lập Trình JavaScript Nâng Cao",
            description: "Hiểu sâu hơn về cách Javascript hoạt động, tìm hiểu về IIFE, closure...",
            price: 299000,
            thumbnail: "../../../src/assets/Images/course img/Programming/JSNangCao.png",
            instructor: { firstName: "Ngô", lastName: "Thanh F" },
            avgReviewCount: 4.8,
            ratingAndReviews: [
                { review: "Nâng cao rất cần thiết.", rating: 5 },
                { review: "Thực sự đáng học.", rating: 5 }
            ]
        },
        {
            _id: 7,
            courseName: "Xây Dựng Website với ReactJS",
            description: "Khóa học ReactJS từ cơ bản tới nâng cao, kết quả của khóa học này là bạn có thể làm hầu hết...",
            price: 299000,
            thumbnail: "../../../src/assets/Images/course img/Programming/ReactJS.png",
            instructor: { firstName: "Hoàng", lastName: "Văn G" },
            avgReviewCount: 4.9,
            ratingAndReviews: [
                { review: "Ứng dụng thực tế cao.", rating: 5 },
                { review: "Dự án cuối khóa rất hay.", rating: 5 }
            ]
        },
        {
            _id: 8,
            courseName: "Node & ExpressJS",
            description: "Học Back-end với Node & ExpressJS framework, hiểu các khái niệm khi làm Back-end...",
            price: 299000,
            thumbnail: "../../../src/assets/Images/course img/Programming/NodeExpressJS.png",
            instructor: { firstName: "Vũ", lastName: "Quốc H" },
            avgReviewCount: 4.7,
            ratingAndReviews: [
                { review: "Backend đầy đủ kiến thức cơ bản.", rating: 5 },
                { review: "RESTful API rất dễ hiểu.", rating: 4 }
            ]
        }
        // thêm các khóa học khác nếu có
    ]
};
