import { toast } from "react-hot-toast"
import { apiConnector } from '../apiConnector';
import { catalogData } from '../apis';


// ================ get Catalog Page Data  ================
export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("GET", catalogData.CATALOGPAGEDATA_API, null, null, {
      categoryId: Number(categoryId)
    });

    if (!response?.data)
      throw new Error("Could not Fetch Category page data");
    toast.success('Fetch catalog success');
    console.log("CATALOG PAGE DATA API RESPONSE............", response)
    result = response?.data;

  }
  catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    toast.error('Fetch catalog failed');
  }
  toast.dismiss(toastId);
  return result;
}

