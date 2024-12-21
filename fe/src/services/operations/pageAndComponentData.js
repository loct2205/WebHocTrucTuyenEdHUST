import { toast } from "react-hot-toast";
import { apiConnector } from '../apiConnector';
import { catalogData } from '../apis';

// ================ get Catalog Page Data  ================
export const getCatalogPageData = async (categoryId) => {
  // const toastId = toast.loading("Đang tải...");
  let result = null;
  try {
    const response = await apiConnector("GET", catalogData.CATALOGPAGEDATA_API, null, null, {
      categoryId: Number(categoryId)
    });

    if (!response?.data)
      throw new Error("Không thể lấy dữ liệu trang danh mục");

    // toast.success('Lấy dữ liệu danh mục thành công');
    console.log("CATALOG PAGE DATA API RESPONSE............", response);
    result = response?.data;

  } catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    // toast.error('Lấy dữ liệu danh mục thất bại');
  }
  // toast.dismiss(toastId);
  return result;
}
