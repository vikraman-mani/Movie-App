import React, { useRef } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

const HorizontalCar = ({ data = [], heading, trending }) => {
  const containerRef = useRef();

  const imgURL = useSelector((state) => state.movieData.imageURL);

  return (
    <div className="container mx-auto px-3 my-10">
      <h2 className="text-xl lg:text-2xl font-bold mb-3 text-white capitalize">
        {heading}
      </h2>

      <div className="relative">
        <div
          ref={containerRef}
          className="grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-hidden overflow-x-scroll relative z-10 transition-all"
        >
          {data.map((data, index) => {
            return (
              <Link
                to={"/movie" + "/" + data.id}
                className="w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative hover:scale-105 transition-all"
              >
                {<img src={imgURL + data?.poster_path} />}

                <div className="absolute top-4 ">
                  {trending && (
                    <div className="py-1 px-4 bg-black/60 backdrop-blur-3xl rounded-r-full">
                      #{index + 1} Trending
                    </div>
                  )}
                </div>

                <div className="absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2">
                  <h2 className="text-lg font-semibold">
                    {data.original_name || data.title}
                  </h2>
                  <div className="text-sm text-amber-100 flex justify-between items-center">
                    <p>
                      {moment(data.release_date).format("MMMM Do YYYY") ||
                        moment(data.first_air_date).format("MMMM Do YYYY")}
                    </p>
                    <p className="bg-black p-1 px-2 rounded-full">
                      Rating : {Number(data.vote_average).toFixed(1)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCar;
