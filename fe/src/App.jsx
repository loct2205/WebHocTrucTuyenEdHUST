import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Import các trang
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import Catalog from './pages/Catalog';
import CourseDetails from './pages/CourseDetails';
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";

// Import các thành phần chung
import Navbar from "./components/common/Navbar";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings/Settings";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import Instructor from "./components/core/Dashboard/Instructor";
import Cart from "./components/core/Dashboard/Cart/Cart";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse";
import CreateCategory from "./components/core/Dashboard/CreateCategory";
import AllStudents from "./components/core/Dashboard/AllStudents";
import AllInstructors from "./components/core/Dashboard/AllInstructors";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import { HiArrowNarrowUp } from "react-icons/hi";

function App() {
  const { user } = useSelector((state) => state.profile);

  // Tự động cuộn lên đầu trang khi chuyển route
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Hiển thị nút "Lên đầu trang" khi người dùng cuộn xuống
  const [showArrow, setShowArrow] = useState(false);

  const handleArrow = () => {
    if (window.scrollY > 500) {
      setShowArrow(true);
    } else {
      setShowArrow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleArrow);
    return () => {
      window.removeEventListener("scroll", handleArrow);
    };
  }, [showArrow]);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      {/* Thanh điều hướng */}
      <Navbar />

      {/* Nút "Lên đầu trang" */}
      <button
        onClick={() => window.scrollTo(0, 0)}
        className={`bg-yellow-25 hover:bg-yellow-50 hover:scale-110 p-3 text-lg text-black rounded-2xl fixed right-3 z-10 duration-500 ease-in-out ${
          showArrow ? "bottom-6" : "-bottom-24"
        }`}
      >
        <HiArrowNarrowUp />
      </button>

      {/* Định nghĩa các route */}
      <Routes>
        {/* Các route công khai */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />

        {/* Các route trong Dashboard */}
        <Route
          path="/dashboard/*"
          element={<Dashboard />} // Dashboard sẽ làm layout chính
        >
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="all-students" element={<AllStudents />} />
          <Route path="all-instructors" element={<AllInstructors />} />
          <Route path="cart" element={<Cart />} />
          <Route path="enrolled-courses" element={<EnrolledCourses />} />
          <Route path="instructor" element={<Instructor />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="edit-course/:courseId" element={<EditCourse />} />
          <Route
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails />}
          />
        </Route>

        {/* Route 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
