import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import toast from "react-hot-toast";
import VerticalCard from "../components/VerticalCard";
import { RxReload } from "react-icons/rx";
import diaplyINRCurrency from "../helpers/displayCurrency";
import SummaryApi from "../common";
import Context from "../context";

const CategoryProduct = () => {
  const [searchParams] = useSearchParams();
  const categories = searchParams.getAll("category");
  const [sortBy, setSortBy] = useState("");
  const context = useContext(Context);
  // console.log(sortBy);

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const [selectCategory, setSelectCategory] = useState(
    categories.reduce((acc, category) => ({ ...acc, [category]: true }), {})
  );

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;

    setSelectCategory((prev) => {
      return { ...prev, [value]: checked };
    });
  };

  const fetchData = async (arrayOfCategory) => {
    try {
      setLoading(true);
      const fetchResponse = await fetch(SummaryApi.filterProducts.url, {
        method: SummaryApi.filterProducts.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          categoryList: arrayOfCategory,
          sort: sortBy,
        }),
      });

      const dataResponse = await fetchResponse.json();
      setLoading(false);
      if (dataResponse.success) {
        setData(dataResponse.data);
        // console.log(dataResponse.data);
      } else {
        throw new Error(dataResponse.message);
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  const handleSortOnChange = (e) => {
    const { value } = e.target;
    setSortBy(value);
    if (sortBy == "acc") {
      setData((prev) => prev.sort((a, b) => a.sellingPrice - b.sellingPrice));
    } else {
      setData((prev) => prev.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
    // console.log(value);
  };
  // console.log(sortBy);

  useEffect(() => {
    // fetchData();

    const arrayOfCategory = Object.keys(selectCategory).filter(
      (categoryName) => {
        // console.log(categoryName)
        return selectCategory[categoryName] === true;
      }
    );
    const queryString = arrayOfCategory
      .map((category) => `category=${category}`)
      .join("&");

    // Navigate to the constructed URL
    navigate(`/product-category/?${queryString}`);

    fetchData(arrayOfCategory);
  }, [selectCategory]);

  return (
    <div className="container mx-auto p-4 ">
      {/* Desktop Version  */}
      <div className=" hidden lg:grid grid-cols-[200px,1fr]">
        {/* Left Side */}
        <div
          className={`${
            context.theme == "dark" ? " bg-black" : "bg-white"
          } h-fit p-2  overflow-y-scroll`}
        >
          {/* SORT BY  */}
          <div className="">
            <h2
              className={`text-base border-b pb-1 ${
                context.theme == "dark"
                  ? "  border-slate-700"
                  : "border-slate-300 "
              } uppercase font-medium text-slate-500`}
            >
              Sort By
            </h2>

            <form className="text-sm flex  flex-col gap-2 py-2">
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="sortBy"
                  id="high"
                  value={"acc"}
                  checked={sortBy === "acc"}
                  onChange={handleSortOnChange}
                />
                <label htmlFor="high" className="cursor-pointer">
                  Price Low To High
                </label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="sortBy"
                  value="dsc"
                  id="low"
                  checked={sortBy === "dsc"}
                  onChange={handleSortOnChange}
                />
                <label htmlFor="low" className="cursor-pointer">
                  Price High To Low
                </label>
              </div>
            </form>
          </div>

          {/* Filter BY  */}
          <div className="">
            <h2
              className={`text-base border-b pb-1 ${
                context.theme == "dark"
                  ? "  border-slate-700"
                  : "border-slate-300 "
              } uppercase font-medium text-slate-500`}
            >
              Category
            </h2>

            <form className="text-sm flex  flex-col gap-2 py-2">
              {productCategory.map((category) => {
                return (
                  <div className="flex gap-2 items-center" key={category.id}>
                    <input
                      type="checkbox"
                      name={"category"}
                      value={category.value}
                      id={category.label}
                      className="cursor-pointer"
                      onChange={handleSelectCategory}
                      checked={selectCategory[category.value] || false}
                    />
                    <label
                      htmlFor={category.label}
                      className="cursor-pointer capitalize"
                    >
                      {category.value}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>
        {/* Right Side  */}
        <div className="max-h-[calc(100vh-152px)] overflow-y-scroll ">
          {loading && (
            <p className="animate-spin w-fit mx-auto text-3xl">
              <RxReload />
            </p>
          )}
          <p className="font-semibold text-xl mb-3 px-4 text-slate-600">
            Search Results : {data?.length}
          </p>
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

          <VerticalCard loading={loading} data={data} />
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
