import toast from "react-hot-toast";
import SummaryApi from "../common";

const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  try {
    
    const fetchResponse = await fetch(SummaryApi.addToCartProduct.url, {
      method: SummaryApi.addToCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: id,
      }),
    });

    const dataResponse = await fetchResponse.json();
    if (dataResponse.success) {
      toast.success(dataResponse.message);
    } else {
      throw new Error(dataResponse.message);
    }
    return dataResponse;
  } catch (err) {
    toast.error(err.message);
  }
};
export default addToCart;
