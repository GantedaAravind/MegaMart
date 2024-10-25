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


const HoriZontalCardProduct = (props) => {
  const { category, heading } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  const [scroll, setScroll] = useState(0);
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
  const context = useContext(Context);

  const { fetchUserAddToCart } = useContext(Context);

  const [cartLoading, setCartLoading] = useState(false);

  const handleAddToCart = async (e, id) => {
    setCartLoading(true);
    await addToCart(e, id);
    await fetchUserAddToCart();
    setCartLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    // console.log("called");
    // playSound();
    scrollElement.current.scrollLeft -= 300;
  };
  const scrollLeft = () => {
    // console.log("called");
    // playSound();
    scrollElement.current.scrollLeft += 300;
  };
  return (
    <div className="container mx-auto px-4 my-6 relative ">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll  scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className={`disabled:opacity-60 disabled:cursor-not-allowed  ${
            context.theme == "dark" ? "  bg-black" : " bg-white"
          } shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block`}
          onClick={scrollRight}
        >
          <FaAngleLeft />
        </button>
        <button
          className={`${
            context.theme == "dark" ? "  bg-black" : " bg-white"
          }  shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block`}
          onClick={scrollLeft}
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadingList.map((product, idx) => {
              return (
                <div
                  className={`w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 ${
                    context.theme == "dark" ? "  bg-slate-400" : " bg-slate-200"
                  }  rounded-sm  flex overflow-hidden  `}
                  key={idx}
                >
                  <div
                    className={`${
                      context.theme == "dark"
                        ? "  bg-slate-400"
                        : " bg-slate-200"
                    } h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse`}
                  ></div>
                  <div className="p-4  grid w-full gap-2">
                    <h2 className="font-medium md:text-lg text-base text-ellipsis line-clamp-1 bg-slate-200 animate-pulse rounded-md"></h2>
                    <p className="capitalize text-slate-500 p-1  bg-slate-200 rounded-md"></p>
                    <div className="flex gap-1  w-full animate-pulse">
                      <p className="text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded"></p>
                      <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded"></p>
                    </div>
                    <button className=" text-sm  text-white px-2 py-0.5 rounded-full w-ful bg-slate-200 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, idx) => {
              return (
                <Link
                  // onClick={()=>{playSound()}}
                  to={`/product/${product?._id}`}
                  className={`w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 ${
                    context.theme == "dark" ? "  bg-black" : " bg-white"
                  } rounded-sm shadow flex overflow-hidden hover:scale-110  transition-all hover:shadow-2xl`}
                  key={idx}
                >
                  <div
                    className={` ${
                      context.theme == "dark"
                        ? "  bg-slate-500"
                        : " bg-slate-200"
                    } h-full p-4 min-w-[120px] md:min-w-[145px]`}
                  >
                    <img
                      src={product.productImage[0]}
                      className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                    />
                  </div>
                  <div className="p-4 grid ">
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
                      disabled={cartLoading}
                      className=" disabled:opacity-60 disabled:cursor-not-allowed text-sm bg-red-600 hover:bg-red-600 text-white px-2 py-0.5 rounded-full"
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

export default HoriZontalCardProduct;
