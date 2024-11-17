import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

import IconBtn from "../../common/IconBtn";
import CoursesTable from "./InstructorCourses/CoursesTable.jsx";

export default function MyCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dữ liệu mẫu
  const mockCourses = [
    {
      id: 1,
      courseName: "React Basics",
      studentsEnrolled: 50,
      price: 1000,
    },
    {
      id: 2,
      courseName: "Advanced JavaScript",
      studentsEnrolled: 30,
      price: 1500,
    },
    {
      id: 3,
      courseName: "Web Development",
      studentsEnrolled: 40,
      price: 2000,
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 500); //5s
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="mb-14 flex justify-between">
        <h1 className="text-4xl font-medium text-richblack-5 font-boogaloo text-center lg:text-left">
          My Courses
        </h1>
        <IconBtn
          text="Thêm Khóa học"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>

      {courses && (
        <CoursesTable
          courses={courses}
          setCourses={setCourses}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </div>
  );
}
