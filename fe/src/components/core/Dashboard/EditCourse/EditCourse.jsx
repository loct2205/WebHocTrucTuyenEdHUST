import { useEffect, useState } from "react";
import RenderSteps from "../AddCourse/RenderSteps";
import Loading from "./../../../common/Loading";

export default function EditCourse() {
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);

  // Dữ liệu mẫu
  const mockCourseDetails = {
    id: 1,
    title: "React Basics",
    description: "Learn the basics of React.js",
    price: 1000,
    studentsEnrolled: 50,
    lessons: [
      { id: 1, title: "Introduction to React", duration: "15 min" },
      { id: 2, title: "JSX and Components", duration: "20 min" },
      { id: 3, title: "State and Props", duration: "25 min" },
    ],
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCourse(mockCourseDetails);
      setLoading(false);
    }, 500); // 0.5 s
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex w-full items-start gap-x-6">
      <div className="flex flex-1 flex-col">
        <h1 className="mb-14 text-3xl font-medium text-richblack-5 text-center sm:text-left">
          Chỉnh sửa Khóa học
        </h1>

        {loading ? (
          <Loading />
        ) : (
          <div className="flex-1">
            {course ? (
              <RenderSteps />
            ) : (
              <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
                Không tìm thấy khóa học
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
