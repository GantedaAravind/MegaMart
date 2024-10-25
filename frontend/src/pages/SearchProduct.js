import React, { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import SummaryApi from "../common";
import { RxReload } from "react-icons/rx";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import VerticalCard from "../components/VerticalCard";

const SearchProduct = () => {
  const [searchParams] = useSearchParams(); // Destructure correctly to get searchParams
  const q = searchParams.get("q"); // Access query parameter "q"
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const fetchResponse = await fetch(
        SummaryApi.searchProduct.url + `?q=${searchParams.get("q")}`,
        {
          method: SummaryApi.searchProduct.method,
          credentials: "include",
        }
      );

      const dataResponse = await fetchResponse.json();
      setLoading(false);
      if (dataResponse.success) {
        setData(dataResponse.data);
        // console.log(dataResponse.data);
      } else {
        throw new Error(dataResponse.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    await fetchUserAddToCart();
  };

  useEffect(() => {
    fetchProduct();
  }, [q]);

  return (
    <div className="container mx-auto p-4">
      {/* <div>SearchProduct</div> */}
      {loading && (
        <p className="animate-spin w-fit mx-auto text-3xl">
          <RxReload />
        </p>
      )}
      <p className="font-semibold text-xl mb-3">Search Results : {data?.length}</p>
      {data.length === 0 && !loading && (
        <div>
          <img
            src={
              "https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-illustration-download-in-svg-png-gif-file-formats--available-product-tokostore-pack-e-commerce-shopping-illustrations-2809510.png"
            }
            className="mix-blend-multiply mx-auto w-[50%] my-auto"
          />
          <p className="font-bold mt-[-20px] text-2xl mx-auto w-fit ">
            No Items Found
          </p>
        </div>
      )}

      <VerticalCard loading={loading} data = {data} />
    </div>
  );
};

export default SearchProduct;
