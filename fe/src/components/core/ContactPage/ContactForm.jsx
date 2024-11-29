import React from "react";
import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
      <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
        Cùng với chúng tôi. Hãy cùng nhau tạo nên điều khác biệt!
      </h1>
      <p className="">
        Cho chúng tôi biết thêm về bạn và ý tưởng mà bạn đang ấp ủ.
      </p>

      <div className="mt-7">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;