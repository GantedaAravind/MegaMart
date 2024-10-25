import { useContext, useState } from "react";
import signinIcon from "../assest/signin.gif";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from "../helpers/imageToBase65";
import SummaryApi from "../common";
import toast from "react-hot-toast";
import emailVeify from "../assest/emailVerify.svg";
import Context from "../context";
import playSound from "../common/playSound";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const context = useContext(Context);
  const [showVerification, setShowVerfication] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });

  const [verifycode, setVerifyCode] = useState("");
  const [code, setCode] = useState("");
  const handleOnChangeVerify = (event) => {
    if (event.target.name === "verifycode") {
      setVerifyCode(event.target.value);
    }
  };

  const navigate = useNavigate();
  const handleOnChange = (event) => {
    if (event.target.name === "email") {
      setData((prev) => {
        return { ...prev, email: event.target.value };
      });
    } else if (event.target.name === "name") {
      setData((prev) => {
        return { ...prev, name: event.target.value };
      });
    } else if (event.target.name === "confirmPassword") {
      setData((prev) => {
        return { ...prev, confirmPassword: event.target.value };
      });
    } else {
      setData((prev) => {
        return { ...prev, password: event.target.value };
      });
    }
  };

  const handleUploadPic = async (event) => {
    try {
      const file = event.target.files[0];

      // Check if the file size is more than 300KB (300 * 1024 bytes)
      if (file.size > 300 * 1024) {
        throw new Error("File size exceeds 300KB limit.");
      }

      const imagePic = await imageToBase64(file);
      setData((prev) => {
        return { ...prev, profilePic: imagePic };
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const [verifyLoading, setVerifyLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    playSound();
    setVerifyLoading(true);
    try {
      if (code == verifycode) {
        const res = await fetch(SummaryApi.signUp.url, {
          method: SummaryApi.signIn.method,
          // credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res_data = await res.json();
        // console.log(res_data);
        if (res_data.success) {
          toast.success(res_data.message);
          navigate("/login");
        } else {
          toast.error(res_data.message);
        }
      } else {
        throw new Error("Invalid Code...🤐");
      }
    } catch (err) {
      toast.error(err.message);
    }
    setVerifyLoading(false);
  };

  const [signupLoading, setSignupLoading] = useState(false);
  const sendEmail = async (event) => {
    event.preventDefault();
    setSignupLoading(true);
    playSound();
    try {
      // console.log("UserEmail: ", data.email);
      if (data.password === data.confirmPassword) {
        const fetchResponse = await fetch(SummaryApi.sendEmail.url, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            userEmail: data.email,
          }),
        });

        const response = await fetchResponse.json();
        if (response.success) {
          toast.success(response.message);
          setCode(response.verificationCode);
          setShowVerfication(true);
        } else {
          toast.error(response.message);
        }
      } else {
        toast.error("Check password and Confirm Passwprd....😯");
      }
    } catch (err) {
      toast.error(err.message);
    }
    setSignupLoading(false);
  };

  return (
    <section id="signup">
      <div className="mx-auto  container p-4">
        {showVerification ? (
          <div
            className={` ${
              context.theme == "dark" ? "  bg-black" : "bg-white "
            } mx-auto p-5 w-full max-w-sm rounded mt-20`}
          >
            <img src={emailVeify} alt="Email Icon" className="h-16  mx-auto" />
            <h2 className="text-xl font-semibold w-fit mx-auto capitalize mt-4">
              {" "}
              Verify It's You
            </h2>
            <p className="mb-4 text-center text-sm ">
              We've sent a verification code to{" "}
              <span className="font-semibold">{data.email}</span>. Please enter
              the code below to verify your account.
            </p>
            <div className="mt-8">
              <div className="">
                <div
                  className={`${
                    context.theme == "dark"
                      ? " bg-slate-400 border-slate-700"
                      : "bg-slate-200 "
                  } rounded  p-2`}
                >
                  <input
                    type="text"
                    placeholder="Verification Code"
                    name="verifycode"
                    maxLength="6"
                    value={verifycode}
                    onChange={handleOnChangeVerify}
                    required
                    className={`w-full rounded bg-transparent outline-none h-full ${
                      context.theme == "dark"
                        ? "placeholder:text-slate-600 "
                        : ""
                    } rounded  `}
                  />
                </div>
              </div>
              <button
                disabled={verifyLoading}
                onClick={handleSubmit}
                className={` disabled:opacity-60 disabled:cursor-not-allowed rounded border-2 border-red-500 ${
                  context.theme == "dark"
                    ? "  bg-red-500 transition-all duration-1000 text-white hover:bg-black hover:text-red-500 "
                    : "bg-red-500 transition-all duration-1000 text-white hover:bg-white hover:text-red-500  "
                } border p-1 w-full mt-4 text-xl font-medium `}
              >
                Verify Code
              </button>
            </div>
          </div>
        ) : (
          <div
            className={` ${
              context.theme == "dark" ? "  bg-black" : "bg-white "
            } mx-auto p-5 w-full max-w-sm  `}
          >
            <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full ">
              <div>
                <img src={data.profilePic || signinIcon} alt="Login Icon" />
              </div>
              <form>
                <label>
                  <div
                    className={`text-xs bg-opacity-80 ${
                      context.theme == "dark"
                        ? "  bg-slate-400"
                        : "bg-slate-200"
                    }  pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full`}
                  >
                    Upload Photo
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleUploadPic}
                  ></input>
                </label>
              </form>
            </div>

            <form className="pt-6 flex flex-col gap-2 " onSubmit={sendEmail}>
              <div className="grid">
                <label>UserName : </label>
                <div
                  className={`${
                    context.theme == "dark"
                      ? " bg-slate-400 border-slate-700"
                      : "bg-slate-200 "
                  } rounded  p-2`}
                >
                  <input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    value={data.name}
                    onChange={handleOnChange}
                    required
                    className={`w-full rounded bg-transparent outline-none h-full ${
                      context.theme == "dark"
                        ? "placeholder:text-slate-600 "
                        : ""
                    } rounded  `}
                  ></input>
                </div>
              </div>

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
                    required
                    className={`w-full rounded bg-transparent outline-none h-full ${
                      context.theme == "dark"
                        ? "placeholder:text-slate-600 "
                        : ""
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
                    required
                    className={`w-full rounded bg-transparent outline-none h-full ${
                      context.theme == "dark"
                        ? "placeholder:text-slate-600 "
                        : " "
                    } rounded  `}
                  ></input>

                  <div
                    className="text-xl"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <span>{showPassword ? <IoMdEye /> : <IoMdEyeOff />}</span>
                  </div>
                </div>
              </div>

              <div className="">
                <label>Confirm Password : </label>
                <div
                  className={`${
                    context.theme == "dark"
                      ? " bg-slate-400 border-slate-700"
                      : "bg-slate-200 "
                  } rounded  p-2 flex`}
                >
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter Confrim Password"
                    name="confirmPassword"
                    value={data.confirpassword}
                    required
                    onChange={handleOnChange}
                    className={`w-full rounded bg-transparent outline-none h-full ${
                      context.theme == "dark"
                        ? "placeholder:text-slate-600 "
                        : ""
                    } rounded  `}
                  ></input>

                  <div
                    className="text-xl"
                    onClick={() => setConfirmShowPassword((prev) => !prev)}
                  >
                    <span>
                      {showConfirmPassword ? <IoMdEye /> : <IoMdEyeOff />}
                    </span>
                  </div>
                </div>
              </div>

              <button
                disabled={signupLoading}
                className="bg-red-500 disabled:cursor-not-allowed disabled:opacity-60 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4 "
              >
                Sign Up
              </button>
            </form>

            <p className="my-4 ">
              Already Have Account?
              <Link
                to={"/login"}
                onClick={() => {
                  playSound();
                }}
                className="hover:underline text-red-500 hover:text-red-700"
              >
                Login
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default SignUp;
