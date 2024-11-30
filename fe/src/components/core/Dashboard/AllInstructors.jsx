import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { getAllInstructorDetails } from "../../../services/operations/adminAPI";
import { useSelector } from "react-redux";

import IconBtn from "../../common/IconBtn";

// loading skeleton
const LoadingSkeleton = () => {
  return (
    <div className="flex p-5 flex-col gap-6 border-b border-2 border-b-richblack-500">
      <div className="flex flex-col sm:flex-row gap-5 items-center mt-7">
        <p className="h-[150px] w-[150px] rounded-full skeleton"></p>
        <div className="flex flex-col gap-2 ">
          <p className="h-4 w-[160px] rounded-xl skeleton"></p>
          <p className="h-4 w-[270px] rounded-xl skeleton"></p>
          <p className="h-4 w-[100px] rounded-xl skeleton"></p>
        </div>
      </div>
      <div className="flex gap-5">
        <p className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></p>
        <p className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></p>
        <p className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></p>
      </div>
    </div>
  );
};

function AllInstructors() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [allInstructorDetails, setAllInstructorDetails] = useState([]);
  const [instructorsCount, setInstructorsCount] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInstructorsData = async () => {
      setLoading(true)
      const { instructors, count } = await getAllInstructorDetails(token);
      if (instructors) {
        setAllInstructorDetails(instructors);
        setInstructorsCount(count)
      }
      setLoading(false)
    };

    fetchInstructorsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="mb-14 flex items-center justify-between text-white">
        <h1 className="text-4xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left">
          Thông Tin Tất Cả Giảng Viên
        </h1>

        <IconBtn text="Thêm Giảng Viên" onclick={() => navigate("")}>
          <VscAdd />
        </IconBtn>
      </div>

      <Table className="rounded-xl border-2 border-richblack-500 ">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-500 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Số lượng giảng viên: {instructorsCount}
            </Th>

            <Th className="ml-4 text-sm font-medium uppercase text-richblack-100">
              Trạng thái
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
          ) : !allInstructorDetails.length ? (
            <div className="text-5xl py-5 bg-yellow-800 text-white text-center">
              Không có dữ liệu
            </div>
          ) : (
            allInstructorDetails.map((instructor) => (
              <div
                key={instructor.id}
                className="border-x border-2 border-richblack-500 "
              >
                <Tr className="flex gap-x-10 px-6 py-8">
                  <Td className="flex flex-1 gap-x-2">
                    <img
                      src={instructor.imageUrl}
                      alt="giảng viên"
                      className="h-[150px] w-[150px] rounded-full "
                    />
                    <div className="flex flex-col justify-between">
                      <p className="text-lg font-semibold text-richblack-5">
                        <div className="text-sm font-normal">
                          <p className="text-base font-bold capitalize">
                            {instructor.firstName + " " + instructor.lastName}
                          </p>
                          <p>{instructor.email}</p>

                          <p>
                            Giới tính:{" "}
                            {instructor.profile?.gender
                              ? instructor.profile?.gender
                              : "Không xác định"}
                          </p>
                          <p>
                            Số điện thoại:{" "}
                            {instructor.profile?.contactNumber
                              ? instructor.profile?.contactNumber
                              : "Không có dữ liệu"}
                          </p>
                          <p>
                            Ngày sinh:{" "}
                            {instructor.profile?.dob
                              ? instructor.profile?.dob
                              : "Không có dữ liệu"}
                          </p>
                        </div>
                      </p>
                    </div>
                  </Td>
                  <Td className="mr-[11.5%] text-sm font-medium text-richblack-100">
                    {instructor.active ? "Hoạt động" : "Không hoạt động"}
                  </Td>
                  <Td className="mr-[8%] text-sm font-medium text-richblack-100">
                    {instructor.approved ? "Đã duyệt" : "Chưa duyệt"}
                  </Td>
                </Tr>

                {instructor.managedCourses.length ? (
                  <Tr className="flex gap-x-10 px-6 pb-5">
                    <p className="text-yellow-50 ">Khóa học đã tạo</p>
                    <div className="grid grid-cols-5 gap-y-5">
                      {instructor.managedCourses.map((course) => (
                        <div
                          className="text-white text-sm"
                          key={course.id}
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
}

export default AllInstructors;
