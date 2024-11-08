import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

export default function InstructorChart() {
  // Dữ liệu mẫu 
  const mockCourses = [
    {
      courseName: "React Basics",
      totalStudentsEnrolled: 50,
      totalAmountGenerated: 1000,
    },
    {
      courseName: "Advanced JavaScript",
      totalStudentsEnrolled: 100,
      totalAmountGenerated: 1500,
    },
    {
      courseName: "Web Development",
      totalStudentsEnrolled: 75,
      totalAmountGenerated: 1200,
    },
  ];

  const [currChart, setCurrChart] = useState("students");

  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  // Biểu đồ học viên
  const chartDataStudents = {
    labels: mockCourses.map((course) => course.courseName),
    datasets: [
      {
        data: mockCourses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(mockCourses.length),
      },
    ],
  };

  // Biểu đồ học phí
  const chartIncomeData = {
    labels: mockCourses.map((course) => course.courseName),
    datasets: [
      {
        data: mockCourses.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(mockCourses.length),
      },
    ],
  };

  // Chọn biểu đồ
  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Biểu đồ</p>

      <div className="space-x-4 font-semibold">
   
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Học viên
        </button>

        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Học phí
        </button>
      </div>

      <div className="relative mx-auto aspect-square h-full w-full">
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  );
}
