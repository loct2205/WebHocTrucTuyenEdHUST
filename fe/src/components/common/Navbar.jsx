import React, { useState } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { NavbarLinks } from '../../../data/navbar-links';
import subLinksData from '../../../data/subLinksData';
import { MdKeyboardArrowDown } from "react-icons/md"
// // when user click Navbar link then it will hold yellow color
const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
}

const Navbar = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

  // Function to handle menu click
  const handleMenuClick = (index) => {
    setSelectedIndex(index);
    console.log("Selected Index:", index); // Log chỉ số được chọn
  };
    return (
        <nav className="z-[10] flex items-center justify-between p-4 bg-blue-500 border-b-richblack-700 text-white">
            {/* Logo */}
            <div className="text-2xl font-bold">
                <Link to="/">EdHUST</Link>
            </div>

            {/* Links */}
            <ul className="flex space-x-6">
                {NavbarLinks.map((link, index) => (
                    <li key={index}>
                        {
                            link.title === "Khóa học" ? (
                                <div
                                    className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName")
                                        ? "bg-yellow-25 text-black rounded-xl p-1 px-3"
                                        : "text-richblack-25 rounded-xl p-1 px-3"
                                        }`}
                                >
                                    <p>{link.title}</p>
                                    <MdKeyboardArrowDown />
                                    {/* drop down menu */}
                                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] 
                                                    flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible 
                                                    group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]"
                                    >
                                        <div className="absolute left-[50%] top-0 z-[100] h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                        {subLinksData.map((subLink, i) => ( //hard code
                                            <Link
                                                to={subLink.path}
                                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                key={i}
                                                onClick={() => handleMenuClick(i)} // Handle click
                                            >
                                                <p>{subLink.name}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <Link to={link?.path}>
                                    <p className={`${matchRoute(link?.path) ? "bg-yellow-25 text-black" : "text-richblack-25"} rounded-xl p-1 px-3 `}>
                                        {link.title}
                                    </p>
                                </Link>)
                        }
                    </li>
                ))}
            </ul>

            {/* Cart Icon
            <div>
                <AiOutlineShoppingCart size={24} />
            </div> */}
            {/* Login/SignUp/Dashboard */}
            <div className='flex gap-x-4 items-center'>
            {
    true && "Student" === "Student" && (
        <Link to="/dashboard/cart" className="relative">
            <AiOutlineShoppingCart className="text-[2.35rem] text-richblack-5 hover:bg-richblack-700 rounded-full p-2 duration-200" />
            {/* Sử dụng giá trị tĩnh thay cho totalItems */}
            {5 > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                    5
                </span>
            )}
        </Link>
    )
}

                <Link to="/login">
                    <button className="px-[12px] py-[8px] text-richblack-100 rounded-md border-[2.5px] border-yellow-50" >
                        Đăng nhập
                    </button>
                </Link>

                <Link to="/signup">
                    <button className=" px-[12px] py-[8px] text-richblack-100 rounded-md border-[2.5px] border-yellow-50">
                        Đăng ký
                    </button>
                </Link>

            </div>
        </nav>
        
    );
};

export default Navbar;