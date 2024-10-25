import React, { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import productCategory from "../helpers/productCategory";
import { IoMdCloudUpload } from "react-icons/io";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import toast from "react-hot-toast";
import Context from "../context";
import { LuLoader2 } from "react-icons/lu";
import playSound from "../common/playSound";

const AdminEditProduct = (props) => {
  const { onClose, productData, fetchdata } = props;
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage,
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState();
  const context = useContext(Context);

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProductImage = async (event) => {
    // playSound();
    const file = event.target.files[0];

    const uploadImageCloudanary = await uploadImage(file);
    // console.log("upload image", uploadImageCloudanary.url);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudanary.url],
      };
    });
  };

  const handleDeleteProductImage = async (idx) => {
    // playSound();
    const newProductImage = [...data.productImage];
    newProductImage.splice(idx, 1);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  const [updateLoading, setUpdateLoading] = useState(false);
  const handleSumbit = async (event) => {
    event.preventDefault();
    setUpdateLoading(true);
    try {
      const fetchResponse = await fetch(SummaryApi.updateProduct.url, {
        method: SummaryApi.updateProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await fetchResponse.json();
      if (resData.success) {
        toast.success(resData.message);
        onClose();
        fetchdata();
      } else {
        throw new Error(resData.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
    setUpdateLoading(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 ${
        context.theme == "dark" ? " bg-slate-400" : "bg-slate-200"
      } bg-opacity-50 w-full h-full flex justify-center items-center`}
    >
      <div
        className={`${
          context.theme == "dark" ? " bg-black" : "bg-white"
        } p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden`}
      >
        <div className="flex justify-between items-center pb-4">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <button
            className="w-fit ml-auto text-2xl hover:text-red-600"
            onClick={onClose}
          >
            <IoClose />
          </button>
        </div>
        <form
          className="grid p-4 gap-2 h-full overflow-y-scroll pb-5"
          onSubmit={() => {
            playSound();
            handleSumbit();
          }}
        >
          <label htmlFor="productName">Product Name : </label>
          <input
            type="text"
            name="productName"
            id="productName"
            placeholder="Enter the Product Name"
            value={data.productName}
            onChange={handleOnChange}
            className={`p-2 outline-none ${
              context.theme == "dark"
                ? " bg-slate-400 border-slate-700"
                : "bg-slate-200 "
            } border rounded`}
            required
          />
          <label htmlFor="brandName" className="mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            name="brandName"
            id="brandName"
            placeholder="Enter the Brand Name"
            value={data.brandName}
            onChange={handleOnChange}
            className={`p-2 outline-none ${
              context.theme == "dark"
                ? " bg-slate-400 border-slate-700"
                : "bg-slate-200 "
            } border rounded`}
            required
          />

          <label htmlFor="category" className="mt-3">
            Category:
          </label>
          <select
            value={data.category}
            className={`p-2 outline-none ${
              context.theme == "dark"
                ? " bg-slate-400 border-slate-700"
                : "bg-slate-200 "
            } border rounded`}
            onChange={handleOnChange}
            name="category"
            required
          >
            <option value={""} key={98765}>
              {"Select Category"}
            </option>
            {productCategory.map((item, idx) => {
              return (
                <option value={item.value} key={item.value + item.id}>
                  {item.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImage" className="mt-3">
            Product Image:
          </label>
          <label htmlFor="uploadImageInput">
            <div
              className={`p-2 ${
                context.theme == "dark"
                  ? " bg-slate-400 border-slate-700"
                  : "bg-slate-200 "
              } border rounded h-32 w-full flex justify-center items-center cursor-pointer`}
            >
              <div className=" text-slate-500 flex justify-center items-center flex-col gap-2 ">
                <span className="text-4xl ">
                  <IoMdCloudUpload />
                </span>
                <p className="text-sm ">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={() => {
                    playSound();
                    handleUploadProductImage();
                  }}
                  // required
                />
              </div>
            </div>
          </label>
          <div className="">
            {data.productImage.length > 0 ? (
              <div className="flex items-center gap-2 ">
                {data.productImage.map((item, idx) => {
                  return (
                    <div className="relative group" key={idx}>
                      <img
                        src={item}
                        width={80}
                        height={80}
                        key={idx}
                        alt={item}
                        onClick={() => {
                          setFullScreenImage(item);
                          setOpenFullScreenImage(true);
                        }}
                        className={`${
                          context.theme === "dark"
                            ? " bg-slate-400 border-slate-700"
                            : "bg-slate-200 "
                        } border rounded cursor-pointer `}
                      />
                      <div
                        className="absolute right-0 bottom-0 p-1 text-white bg-red-600  rounded-full cursor-pointer hidden group-hover:block"
                        onClick={() => handleDeleteProductImage(idx)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Please Upload Product Image
              </p>
            )}
          </div>
          <label htmlFor="price" className="mt-3">
            Price :
          </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Enter the Price Name"
            value={data.price}
            onChange={handleOnChange}
            className={`p-2 outline-none ${
              context.theme == "dark"
                ? " bg-slate-400 border-slate-700"
                : "bg-slate-200 "
            } border rounded`}
            required
          />

          <label htmlFor="sellingPrice" className="mt-3">
            Selling Price :
          </label>
          <input
            type="number"
            name="sellingPrice"
            id="sellingPrice"
            placeholder="Enter the Selling Price Name"
            value={data.sellingPrice}
            onChange={handleOnChange}
            className={`p-2 outline-none ${
              context.theme == "dark"
                ? " bg-slate-400 border-slate-700"
                : "bg-slate-200 "
            } border rounded`}
            required
          />

          <label htmlFor="description" className="mt-3">
            Description :
          </label>
          <textarea
            className={`h-28 outline-none  ${
              context.theme == "dark"
                ? " bg-slate-400 border-slate-700"
                : "bg-slate-200 "
            } rounded border resize-none p-2`}
            rows={3}
            id="description"
            name="description"
            placeholder="Enter The Product Description..."
            onChange={handleOnChange}
            value={data.description}
          ></textarea>
          <button
            className="px-3 flex items-center justify-center py-2 bg-red-600 text-white mb-10 hover:bg-red-700 rounded disabled:opacity-60 disabled:cursor-not-allowed  "
            disabled={updateLoading}
          >
            Update Product
            {updateLoading && (
              <div className="text-xl w-fit animate-spin px-2 ">
                <LuLoader2 />
              </div>
            )}
          </button>
        </form>
      </div>
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => {
            setOpenFullScreenImage(false);
          }}
          url={fullScreenImage}
        />
      )}
    </div>
  );
};

export default AdminEditProduct;
