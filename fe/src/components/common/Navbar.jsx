import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { NavbarLinks } from '../../../data/navbar-links';

const Navbar = () => {
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
                        <Link to={link.path} className="hover:text-gray-400">
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Cart Icon
            <div>
                <AiOutlineShoppingCart size={24} />
            </div> */}
            {/* Login/SignUp/Dashboard */}
            <div className='flex gap-x-4 items-center'>
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