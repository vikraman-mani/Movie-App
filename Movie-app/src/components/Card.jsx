import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

const Card = ({ data, trending, index, media_type }) => {
  const imageUrl = useSelector((state) => state.movieData.imageURL);

  const mediatype = data.media_type ?? media_type;

  return (
    <Link
      to={"/" + mediatype + "/" + data.id}
      className="w-full max-w-[350px] overflow-hidden   block rounded relative hover:scale-105 transition-all"
    >
      <img src={imageUrl + data.backdrop_path} />
      <div className="absolute top-4 ">
        {trending && (
          <div className="py-1 px-4 bg-black/60 backdrop-blur-3xl rounded-r-full">
            #{index} Trending
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
};

export default Card;
