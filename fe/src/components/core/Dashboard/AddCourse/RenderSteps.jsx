import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm.jsx";
import CourseInformationForm from "./CourseInformation/CourseInformationForm.jsx";
import PublishCourse from "./PublishCourse/index.jsx";

export default function RenderSteps({ editCourse }) {
  const [step, setStep] = useState(1);
  //const [editCourse] = useState(false); 

  const steps = [
    {
      id: 1,
      title: "Thông tin khóa học",
    },
    {
      id: 2,
      title: "Xây dựng khóa học",
    },
    {
      id: 3,
      title: "Công bố",
    },
  ];

  const handleNextStep = () => {
    setStep((prev) => (prev < steps.length ? prev + 1 : prev));
  };

  const handlePrevStep = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <>
      <div className="relative mb-2 flex w-full select-none justify-center">
        {steps.map((item) => (
          <React.Fragment key={item.id}>
            <div className="flex flex-col items-center">
              <div
                className={`grid aspect-square w-[34px] place-items-center rounded-full border-[1px]
                    ${
                      step === item.id
                        ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                        : "border-richblack-700 bg-richblack-800 text-richblack-300"
                    }
                    ${step > item.id && "bg-yellow-50 text-yellow-50"}`}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />
                ) : (
                  item.id
                )}
              </div>
            </div>

            {item.id !== steps.length && (
              <div
                className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2 ${
                  step > item.id ? "border-yellow-50" : "border-richblack-500"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <div
            className={`sm:min-w-[130px] flex flex-col items-center gap-y-2 ${
              editCourse && "sm:min-w-[270px]"
            }`}
            key={item.id}
          >
            <p
              className={`text-sm ${
                step >= item.id ? "text-richblack-5" : "text-richblack-500"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}

      <div className="flex justify-between mt-4">
        {step > 1 && (
          <button
            onClick={handlePrevStep}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Quay lại
          </button>
        )}
        {step < steps.length && (
          <button
            onClick={handleNextStep}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md"
          >
            Tiếp tục
          </button>
        )}
      </div>
    </>
  );
}
