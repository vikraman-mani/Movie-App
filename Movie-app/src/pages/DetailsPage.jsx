import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import Divider from "../components/Divider";

const DetailsPage = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [castData, setCastData] = useState("");
  const imageUrl = useSelector((state) => state.movieData.imageURL);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/${params.explore}/${params.id}`);
      setData(res.data);
      console.log(res.data);

      const response = await axios.get(
        `/${params.explore}/${params.id}/credits`
      );
      setCastData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="w-full h-[300px] relative">
        <div className="w-full h-full">
          <img
            src={imageUrl + data?.backdrop_path}
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className="absolute w-full h-full top-0 bg-gradient-to-t"
          style={{
            background: "linear-gradient(to top, #242424, transparent)",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-10 flex flex-col lg:flex-row lg:gap-10 gap-3">
        <div className="-mt-35 relative">
          <img
            src={imageUrl + data?.poster_path}
            className="h-85 w-60 object-cover rounded-2xl"
          />
        </div>

        <div>
          <h2 className="text-xl lg:text-3xl text-white font-bold">
            {data.title || data.name}
          </h2>
          <p className="text-neutral-400">{data.tagline}</p>

          <Divider />

          <div className="flex items-center gap-3">
            <p> Rating : {Number(data.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>View : {Number(data.vote_count)} </p>
            <span>|</span>
            <p>Duration : {(Number(data?.runtime) / 60).toFixed(1)}</p>
          </div>
        </div>
      </div>

      <div className="mx-10">
        <h3 className="text-xl font-bold text-white mb-1 lg:my-1 my-3">
          Overview
        </h3>
        <p className="text-sm">{data.overview}</p>

        <Divider />

        <div className="my-2 flex gap-2">
          <p>Status : {data.status}</p>
          <span>|</span>
          <p>
            Release Date : {moment(data.release_date).format("MMMM Do YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
