import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import useOnClickOutside from "../../../hooks/useOnClickOutside"
import Img from './../../common/Img';
import { logout } from "../../../services/operations/authAPI"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  return (
    // Chỉ hiển thị trên các thiết bị lớn
    <button className="relative hidden sm:flex" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <Img
          src={user?.imageUrl}
          alt={`profile-${user?.firstName}`}
          className={'aspect-square w-[30px] rounded-full object-cover'}
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>

      {open && (
  <div
    onClick={(e) => e.stopPropagation()}
    className="absolute top-[118%] right-0 z-[1000] flex flex-col divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
    ref={ref}
  >
    {/* Trang cá nhân */}
    <Link
      to="/dashboard/my-profile"
      onClick={() => setOpen(false)}
      className="flex w-full items-center gap-x-2 py-[8px] px-[16px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 whitespace-nowrap"
    >
      <VscDashboard className="text-lg" />
      Trang cá nhân
    </Link>

    {/* Đăng xuất */}
    <div
      onClick={() => {
        dispatch(logout(navigate))
        setOpen(false)
      }}
      className="flex w-full items-center gap-x-2 py-[8px] px-[16px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 whitespace-nowrap"
    >
      <VscSignOut className="text-lg" />
      Đăng xuất
    </div>
  </div>
)}



    </button>
  )
}
