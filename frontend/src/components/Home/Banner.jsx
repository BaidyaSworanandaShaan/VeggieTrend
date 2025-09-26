import React from "react";

import BannerImage from "../../assets/images/banner.png";
const Banner = () => {
  return (
    <div className="bg-light my-20">
      <div className="max-w-7xl mx-auto   flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-1/2 text-center md:text-left px-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Get Market Prices in a Snap!
          </h1>
          <p className="text-gray-700 text-sm md:text-lg mt-5">
            Get the latest prices for fresh vegetables and fruits <br />
            directly from the market.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src={BannerImage}
            alt="Banner"
            className="w-full h-48 md:h-64 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
