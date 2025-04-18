import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import axios from "axios";
import HorizontalCar from "../components/HorizontalCar";

const Home = () => {
  const trendingData = useSelector((state) => state.movieData.bannerData);
  const [nowPlayData, setNowPlayData] = useState([]);

  const fetchNowPlayData = async () => {
    try {
      const res = await axios.get("/movie/now_playing");
      setNowPlayData(res.data.results);
    } catch (error) {
      comsole.lof(error);
    }
  };

  useEffect(() => {
    fetchNowPlayData();
  }, []);
  return (
    <div>
      <Banner />

      <div className="container mx-auto px-3 my-7 bg-black/20">
        <h2 className="text-xl lg:text-5xl font-bold mb-2"> Trending show </h2>
        <div className="overflow-hidden">
          <div className="grid grid-cols-[repeat(auto-fit,350px)] my-5 gap-6 ">
            {trendingData.map((data, index) => {
              return (
                <Card
                  key={data.id}
                  data={data}
                  index={index + 1}
                  trending={true}
                />
              );
            })}
          </div>
        </div>
      </div>

      <HorizontalCar data={nowPlayData} heading={"Now Playing"} />
    </div>
  );
};

export default Home;
