import React, { useContext, useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";

import image1Mobile from "../assest/banner/img1_mobile.jpg";
import image2Mobile from "../assest/banner/img2_mobile.webp";
import image3Mobile from "../assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/banner/img4_mobile.jpg";
import image5Mobile from "../assest/banner/img5_mobile.png";
import Context from "../context";
import playSound from "../common/playSound";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const context = useContext(Context);
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % desktopImages.length);
  };
  const prevImage = () => {
    setCurrentImage((prev) => {
      if (prev === 0) return desktopImages.length - 1;
      return (prev - 1) % desktopImages.length;
    });
  };
  useEffect(() => {
    const clear = setInterval(() => {
      nextImage();
    }, 3000);
    return () => {
      clearInterval(clear);
    };
  }, [currentImage]);
  return (
    <div className="container mx-auto px-4 rounded ">
      <div
        className={`h-60 md:h-72 w-full  ${
          context.theme == "dark"
            ? "  bg-[rgb(35, 37, 37)]"
            : " bg-[rgb(236, 243, 241)]"
        } relative overflow-hidden`}
      >
        <div className="absolute z-10 w-full h-full flex items-center">
          <div className=" md:flex justify-between w-full text-2xl hidden">
            <button
              className={`${
                context.theme == "dark" ? " bg-black" : " bg-white"
              } shadow-md rounded-full p-1`}
              onClick={() => {
                playSound();
                prevImage();
              }}
            >
              <FaAngleLeft />
            </button>
            <button
              className={`${
                context.theme == "dark" ? " bg-black" : " bg-white"
              } shadow-md rounded-full p-1`}
              onClick={() => {
                playSound();
                nextImage();
              }}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        {/* Desktop Vestion */}
        <div className="hidden md:flex h-full w-full  ">
          {desktopImages.map((imgUrl, idx) => {
            return (
              <div
                className="min-w-full min-h-full transition-all "
                key={idx}
                style={{ transform: `translatex(-${currentImage * 100}%)` }}
              >
                <img
                  src={imgUrl}
                  alt="banner"
                  className="w-full h-full rounded"
                />
              </div>
            );
          })}
        </div>
        {/* Mobile Images */}
        <div className="flex h-full w-full  md:hidden">
          {mobileImages.map((imgUrl, idx) => {
            return (
              <div
                className="min-w-full min-h-full transition-all "
                key={idx}
                style={{ transform: `translatex(-${currentImage * 100}%)` }}
              >
                <img
                  src={imgUrl}
                  alt="banner"
                  className="w-full h-full rounded object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
