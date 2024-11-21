import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Th, Thead, Tr, Td, Tbody } from 'react-super-responsive-table';
import IconBtn from '../../common/IconBtn';

import { VscAdd } from 'react-icons/vsc';
import user_logo from "../../../assets/Images/user.png";

// loading skeleton
const LoadingSkeleton = () => {
    return (
        <div className="flex p-5 flex-col gap-6 border-b border-2 border-b-richblack-500">
            <div className="flex flex-col sm:flex-row gap-5 items-center mt-7">
                <p className='h-[150px] w-[150px] rounded-full skeleton'></p>
                <div className="flex flex-col gap-2 ">
                    <p className='h-4 w-[160px] rounded-xl skeleton'></p>
                    <p className='h-4 w-[270px] rounded-xl skeleton'></p>
                    <p className='h-4 w-[100px] rounded-xl skeleton'></p>
                </div>
            </div>
            <div className='flex gap-5'>
                <p className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></p>
                <p className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></p>
                <p className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></p>
            </div>
        </div>
    );
};

const AllStudents = () => {
    const [allStudents, setAllStudents] = useState([]);
    const [studentsCount, setStudentsCount] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Sử dụng dữ liệu mẫu
    useEffect(() => {
        const fetchAllStudents = async () => {
            setLoading(true);
            const fakeData = [
                {
                    _id: "1",
                    firstName: "Nguyễn",
                    lastName: "Văn A",
                    email: "vana@example.com",
                    image: user_logo,
                    additionalDetails: {
                        gender: "Nam",
                        contactNumber: "0123456789",
                        dateOfBirth: "01/01/1990",
                    },
                    active: true,
                    approved: true,
                    courses: [
                        { _id: "101", courseName: "Lập trình Web", price: 500000 },
                        { _id: "102", courseName: "Cơ sở dữ liệu", price: 700000 },
                    ],
                },
                {
                    _id: "2",
                    firstName: "Trần",
                    lastName: "Thị B",
                    email: "thib@example.com",
                    image: user_logo,
                    additionalDetails: {
                        gender: "Nữ",
                        contactNumber: "",
                        dateOfBirth: "",
                    },
                    active: false,
                    approved: false,
                    courses: [],
                },
            ];
            setAllStudents(fakeData);
            setStudentsCount(fakeData.length);
            setLoading(false);
        };

        fetchAllStudents();
    }, []);

    return (
        <div className=''>
            <div className="mb-14 flex items-center justify-between">
                <h1 className="text-4xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left">
                    Thông Tin Tất Cả Sinh Viên
                </h1>

                <IconBtn text="Thêm Sinh Viên" onclick={() => navigate("")}>
                    <VscAdd />
                </IconBtn>
            </div>

            <Table className="rounded-xl border-2 border-richblack-500 ">
                <Thead>
                    <Tr className="flex gap-x-10 rounded-t-md border-b border-2 border-b-richblack-500 px-6 py-2">
                        <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                            Tổng Sinh Viên: {studentsCount}
                        </Th>

                        <Th className="mr-[10%]  text-center ml-4 text-sm font-medium uppercase text-richblack-100 ">
                            Trạng Thái
                        </Th>
                        <Th className="mr-[7%] text-sm font-medium uppercase text-richblack-100">
                            Duyệt
                        </Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {loading ? (
                        <>
                            <LoadingSkeleton />
                            <LoadingSkeleton />
                            <LoadingSkeleton />
                        </>
                    ) : allStudents.length === 0 ? (
                        <div className='text-5xl py-5 bg-yellow-800 text-white text-center'>
                            Không có dữ liệu
                        </div>
                    ) : (
                        allStudents.map((student) => (
                            <div
                                key={student._id}
                                className='border-x border-2 border-richblack-500 '
                            >
                                <Tr className="flex gap-x-10 px-6 py-8">
                                    <Td className="flex flex-1 gap-x-2">
                                        <img
                                            src={student.image}
                                            alt="student"
                                            className="h-[150px] w-[150px] rounded-full "
                                        />
                                        <div className="flex flex-col justify-between">
                                            <p className="text-lg font-semibold text-richblack-5">
                                                <div className='text-sm font-normal'>
                                                    <p className='text-base font-bold'>
                                                        {student.firstName + " " + student.lastName}
                                                    </p>
                                                    <p>{student.email}</p>

                                                    <p>
                                                        Giới tính:{" "}
                                                        {student.additionalDetails.gender
                                                            ? student.additionalDetails.gender
                                                            : "Không xác định"}
                                                    </p>
                                                    <p>
                                                        Số điện thoại:{" "}
                                                        {student.additionalDetails.contactNumber
                                                            ? student.additionalDetails.contactNumber
                                                            : "Không có dữ liệu"}
                                                    </p>
                                                    <p>
                                                        Ngày sinh:{" "}
                                                        {student.additionalDetails.dateOfBirth
                                                            ? student.additionalDetails.dateOfBirth
                                                            : "Không có dữ liệu"}
                                                    </p>
                                                </div>
                                            </p>
                                        </div>
                                    </Td>
                                    <Td className="mr-[11.5%] text-sm font-medium text-richblack-100">
                                        {student.active ? "Hoạt động" : "Không hoạt động"}
                                    </Td>
                                    <Td className="mr-[8%] text-sm font-medium text-richblack-100">
                                        {student.approved ? "Đã duyệt" : "Chưa duyệt"}
                                    </Td>
                                </Tr>

                                {student.courses.length > 0 ? (
                                    <Tr className="flex gap-x-10 px-6 pb-5">
                                        <p className="text-yellow-50 ">Khóa học đã đăng ký</p>
                                        <div className='grid grid-cols-5 gap-y-5'>
                                            {student.courses.map((course) => (
                                                <div
                                                    className="text-white text-sm"
                                                    key={course._id}
                                                >
                                                    <p>{course.courseName}</p>
                                                    <p className="text-sm font-normal">
                                                        Giá: {course.price.toLocaleString("vi-VN")} VND
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </Tr>
                                ) : (
                                    <div className="px-6 text-white mb-4">
                                        Không có khóa học nào
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </Tbody>
            </Table>
        </div>
    );
};

export default AllStudents;
