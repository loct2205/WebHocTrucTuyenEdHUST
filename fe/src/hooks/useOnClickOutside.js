import { useEffect } from "react";

// Hook này phát hiện các click ngoài một thành phần được chỉ định và gọi hàm xử lý (handler) được cung cấp.
export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    // Định nghĩa hàm listener sẽ được gọi khi có sự kiện click hoặc chạm (touch).
    const listener = (event) => {
      // Nếu sự kiện click/chạm xảy ra bên trong phần tử được tham chiếu (ref), thì không làm gì cả.
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // Ngược lại, gọi hàm xử lý (handler) được cung cấp.
      handler(event);
    };

    // Thêm các listener để lắng nghe sự kiện "mousedown" và "touchstart" trên tài liệu (document).
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // Hàm dọn dẹp sẽ được gọi khi thành phần bị unmount hoặc khi ref/handler thay đổi.
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Chỉ chạy useEffect này khi ref hoặc handler thay đổi.
}
