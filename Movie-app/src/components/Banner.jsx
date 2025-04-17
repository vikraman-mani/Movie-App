import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";

const Banner = () => {
  const Data = useSelector((state) => state.movieData.bannerData);
  const imageUrl = useSelector((state) => state.movieData.imageURL);

  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    if (currentImage < Data.length - 1) {
      setCurrentImage((next) => next + 1);
    }
  };
  const handlePrevious = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev < Data.length - 1 ? prev + 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, [Data, imageUrl]);

  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        {Array.isArray(Data) && Data.length > 0 ? (
          Data.map((item, index) => {
            return (
              <div
                key={item.id + "banner"}
                className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all"
                style={{ transform: `translate(-${currentImage * 100}%)` }}
                //  If currentImage = 0, the translation is translate(0%), showing the first image.
                // If currentImage = 1, the translation is translate(-100%), showing the second image.
                // If currentImage = 2, the translation is translate(-200%), showing the third image, and so on.
              >
                <div className="w-full h-full">
                  <img
                    src={imageUrl + item.backdrop_path}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="absolute top-0 w-full h-full bg-gradient-to-l from-neutral-900 to-transparent"></div>

                <div className="absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:lg:flex">
                  <button
                    onClick={handlePrevious}
                    className=" bg-white p-1 rounded-full text-xl z-10 text-black cursor-pointer"
                  >
                    <FaAnglesLeft />
                  </button>
                  <button
                    onClick={handleNext}
                    className=" bg-white p-1 rounded-full text-xl z-10 text-black cursor-pointer"
                  >
                    <FaAnglesRight />
                  </button>
                </div>

                <div className="container mx-auto">
                  <div className="w-full absolute bottom-0 max-w-md px-3">
                    <h2 className="text-white text-2xl font-bold">
                      {item.original_name == null
                        ? item.title
                        : item.original_name}
                    </h2>
                    <p className="text-ellipsis line-clamp-3 my-3 ">
                      {item.overview}
                    </p>
                    <div className="flex items-center gap-4">
                      <p>Rating : {Number(item.vote_average).toFixed(1)}+</p>
                      <span> | </span>
                      <p>View : {Number(item.popularity).toFixed(0)}</p>
                    </div>

                    <button className="bg-white px-4 py-2 text-black font-bold rounded mt-4 cursor-pointer bg-gradient-to-l from-red-700 to-orange-500 ">
                      Play Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No data available</p>
        )}
      </div>
    </section>
  );
};

export default Banner;
