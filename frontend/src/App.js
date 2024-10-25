import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();

  const [cartProductCount, serCartProductCount] = useState(0);
  const [theme, setTheme] = useState("light");

  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.userDetail.url, {
        method: SummaryApi.userDetail.method,
        credentials: "include",
      });

      const data = await dataResponse.json();
      if (!data.success) {
        throw new Error(data.message);
      } else {
        // const fetchResponse = await fetch(SummaryApi.countAddToCartProduct.url,{
        //   method:SummaryApi.countAddToCartProduct.method,
        //   credentials:"include",
        // });
        // await fetchUserAddToCart();
        dispatch(setUserDetails(data.data));
        // toast.success(data.message);
      }
    } catch (err) {
      // toast.error(err.message);
    }
  };

  const fetchUserAddToCart = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.countAddToCartProduct.url, {
        method: SummaryApi.countAddToCartProduct.method,
        credentials: "include",
      });

      const data = await dataResponse.json();
      if (!data.success) {
        throw new Error(data.message);
      } else {
        serCartProductCount(data.data);
      }
    } catch (err) {
      // toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);
  function setBodyTheme(theme) {
    document.body.setAttribute("data-theme", theme);
  }

  useEffect(() => {
    setBodyTheme(theme);
  }, [theme]);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
          cartProductCount,
          fetchUserAddToCart,
          theme,
          setTheme,
        }}
      >
        <Header />
        <main className="min-h-[calc(100vh-60px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
