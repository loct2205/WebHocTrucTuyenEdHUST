import { ACCOUNT_TYPE } from './../src/utils/constants';

export const sidebarLinks = [
  {
    id: 1,
    name: "Hồ sơ của tôi",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Bảng điều khiển",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "Khóa học của tôi",
    path: "/dashboard/my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Thêm khóa học",
    path: "/dashboard/add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Khóa học đã ghi danh",
    path: "/dashboard/enrolled-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscMortarBoard",
  },
  {
    id: 6,
    name: "Lịch sử mua hàng",
    path: "/dashboard/purchase-history",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscHistory",
  },
  {
    id: 7,
    name: "Tạo danh mục",
    path: "/dashboard/create-category",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscNewFolder",
  },
  {
    id: 8,
    name: "Tất cả sinh viên",
    path: "/dashboard/all-students",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscBook",
  },
  {
    id: 9,
    name: "Tất cả giảng viên",
    path: "/dashboard/all-instructors",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscNotebook",
  },
];
