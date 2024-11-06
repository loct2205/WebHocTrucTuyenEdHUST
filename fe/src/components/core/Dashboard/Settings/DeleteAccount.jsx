import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import ConfirmationModal from "./../../../common/ConfirmationModal";

export default function DeleteAccount() {
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [check, setCheck] = useState(false);

  const handleDeleteAccount = () => {
    console.log("Tài khoản đã bị xóa.");
    setConfirmationModal(null);
    setCheck(false);
  };

  return (
    <>
      <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-6 sm:px-12">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>

        <div className="flex flex-col ">
          <h2 className="text-lg font-semibold text-richblack-5">
            Xóa tài khoản
          </h2>

          <div className="sm:w-3/5 text-pink-25 flex flex-col gap-3 mt-1">
            <p>Bạn có muốn xóa tài khoản không?</p>
            <p>
              Tài khoản này có chứa tài khoản có trả phí. Việc xóa tài khoản là
              vĩnh viễn và mọi thứ liên quan cũng sẽ được loại bỏ
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-indigo-600 rounded-full form-style cursor-pointer"
              checked={check}
              onChange={() => setCheck((prev) => !prev)}
            />

            <button
              type="button"
              className="w-fit italic text-pink-300"
              onClick={() =>
                check &&
                setConfirmationModal({
                  text1: "Bạn chắc chắn chưa?",
                  text2: "Xóa tài khoản...!",
                  btn1Text: "Xóa",
                  btn2Text: "Hủy",
                  btn1Handler: handleDeleteAccount,
                  btn2Handler: () => {
                    setConfirmationModal(null);
                    setCheck(false);
                  },
                })
              }
            >
              Tôi muốn xóa tài khoản.
            </button>
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
