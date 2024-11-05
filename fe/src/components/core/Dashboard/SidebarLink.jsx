import { NavLink, useLocation } from "react-router-dom";

export default function SidebarLink({ link }) {
  const location = useLocation();

  return (
    <NavLink
      to={link.path}
      className={({ isActive }) =>
        `relative px-8 py-2 text-sm font-medium transition-all ${
          isActive ? "bg-yellow-800 text-yellow-50" : "text-richblack-300 hover:bg-richblack-700"
        }`
      }
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
          location.pathname === link.path ? "opacity-100" : "opacity-0"
        }`}
      ></span>

      <div className="flex items-center gap-x-2">
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
}
