import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";

import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";
import Context from "../context";
import playSound from "../common/playSound";

function AdminPannel() {
  const user = useSelector((state) => {
    return state?.user?.user;
  });

  const navigate = useNavigate();
  const context = useContext(Context);

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside
        className={`${
          context.theme == "dark"
            ? " bg-[#1d1d1d] text-white border-slate-700"
            : " text-black bg-white "
        } min-h-full w-full max-w-60 customShadow `}
      >
        <div className="h-32  flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center ">
            {user ? (
              <img
                src={user.profilePic}
                alt={user.name}
                className="rounded-full w-20 h-20 aspect-[1/1]"
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold ">{user?.name}</p>
          <p className="text-sm ">{user?.role}</p>
        </div>
        {/* navigation */}
        <div>
          <nav className="grid p-4">
            <Link
             onClick={()=>{playSound()}}
              to={"all-users"}
              className={`px-2 rounded py-1 ${
                context.theme == "dark"
                  ? "  hover:bg-slate-500"
                  : " hover:bg-slate-200"
              }`}
            >
              All Users
            </Link>
            <Link
             onClick={()=>{playSound()}}
              to={"all-products"}
              className={`px-2 py-1 rounded ${
                context.theme == "dark"
                  ? "  hover:bg-slate-500"
                  : " hover:bg-slate-200"
              }`}
            >
              All Product
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPannel;
