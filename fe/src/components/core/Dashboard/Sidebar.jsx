import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  
  const [user, setUser] = useState({ firstName: "User", accountType: "basic" });
  const [openSideMenu, setOpenSideMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const navigate = useNavigate();

//   Điều chỉnh sidebar
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

//   Ẩn sidebar
  useEffect(() => {
    if (screenSize <= 640) {
      setOpenSideMenu(false);
    } else {
      setOpenSideMenu(true);
    }
  }, [screenSize]);

  return (
    <>
      <div 
        className="sm:hidden text-white absolute left-7 top-3 cursor-pointer" 
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? "Đóng Danh sách" : "Mở Danh sách"}
      </div>

      {openSideMenu && (
        <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
            <div className="flex flex-col mt-6">
            <Link to="/dashboard/home" className="block py-2 px-4 text-richblack-100 hover:bg-richblack-700">
              Trang chủ
            </Link>
            <Link to="/dashboard/settings" className="block py-2 px-4 text-richblack-100 hover:bg-richblack-700">
              Cài đặt
            </Link>
            <Link to="/dashboard/profile" className="block py-2 px-4 text-richblack-100 hover:bg-richblack-700">
              Hồ sơ
            </Link>
          </div>

          <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />

          <div className="flex flex-col">
            <button onClick={() => {setUser(null); navigate("/login");}} className="w-full text-left py-2 px-4 text-richblack-100 hover:bg-richblack-700">
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </>
  );
}