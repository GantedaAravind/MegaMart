import React from "react";
import { IoClose } from "react-icons/io5";

const DisplayImage = (props) => {
  const { url, onClose } = props;
  return (
    <div className="fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto p-4">
        <div
          className="w-fit ml-auto  text-2xl hover:text-red-600 cursor-pointer"
          onClick={onClose}
        >
          <IoClose />
        </div>
        <div className="flex justify-center p-4 max-h-[80vh] max-w-[80vh]">
         
          <img src={url} className="w-full  h-full" alt={"Product Image"} />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
