import { useEffect, useState } from "react";
import { VscSignOut, VscSettingsGear } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";
import SidebarLink from "./SidebarLink";

import { HiMenuAlt1 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

import { sidebarLinks } from "./../../../../data/dashboard-links";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [profileLoading, setProfileLoading] = useState(false);
  const navigate = useNavigate();

  const user = {
    accountType: "STUDENT",
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setOpenSideMenu(screenSize > 640);
  }, [screenSize]);

  if (profileLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div
        className="sm:hidden text-white absolute left-7 top-3 cursor-pointer"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? <IoMdClose size={33} /> : <HiMenuAlt1 size={33} />}
      </div>

      {openSideMenu && (
        <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
          <div className="flex flex-col mt-6">
            {sidebarLinks.map((link) => (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            ))}
          </div>

          <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />

          <div className="flex flex-col">
            <SidebarLink
              link={{ name: "Cài đặt", path: "/dashboard/settings" }}
              iconName={"VscSettingsGear"}
            />

            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Bạn có chắc chắn không?",
                  text2: "Bạn sẽ bị đăng xuất khỏi tài khoản.",
                  btn1Text: "Đăng xuất",
                  btn2Text: "Hủy",
                  btn1Handler: () => {
                    console.log("Đã đăng xuất");
                    navigate("/login");
                  },
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className=" "
            >
              <div className="flex items-center gap-x-2 px-8 py-2 text-sm font-medium text-richblack-300 hover:bg-richblack-700 relative">
                <VscSignOut className="text-lg" />
                <span>Đăng xuất</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
