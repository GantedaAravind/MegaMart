import React, { useState, useEffect, useContext } from "react";
import SummaryApi from "../common";
import moment from "moment";
import toast from "react-hot-toast";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";
import Context from "../context";
import playSound from "../common/playSound";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    _id: "",
  });

  const fetchAllUsers = async () => {
    const res = await fetch(SummaryApi.allUsers.url, {
      method: SummaryApi.allUsers.method,
      credentials: "include",
    });
    const data = await res.json();

    if (data.success) {
      setAllUsers(data.data);
    } else {
      toast.error(data.message);
    }
  };
  const context = useContext(Context);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div
      className={`pb-4`}
    >
      <table
        className={`transition-all duration-1000  w-full border-2 border-red-500  ${
          context.theme == "dark"
            ? " text-white bg-black"
            : " text-black bg-white"
        }`}
      >
        <thead>
          <tr
            className={`border-2 text-start transition-all duration-1000 border-red-500 ${
              context.theme == "dark"
                ? " text-black bg-white"
                : " text-white bg-black"
            } `}
          >
            <th className="border-2 border-red-500">SNO.</th>
            <th className="border-2 border-red-500">Name</th>
            <th className="border-2 border-red-500">Email</th>
            <th className="border-2 border-red-500">Role</th>
            <th className="border-2 border-red-500">Created Date</th>
            <th className="border-2 border-red-500">Action</th>
          </tr>
        </thead>
        <tbody
          className={`transition-all duration-1000 ${
            context.theme == "dark"
              ? " text-white bg-black"
              : " text-black bg-white"
          }`}
        >
          {allUsers.map((item, idx) => {
            return (
              <tr key={idx} className="text-center ">
                <td className="border-2 border-red-500">{idx + 1}</td>
                <td className="border-2 border-red-500">{item.name}</td>
                <td className="border-2 border-red-500">{item.email}</td>
                <td className="border-2 border-red-500">{item.role}</td>
                <td className="border-2 border-red-500">
                  {moment(item.createdAt).format("LL")}
                </td>
                <td className="border-2 border-red-500">
                  <button
                    className={`${
                      context.theme == "dark"
                        ? " bg-black hover:bg-green-500"
                        : "bg-white hover:bg-green-500"
                    }  hover:text-white p-2 rounded-full cursor-pointer`}
                    onClick={() => {
                      playSound();
                      setUpdateUserDetails(item);
                      setOpenUpdateUser(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateUser && (
        <ChangeUserRole
          onClose={() => {
            setOpenUpdateUser(false);
          }}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
