import React, { useState } from "react";
import ROLE from "../common/role";
import { MdOutlineClose } from "react-icons/md";
import SummaryApi from "../common";
import toast from "react-hot-toast";
import playSound from "../common/playSound";

const ChangeUserRole = (props) => {
  const { name, email, role, onClose, userId,callFunc} = props;
  // console.log(userId);
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (event) => {
    // console.log(event.target.value);
    setUserRole(event.target.value);
  };

  const [updateLoading,setUpdateLoading] = useState(false);
  const updateUserRole = async () => {
    setUpdateLoading(true);
    try {
      // playSound();
      const fetchResponce = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          role: userRole,
        }),
      });
      const fetchData = await fetchResponce.json();
      // console.log(fetchData);
      if (fetchData.success) {
        toast.success(fetchData.message);
        onClose();
        callFunc();
      } else {
        toast.error(fetchData.message);
      }
    } catch (err) {
      toast.error("Some thing went Wrong...😯");
    }
    setUpdateLoading(false);
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0  w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50 ">
      <div className="w-full  mx-auto bg-white shadow-md p-4 max-w-sm">
        <button className="block  ml-auto" onClick={onClose}>
          <MdOutlineClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name : {name}</p>
        <p>Email : {email}</p>
        <div className="flex items-center justify-between my-4 gap-1">
          <p>Role : </p>
          <select
            className="border-2 px-4 py-1 "
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((item, idx) => {
              return (
                <option value={item} key={idx}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className=" disabled:opacity-60 disabled:cursor-not-allowed  w-fit mx-auto block py-1  px-3 rounded-full bg-red-600 text-white hover:bg-red-700"
          onClick={()=>{
            playSound();
            updateUserRole();
          }
        }
          disabled = {updateLoading}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
