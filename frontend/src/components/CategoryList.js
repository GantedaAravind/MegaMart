import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import SummaryApi from "../common";
import { Link } from "react-router-dom";
import Context from "../context";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(13).fill(null);

  const fecthCategoryProduct = async () => {
    setLoading(true);
    try {
      const fetchResponse = await fetch(SummaryApi.categoryProduct.url, {
        method: SummaryApi.categoryProduct.method,
        // credentials : "include"
      });

      const data = await fetchResponse.json();
      if (data.success) {
        setCategoryProduct(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };
  const context = useContext(Context);

  useEffect(() => {
    fecthCategoryProduct();
  }, []);

  return (
    <div className="container p-4 mx-auto ">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {loading
          ? categoryLoading.map((element, idx) => {
              return (
                <div
                  className={`h-14 w-14 md:h-16 md:w-16 rounded-full overflow-hidden  animate-pulse ${
                    context.theme == "dark" ? "  bg-slate-600" : " bg-slate-200"
                  }`}
                  key={"category" + idx}
                ></div>
              );
            })
          : categoryProduct.map((product, idx) => {
              return (
                <Link
                  to={"/product-category?category=" + product.category}
                  key={product.category + idx}
                  className="p-2 cursor-pointer"
                >
                  <div
                    className={`${
                      context.theme == "dark"
                        ? "  bg-slate-400"
                        : " bg-slate-200"
                    } w-14 h-14 md:w-16 md:h-16 flex rounded-full  overflow-hidden justify-center p-4  items-center`}
                  >
                    <img
                      src={product.productImage[0]}
                      alt={product.productName + " image"}
                      className="h-full object-scale-down mix-blend-multiply hover:scale-125 translate-all"
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize ">
                    {product.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
