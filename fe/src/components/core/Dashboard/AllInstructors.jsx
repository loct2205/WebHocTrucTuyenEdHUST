import { useEffect, useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { getAllInstructorDetails } from "../../../services/operations/adminAPI";
import { useSelector } from "react-redux";

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
  const [allInstructorDetails, setAllInstructorDetails] = useState([]);
  const [instructorsCount, setInstructorsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInstructorsData = async () => {
      setLoading(true);
      const { instructors, count } = await getAllInstructorDetails(token);
      if (instructors) {
        setAllInstructorDetails(instructors);
        setInstructorsCount(count);
      }
      setLoading(false);
    };

    fetchInstructorsData();
  }, [token]);

  return (
    <div>
      <div className="mb-14 text-white">
        <h1 className="text-4xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left">
          Thông Tin Tất Cả Giảng Viên
        </h1>
      </div>

      <Table className="rounded-xl border-2 border-richblack-500">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-500 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Danh sách giảng viên
            </Th>
            <Th className="w-[150px] text-center text-sm font-medium uppercase text-richblack-100">
              Trạng thái
            </Th>
            <Th className="w-[150px] text-center text-sm font-medium uppercase text-richblack-100">
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
          ) : !allInstructorDetails.length ? (
            <div className="text-5xl py-5 bg-yellow-800 text-white text-center">
              Không có dữ liệu
            </div>
          ) : (
            allInstructorDetails.map((instructor) => (
              <div
                key={instructor.id}
                className="border-x border-2 border-richblack-500"
              >
                <Tr className="flex gap-x-10 px-6 py-8 items-center">
                  <Td className="flex flex-col items-center gap-y-4">
                    <img
                      src={instructor.imageUrl}
                      alt="giảng viên"
                      className="h-[150px] w-[150px] rounded-full"
                    />
                  </Td>
                  <Td className="flex-1">
                    <div className="flex flex-col gap-y-2 text-white">
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
                  </Td>
                  <Td className="w-[150px] text-center text-sm font-medium text-yellow-50">
                    {instructor.active ? "Hoạt động" : "Hoạt động"}
                  </Td>
                  <Td className="w-[150px] text-center text-sm font-medium text-yellow-50">
                    {instructor.approved ? "Đã duyệt" : "Đã duyệt"}
                  </Td>
                </Tr>

                {instructor.managedCourses.length ? (
                  <Tr className="flex flex-col px-6 pb-5">
                    <p className="text-yellow-50 text-lg font-medium mb-4">
                      Khóa học đã tạo
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {instructor.managedCourses.map((course) => (
                        <div
                          className="text-white text-sm bg-richblack-700 p-4 rounded-lg shadow-md border border-richblack-500"
                          key={course.id}
                        >
                          <p className="text-lg font-semibold">
                            {course.courseName}
                          </p>
                          <p className="text-sm font-normal">
                            Giá:{" "}
                            {course.price.toLocaleString("vi-VN")} VND
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
