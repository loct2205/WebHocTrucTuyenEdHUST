import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import IconBtn from "../../common/IconBtn";
import CoursesTable from "./InstructorCourses/CoursesTable";

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dữ liệu mẫu cho các khóa học
  useEffect(() => {
    setLoading(true);
    const sampleCourses = [
      {
        id: 1,
        title: "Khóa học ReactJS cơ bản",
        instructor: "Nguyễn Văn A",
        status: "Đã xuất bản",
      },
      {
        id: 2,
        title: "Khóa học NodeJS nâng cao",
        instructor: "Trần Văn B",
        status: "Bản nháp",
      },
      {
        id: 3,
        title: "Khóa học Python cho người mới bắt đầu",
        instructor: "Lê Thị C",
        status: "Đã xuất bản",
      },
    ];
    setCourses(sampleCourses);
    setLoading(false);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="mb-14 flex justify-between">
        <h1 className="text-4xl font-medium text-richblack-5 font-boogaloo text-center lg:text-left">
          Khóa Học Của Tôi
        </h1>
        <IconBtn
          text="Thêm Khóa Học"
          onClick={() => {
            navigate("/dashboard/add-course");
          }}
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
