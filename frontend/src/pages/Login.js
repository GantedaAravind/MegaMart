import { useContext, useState } from "react";
import signinIcon from "../assest/signin.gif";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import toast from "react-hot-toast";
import playSound from "../common/playSound"; 
import Context from "../context";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const context = useContext(Context);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const generalContext = useContext(Context);

  const handleOnChange = (event) => {
    if (event.target.name === "email") {
      setData((prev) => {
        return { ...prev, email: event.target.value };
      });
    } else {
      setData((prev) => {
        return { ...prev, password: event.target.value };
      });
    }
  };

  const [loginLoading, setLoaginLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoaginLoading(true);
    playSound();

    try {
      const res = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataResponse = await res.json();
      if (dataResponse.succuss) {
        toast.success(dataResponse.message);
        navigate("/");
        generalContext.fetchUserDetails();
        generalContext.fetchUserAddToCart();
      } else {
        toast.error(dataResponse.message);
      }
    } catch (err) {
      toast.error(err.message);
    }

    setLoaginLoading(false);
  };

  return (
    <section id="login">
      <div className="mx-auto  container p-4">
        <div
          className={`${
            context.theme == "dark" ? "  bg-black" : "bg-white "
          } mx-auto p-5 w-full max-w-sm `}
        >
          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden ">
            <img src={signinIcon} alt="Login Icon" className="" />
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email : </label>
              <div
                className={`${
                  context.theme == "dark"
                    ? " bg-slate-400 border-slate-700"
                    : "bg-slate-200 "
                } rounded  p-2`}
              >
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className={`w-full rounded bg-transparent outline-none h-full ${
                    context.theme == "dark" ? "placeholder:text-slate-600 " : ""
                  } rounded  `}
                ></input>
              </div>
            </div>
            <div className="">
              <label>Password : </label>
              <div
                className={`${
                  context.theme == "dark"
                    ? " bg-slate-400 border-slate-700"
                    : "bg-slate-200 "
                } rounded  p-2 flex`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  className={`w-full rounded bg-transparent outline-none h-full ${
                    context.theme == "dark" ? "placeholder:text-slate-600 " : ""
                  } rounded  `}
                ></input>

                <div
                  className="text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <IoMdEye /> : <IoMdEyeOff />}</span>
                </div>
              </div>
              <Link
               onClick={()=>{playSound()}}
                to="/forgot-password"
                className="block w-fit ml-auto  hover:underline hover:text-red-600"
              >
                Forgot Password?
              </Link>
            </div>
            <button disabled={loginLoading} className=" disabled:cursor-not-allowed disabled:opacity-60 bg-red-500 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4 ">
              Login
            </button>
          </form>

          <p className="my-4 ">
            Don't Have Account ?
            <Link
             onClick={()=>{playSound()}}
              to={"/sign-up"}
              className="hover:underline text-red-500 hover:text-red-700"
            >
              Sign Up{" "}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
