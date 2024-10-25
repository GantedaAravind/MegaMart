import React, { useContext, useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import toast from "react-hot-toast";
import AdminProductCart from "../components/AdminProductCart";
import Context from "../context";
import playSound from "../common/playSound";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    const fetchResponse = await fetch(SummaryApi.allProduts.url, {
      method: SummaryApi.allProduts.method,
      // credentials : "include",
    });
    const resData = await fetchResponse.json();
    if (resData.success) {
      setAllProducts(resData.data);
    } else {
      toast.error(resData.message);
    }
  };

  const context = useContext(Context);

  useEffect(()=>{
    fetchAllProducts();
  },[]);

  return (
    <div>
      <div className={`${
          context.theme == "dark"
            ? " bg-black"
            : " bg-white "
        } py-2 px-4 flex justify-between items-center rounded`}>
        <h2 className="font-bold text-lg">All Prdoucts</h2>
        <button
          className={`border-2 py-1 px-4 border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition-all rounded-full`}
          onClick={() => {
            playSound();
            setOpenUploadProduct(true)}}
        >
          Upload Product
        </button>
      </div>
      {/** all products */}
      <div className="flex flex-wrap item-center gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {
          allProducts.map((product,idx)=>{
            return (
                <AdminProductCart  fetchdata = {fetchAllProducts} data = {product} key = {idx + "all Product"}/>
            )
          })
        }
      </div>
      {/* upload product Componte*/}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchdata = {fetchAllProducts}/>
      )}
    </div>
  );
};

export default AllProducts;
