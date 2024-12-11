import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import Img from "./../../common/Img";

import { logout } from "../../../services/operations/authAPI";

import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { AiOutlineCaretDown, AiOutlineHome } from "react-icons/ai";
import { MdOutlineContactPhone } from "react-icons/md";
import { TbMessage2Plus } from "react-icons/tb";
import { PiNotebook } from "react-icons/pi";
import { fetchCourseCategories } from "./../../../services/operations/courseDetailsAPI";

export default function MobileProfileDropDown() {
  const { user } = useSelector((state) => state.profile);
  if (!user) return null;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);

  // Đóng dropdown khi nhấp ra ngoài
  useOnClickOutside(ref, () => setOpen(false));

  const [open, setOpen] = useState(false);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lấy danh mục khóa học
  const fetchSublinks = async () => {
    try {
      setLoading(true);
      const res = await fetchCourseCategories();
      setSubLinks(res);
    } catch (error) {
      console.log("Không thể lấy danh sách danh mục = ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  return (
    // Hiển thị chỉ trên thiết bị nhỏ
    <button className="relative sm:hidden" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <Img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className={"aspect-square w-[30px] rounded-full object-cover"}
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute min-w-[120px] top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-lg border-[1px] border-richblack-700 bg-richblack-800"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100">
              <VscDashboard className="text-lg" />
              Bảng điều khiển
            </div>
          </Link>

          <Link to="/" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 border-y border-richblack-700">
              <AiOutlineHome className="text-lg" />
              Trang chủ
            </div>
          </Link>

          <Link to="/" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100">
              <PiNotebook className="text-lg" />
              Danh mục khóa học
            </div>
          </Link>

          <Link to="/about" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 border-y border-richblack-700">
              <TbMessage2Plus className="text-lg" />
              Về chúng tôi
            </div>
          </Link>

          <Link to="/contact" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100">
              <MdOutlineContactPhone className="text-lg" />
              Liên hệ
            </div>
          </Link>

          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100"
          >
            <VscSignOut className="text-lg" />
            Đăng xuất
          </div>
        </div>
      )}
    </button>
  );
}
