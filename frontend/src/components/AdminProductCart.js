import React, { useContext, useState } from "react";
import { MdEdit } from "react-icons/md";
import AdminEditPeoduct from "./AdminEditPeoduct";
import diaplyINRCurrency from "../helpers/displayCurrency";
import Context from "../context";

const AdminProductCart = (props) => {
  const { data, fetchdata } = props;
  const [editProduct, setEditProduct] = useState(false);
  const context = useContext(Context);

  return (
    <div
      className={`${
        context.theme == "dark" ? " bg-black border-slate-500" : " bg-white "
      } p-4 rounded-xl border`}
    >
      <div className="w-40 ">
        <div className="w-32 h-32 flex justify-center items-center mx-auto">
          <img
            src={data.productImage[0]}
            alt={data.productName + " Image"}
            className="object-fill h-full rounded aspect-auto"
            width={120}
            height={120}
          />
        </div>

        <h2 className="text-ellipis line-clamp-2 ">{data.productName}</h2>
        <div>
          <p className="font-semibold ">
            {diaplyINRCurrency(data.sellingPrice)}
          </p>

          <div
            className={`w-fit ml-auto p-2 rounded-full hover:text-white  cursor-pointer ${
              context.theme == "dark"
                ? " bg-green-200 hover:bg-green-500 text-black"
                : "bg-green-200 hover:bg-green-500 text-white"
            }`}
            onClick={() => {
              setEditProduct(true);
            }}
          >
            <MdEdit />
          </div>
        </div>
      </div>
      {editProduct && (
        <AdminEditPeoduct
          fetchdata={fetchdata}
          onClose={() => {
            setEditProduct(false);
          }}
          productData={data}
        />
      )}
    </div>
  );
};

export default AdminProductCart;
