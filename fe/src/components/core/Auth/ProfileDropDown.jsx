import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../../hooks/useOnClickOutside"
import Img from './../../common/Img';

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  // Dữ liệu mẫu
  const user = {
    firstName: "Nguyễn",
    lastName: "Văn A",
    image: "https://via.placeholder.com/150", 
  }

  return (
    // Chỉ hiển thị trên các thiết bị lớn
    <button className="relative hidden sm:flex" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <Img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className={'aspect-square w-[30px] rounded-full object-cover'}
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Trang cá nhân
            </div>
          </Link>

          <div
            onClick={() => {
              alert("Đăng xuất thành công!") 
              setOpen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Đăng xuất
          </div>
        </div>
      )}
    </button>
  )
}
