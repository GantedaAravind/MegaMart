import React, { useContext } from "react";
import Context from "../context";

function Footer() {
  const context = useContext(Context);
  return (
    <footer
      className={`${
        context.theme == "dark"
          ? " bg-[#1d1d1d] text-white"
          : " text-black bg-white"
      }`}
    >
      <div className="container mx-auto p-4 ">
        <p className="text-center font-bold text-xl" title="AravindGateda">
          Aravind Ganteda
        </p>
      </div>
    </footer>
  );
}

export default Footer;
