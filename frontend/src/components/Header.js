import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo";
import { IoEllipseSharp, IoMoon, IoSearchSharp } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { GiMoonOrbit } from "react-icons/gi";
import { MdSunny } from "react-icons/md";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import toast from "react-hot-toast";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";
import playSound from "../common/playSound";

function Header() {
  const user = useSelector((state) => {
    return state?.user?.user;
  });

  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Destructure correctly to get searchParams
  const q = searchParams.get("q"); // Access query parameter "q"

  const [search, setSearch] = useState(q || "");

  const [logoutLoading, setLogoutLoading] = useState(false);
  const handleLogOut = async () => {
    setLogoutLoading(true);
    try {
      // playSound();
      const dataResponse = await fetch(SummaryApi.userLogOut.url, {
        method: SummaryApi.userLogOut.method,
        credentials: "include",
      });
      const data = await dataResponse.json();
      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLogoutLoading(false);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };
  return (
    <div
      className={`h-16 shadow-md ${
        context.theme == "dark"
          ? " bg-[#1d1d1d] text-white"
          : " text-black bg-white"
      } fixed w-full z-40`}
    >
      <div className="h-full container mx-auto flex items-center px-4 justify-between rounded ">
        <div className="">
          <Link
            to="/"
            className=""
            onClick={() => {
              playSound();
            }}
          >
            <img src = "/logo.png"  width={90} height={40} className={`${ context.theme == "dark" ? " invert":""} `} alt = "MEGA MART LOGO"/>
            
            {/* <Logo w={90} h={50} /> */}

          </Link>
        </div>
        <div
          className={`hidden lg:flex items-center transition-all duration-1000  w-full  justify-between max-w-sm  border  rounded-full focus-within:shadow pl-2 ${
            context.theme == "dark"
              ? " bg-[#1d1d1d] text-white border-slate-700"
              : " text-black bg-white"
          }`}
        >
          <input
            type="text"
            placeholder="Search Product...."
            className="w-full outline-none bg-transparent"
            onChange={handleSearch}
            name="search"
            value={search}
          ></input>
          <div className="text-lg bg-red-500 w-13 h-8 min-w-[50px] flex items-center justify-center rounded-r-full text-white">
            <IoSearchSharp />
          </div>
        </div>
        <div className="flex items-center gap-7 ">
          <div
            className="relative flex justify-center"
            onClick={() => {
              setMenuDisplay((prev) => !prev);
            }}
          >
            {user?._id && (
              <div className="text-3xl cursor-pointer ">
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={user.name}
                    className="rounded-full w-10 h-10 aspect-[1/1]"
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div
                className={`absolute hidden md:block ${
                  context.theme == "dark"
                    ? " bg-[#1d1d1d] text-white border-slate-700 hover:bg-slate-500"
                    : " text-black bg-white hover:bg-slate-200"
                } bottom-0 top-11 h-fit p-2 shadow-lg rounded`}
              >
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      onClick={() => {
                        playSound();
                      }}
                      to={"admin-panel/all-products"}
                      className={` whitespace-nowrap  ${
                        context.theme == "dark"
                          ? "hover:bg-slate-500"
                          : "hover:bg-slate-200"
                      } p-2`}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          {user?._id && (
            <Link
              to={"/cart"}
              className="text-3xl cursor-pointer relative"
              onClick={() => {
                playSound();
              }}
            >
              <span>
                <FaShoppingCart />
              </span>
              <div className="absolute -top-2 -right-3 text-sm bg-red-500 text-white w-5 p-1 flex items-center  justify-center h-5 rounded-full ">
                <p>{context.cartProductCount}</p>
              </div>
            </Link>
          )}

          {user?._id ? (
            <button
              disabled={logoutLoading}
              className="px-3 disabled:opacity-60 disabled:cursor-not-allowed  py-1 rounded-full text-white  bg-red-500 hover:bg-red-700 "
              onClick={() => {
                playSound();
                handleLogOut();
              }}
            >
              LogOut
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => {
                playSound();
              }}
              className="px-3 py-1 rounded-full text-white  bg-red-500 hover:bg-red-700 "
            >
              Login
            </Link>
          )}
          <div
            className="hidden sm:block rounded-full text-2xl cursor-pointer relative  "
            onClick={() => {
              context.setTheme((prev) => {
                if (prev == "light") {
                  return "dark";
                }
                return "light";
              });
              playSound();
            }}
          >
            {/* Moon icon */}
            <div
              className={`absolute top-[-10px] left-0 transition-all duration-500 transform ${
                context.theme != "light"
                  ? "opacity-100 rotate-0"
                  : "opacity-0 rotate-45"
              }`}
            >
              <IoMoon />
            </div>

            {/* Sunny icon */}
            <div
              className={`absolute top-[-10px] left-0 transition-all duration-300 transform ${
                context.theme == "dark"
                  ? "opacity-0 rotate-45"
                  : "opacity-100 rotate-0"
              }`}
            >
              <MdSunny />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
