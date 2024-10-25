import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import toast from "react-hot-toast";
import Context from "../context";
import { TbExposureMinus1 } from "react-icons/tb";
import { TbExposurePlus1 } from "react-icons/tb";
import diaplyINRCurrency from "../helpers/displayCurrency";
import { RiDeleteBin3Fill } from "react-icons/ri";
import playSound from "../common/playSound";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);

  const fetchData = async () => {
    try {
      setLoading(true);
      const fetchResponse = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: "include",
      });

      const dataResponse = await fetchResponse.json();
      setLoading(false);
      if (dataResponse.success) {
        setData(dataResponse.data);
      } else {
        throw new Error(dataResponse.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const increaseQty = async (id, qty) => {
    try {
      const fetchResponse = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty + 1,
        }),
      });
      const dataResponse = await fetchResponse.json();
      if (dataResponse.success) {
        toast.success(dataResponse.message);
        await fetchData();
      } else {
        throw new Error(dataResponse.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const decreaseQty = async (id, qty) => {
    try {
      if (qty >= 2) {
        const fetchResponse = await fetch(SummaryApi.updateCartProduct.url, {
          method: SummaryApi.updateCartProduct.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            _id: id,
            quantity: qty - 1,
          }),
        });
        const dataResponse = await fetchResponse.json();
        if (dataResponse.success) {
          toast.success(dataResponse.message);
          await fetchData();
        } else {
          throw new Error(dataResponse.message);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // deleteCartProduct
  const deleteProduct = async (id) => {
    try {
      const fetchResponse = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      });
      const dataResponse = await fetchResponse.json();
      if (dataResponse.success) {
        toast.success(dataResponse.message);
        await fetchData();
        await context.fetchUserAddToCart();
      } else {
        throw new Error(dataResponse.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const loadingItems = new Array(context.cartProductCount).fill(null);

  const totalQty = data.reduce((prev, current) => prev + current.quantity, 0);
  const totalPrice = data.reduce(
    (prev, current) => prev + current.productId.sellingPrice * current.quantity,
    0
  );

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container mx-auto">
      <div className="text-center text-lg font-medium my-3">
        {data.length === 0 && !loading && (
          <div className="mx-auto rounded w-[500px] mt-24 h-96 flex flex-col justify-evenly">
            <img
              src={
                "https://golokaonline.in/static/version1727530784/frontend/MageBig/martfury_layout01/en_US/images/empty-cart.svg"
              }
              className=""
            />
            <h2 className="text-xl font-bold ">
              You have no items in your shopping cart.
            </h2>
          </div>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* view product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingItems.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-full bg-slate-200 h-32 my-2 border border-slate-300  rounded `}
                ></div>
              ))
            : data.map((product) => (
                <div
                  key={product?._id}
                  className={`w-full ${
                    context.theme == "dark"
                      ? " bg-black border-slate-700"
                      : "bg-white border-slate-300"
                  }  h-32 my-2 border  rounded grid grid-cols-[128px,1fr] shadow-md hover:scale-105 hover:shadow-lg transition-all`}
                >
                  <div
                    className={`w-32 rounded-md h-32 ${
                      context.theme == "dark"
                        ? " bg-slate-400"
                        : "bg-slate-200 "
                    } overflow-hidden `}
                  >
                    <img
                      src={product?.productId?.productImage[0]}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                  <div className="px-4 py-2 relative">
                    <div
                      className="absolute top-4 text-xl cursor-pointer text-red-600 rounded-full hover:text-white hover:bg-red-600 p-1 transition-all scale-110 right-4"
                      onClick={() => {
                        playSound();
                        deleteProduct(product?._id);
                      }}
                    >
                      <RiDeleteBin3Fill />
                    </div>
                    <h2 className="capitalize text-lg lg:text-xl text-ellipsis line-clamp-1 w-[93%]">
                      {product?.productId?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.productId?.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="capitalize text-red-500 font-medium text-lg ">
                        {diaplyINRCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="capitalize text-slate-500 font-semibold text-lg ">
                        {diaplyINRCurrency(
                          product?.productId?.sellingPrice * product?.quantity
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-1 ">
                      <button
                        className="p-1 border rounded border-red-600 hover:bg-red-600 hover:text-white text-red-600"
                        onClick={(e) => {
                          playSound();
                          decreaseQty(product?._id, product?.quantity);
                        }}
                      >
                        <TbExposureMinus1 />
                      </button>
                      <span className="p-1">{product?.quantity}</span>
                      <button
                        className="p-1 border rounded border-red-600  hover:bg-red-600 hover:text-white text-red-600"
                        onClick={(e) => {
                          playSound();
                          increaseQty(product?._id, product?.quantity);
                        }}
                      >
                        <TbExposurePlus1 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Total Summary  */}
        <div className="mt-5 lg:mx-w-3xl w-full lg:mt-0 max-w-sm p-4">
          {loading ? (
            <div
              className={`h-36 ${
                context.theme == "dark"
                  ? " bg-slate-400 border-slate-700"
                  : "bg-slate-200 border-slate-300 "
              }  border rounded animate-pulse`}
            >
              Total
            </div>
          ) : (
            data.length !== 0 && (
              <div
                className={`h-36 rounded-md border ${
                  context.theme == "dark"
                    ? " bg-black border-slate-700"
                    : "bg-white border-slate-300 "
                } shadow-md`}
              >
                <h2 className="font-bold text-xl px-4 py-1 bg-red-500 rounded text-white">
                  Summary
                </h2>
                <div className="flex items-center justify-between px-4 gap-2 py-1 font-medium text-lg text-slate-600">
                  <p>Quantity : </p>
                  <p>{totalQty}</p>
                </div>
                <div className="flex items-center justify-between px-4 gap-2 py-1 font-medium text-lg text-slate-600">
                  <p>Total Price : </p>
                  <p>{diaplyINRCurrency(totalPrice)}</p>
                </div>
                <button className="bg-blue-600 p-2  rounded font-semibold text-lg text-white w-full">
                  Payment
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
