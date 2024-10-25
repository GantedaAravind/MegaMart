import React, {
  act,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import SummaryApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import diaplyINRCurrency from "../helpers/displayCurrency";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import playSound from "../common/playSound";

const ProductDetail = () => {
  const params = useParams();
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    await fetchUserAddToCart();
  };

  const navigate = useNavigate();

  const handleBuyProduct = async (e,id)=>{
    await handleAddToCart(e,id);
    navigate("/cart");
  }

  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const fetchResponse = await fetch(SummaryApi.productDetail.url, {
        method: SummaryApi.productDetail.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          productId: params?.id,
        }),
      });

      const dataResponse = await fetchResponse.json();

      if (dataResponse.success) {
        setLoading(false);
        setData(dataResponse.data);
        setActiveImage(dataResponse.data.productImage[0]);

        // console.log(dataResponse.data);
      } else {
        throw new Error(dataResponse.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const productImage = new Array(4).fill(null);

  useEffect(() => {
    fetchProductDetail();
  }, [params]);

  const handleMouseEnter = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomImageCoordinate({ x, y });
      // setZoomImage(false);
    },
    [zoomImageCoordinate]
  );

  const handleMouseLeave = (e) => {
    setZoomImage(false);
  };


  return (
    <div className="container mx-auto p-4">
      <div className=" min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* Product Image */}
        <div className="h-96 flex  flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative rounded-md p-2">
            {activeImage && (
              <img
                src={activeImage}
                className="h-full w-full mix-blend-multiply object-scale-down "
                onMouseMove={handleZoomImage}
                onMouseLeave={handleMouseLeave}
              />
            )}

            {/* product Zoom */}
            {zoomImage && (
              <div className=" hidden absolute  lg:block min-w-[500px] min-h-[500px] bg-slate-200 rounded-lg p-1 -right-[510px] top-0 overflow-hidden ">
                <div
                  className="w-full h-full min-h-[400px] min-w-[400px]  mix-blend-multiply scale-150 "
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }% `,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImage.map((image, idx) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                      key={idx}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data.productImage.map((imageURL) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                      key={imageURL}
                    >
                      <img
                        src={imageURL}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => {
                          handleMouseEnter(imageURL);
                        }}
                        onClick={() => {
                          handleMouseEnter(imageURL);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* product Details */}
        <div>
          {loading ? (
            <div className="flex flex-col gap-2">
              <p className="bg-slate-200 animate-pulse h-6 w-[100px] rounded-full inline-block  "></p>
              <h2 className="h-6 rounded bg-slate-200 animate-pulse"></h2>
              <p className="bg-slate-200 animate-pulse h-6 rounded w-[200px]"></p>
              <div className="flex gap-1 text-slate-200 animate-pulse items-center text-xl">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>

              <div className="flex gap-4 items-center text-2xl lg:text-3xl font-medium my-1">
                <p className=" bg-slate-200 h-6 animate-pulse w-[100px]"></p>
                <p className=" bg-slate-200 h-6 animate-pulse w-[100px]"></p>
              </div>

              <div className="flex gap-3 items-center my-2 ">
                <button className="bg-slate-200 animate-pulse rounded w-[45%] h-6"></button>
                <button className="bg-slate-200 animate-pulse rounded w-[45%] h-6"></button>
              </div>
              <div>
                <p className=" bg-slate-200 h-6 w-[60%] font-medium my-1 "></p>
                <p className="bg-slate-200 h-6 w-[95%] my-1"></p>
                <p className="bg-slate-200 h-6 w-[85%] my-1"></p>
                <p className="bg-slate-200 h-6 w-[65%] my-1"></p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
                {data?.brandName}
              </p>
              <h2 className=" text-2xl lg:text-4xl font-medium">
                {data?.productName}
              </h2>
              <p className="capitalize text-slate-400 ">{data?.category}</p>
              <div className="flex gap-1 text-red-600 items-center">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>

              <div className="flex gap-4 items-center text-2xl lg:text-3xl font-medium my-1">
                <p className=" text-red-600">
                  {diaplyINRCurrency(data?.sellingPrice)}
                </p>
                <p className="line-through text-slate-400">
                  {diaplyINRCurrency(data?.price)}
                </p>
              </div>

              <div className="flex gap-3 items-center my-2 ">
                <button
                  className="border-2 border-red-500 rounded px-4 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white"
                  onClick={(e) => {
                    playSound();
                    handleBuyProduct(e, data?._id);
                  }}
                >
                  Buy
                </button>
                <button
                  className="border-2 border-red-500 rounded px-4 py-1 min-w-[120px] font-medium bg-red-600 text-white hover:text-red-600 hover:bg-white"
                  onClick={(e) => {
                    playSound();
                    handleAddToCart(e, data?._id);
                  }}
                >
                  Add To Cart
                </button>
              </div>
              <div>
                <p className=" text-slate-600 font-medium my-1">
                  Description :
                </p>
                <p className=" text-ellipsis line-clamp-4">
                  {data?.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <CategoryWiseProductDisplay
        category={data?.category}
        heading={`Recommended Products`}
      />
    </div>
  );
};

export default ProductDetail;
