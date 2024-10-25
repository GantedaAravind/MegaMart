import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import toast from "react-hot-toast";
import diaplyINRCurrency from "../helpers/displayCurrency";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import playSound from "../common/playSound";

const VerticalCardProduct = (props) => {
  const { category, heading } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  // const [scroll, setScroll] = useState(0);
  const context = useContext(Context);
  const scrollElement = useRef();

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

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    await fetchUserAddToCart();
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const scrollRight = () => {
    // console.log("called");
    playSound()
    scrollElement.current.scrollLeft -= 300;
  };
  const scrollLeft = () => {
    // console.log("called");
    playSound();
    scrollElement.current.scrollLeft += 300;
  };
  return (
    <div className="container mx-auto px-4 my-6 relative  ">
      <h2 className="text-2xl font-semibold py-4 capitalize">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll overflow-y-hidden scrollbar-none transition-all "
        ref={scrollElement}
      >
        <button
          className={`${
            context.theme == "dark" ? "  bg-black" : " bg-white"
          } shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block `}
          onClick={scrollRight}
        >
          <FaAngleLeft />
        </button>
        <button
          className={`${
            context.theme == "dark" ? "  bg-black" : " bg-white"
          } shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block`}
          onClick={scrollLeft}
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadingList.map((product, idx) => {
              return (
                <div
                  className={`w-full  min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  ${
                    context.theme == "dark" ? "  bg-slate-400" : " bg-slate-200"
                  } rounded-sm shadow overflow-hidden`}
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
                onClick={()=>{playSound()}}
                  to={`/product/${product?._id}`}
                  className={`w-full  min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  ${
                    context.theme == "dark" ? "  bg-black" : " bg-white"
                  } rounded-sm shadow-lg overflow-hidden  transition-all  hover:scale-110 hover:shadow-2xl `}
                  key={idx}
                >
                  <div
                    className={`${
                      context.theme == "dark"
                        ? "  bg-slate-400"
                        : " bg-slate-200"
                    } h-48  p-4 min-w-[280px]  md:min-w-[145px]  flex justify-center items-center`}
                  >
                    <img
                      src={product.productImage[0]}
                      className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
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
                      className=" text-sm bg-red-600 hover:bg-red-600 text-white px-2 py-0.5 rounded-full"
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

export default VerticalCardProduct;
