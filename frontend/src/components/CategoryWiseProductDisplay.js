import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import toast from "react-hot-toast";
import diaplyINRCurrency from "../helpers/displayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import scrollToTop from "../helpers/scrollToTop";
import playSound from "../common/playSound";

const CategoryWiseProductDisplay = (props) => {
  const { category, heading } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const { fetchUserAddToCart, theme } = useContext(Context);

  const [handleLoading,setHandleLoading] = useState(false);
  const handleAddToCart = async (e, id) => {
    setHandleLoading(true);
    await addToCart(e, id);
    await fetchUserAddToCart();
    setHandleLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);

    if (categoryProduct.success) {
      setData(categoryProduct.data);
      setLoading(false);
    } else {
      toast.error(categoryProduct.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto px-4 my-6 relative w-[100%]">
      <h2 className="text-2xl font-semibold py-4 capitalize">{heading}</h2>
      <div className="flex items-center flex-wrap justify-evenly md:gap-6 overflow-scroll scrollbar-none transition-all">
        {loading
          ? loadingList.map((product, idx) => {
              return (
                <div
                  className={`w-full  min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[300px]  bg-white rounded-sm shadow overflow-hidden hover:scale-110`}
                  key={idx}
                >
                  <div className="bg-slate-200 h-48  p-4 min-w-[280px]  md:min-w-[145px]  flex justify-center items-center animate-pulse"></div>
                  <div className="p-4 grid gap-3 ">
                    <h2 className="font-medium md:text-lg text-base text-ellipsis line-clamp-1 p-1 py-3 animate-pulse rounded-full bg-slate-200 "></h2>
                    <p className="capitalize text-slate-500  p-1 animate-pulse rounded-full py-2 bg-slate-200  "></p>
                    <div className="flex gap-1 w-full ">
                      <p className="text-red-600 font-medium  p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                      <p className="text-slate-500 line-through  p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                    </div>
                    <button className=" text-sm  text-white px-2  p-1 animate-pulse rounded-full bg-slate-200 py-3"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, idx) => {
              return (
                <Link
                  to={`/product/${product?._id}`}
                  className={`w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] ${
                    theme == "dark" ? " bg-black" : "bg-white "
                  } rounded-md shadow-md  hover:scale-110 transition-all hover:shadow-2xl`}
                  key={idx}
                  onClick={() => {
                    scrollToTop();
                  }}
                >
                  <div
                    className={`${
                      theme == "dark"
                        ? " bg-slate-400 border-slate-700"
                        : "bg-slate-200 "
                    }  h-48  p-4 min-w-[280px]  md:min-w-[145px]  flex justify-center items-center`}
                  >
                    <img
                      src={product.productImage[0]}
                      className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply rounded-md"
                    />
                  </div>
                  <div className="p-4 grid gap-3 ">
                    <h2 className="font-medium md:text-lg text-base text-ellipsis line-clamp-1 ">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-slate-500 ">
                      {product?.category}
                    </p>
                    <div className="flex gap-1 ">
                      <p className="text-red-600 font-medium">
                        {diaplyINRCurrency(product?.sellingPrice)}
                      </p>
                      <p className="text-slate-500 line-through">
                        {diaplyINRCurrency(product?.price)}
                      </p>
                    </div>
                    <button
                      className=" text-sm bg-red-600 hover:bg-red-600 text-white px-2 py-0.5 rounded-full disabled:opacity-60 disabled:cursor-not-allowed "
                      
                      disabled = {handleLoading}

                      onClick={(e) => {
                        playSound();
                        handleAddToCart(e, product?._id);
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
