import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HoriZontalCardProduct from "../components/HoriZontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

function Home() {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HoriZontalCardProduct category = {"airpodes"} heading = {"Top's Airpodes"} />
      <HoriZontalCardProduct category = {"watches"} heading = {"Popular Watches"} />

      <VerticalCardProduct category = {"mobile"} heading = {"Popular Mobiles"} />
      <VerticalCardProduct category = {"mouse"} heading = {"Best Mouses"} />
      <VerticalCardProduct category = {"tv"} heading = {"Best Televisions"} />
      <VerticalCardProduct category = {"camera"} heading = {"Cameras & PhotoGraphy"} />
      <VerticalCardProduct category = {"earphones"} heading = {"Wired Earphones"} />
      <VerticalCardProduct category = {"speakers"} heading = {"Blutooth Speakers"} />
      <VerticalCardProduct category = {"refrigerator"} heading = {"Refrigerators"} />
      <VerticalCardProduct category = {"printers"} heading = {"Printers"} />
      <VerticalCardProduct category = {"processor"} heading = {"Processors"} />
      <VerticalCardProduct category = {"trimmers"} heading = {"Trimmers"} />
      
    </div>
  );
}

export default Home;
