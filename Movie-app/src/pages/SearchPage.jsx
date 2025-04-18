import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import { Axios } from "axios";

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState([1]);
  const navigate = useNavigate();

  const query = location?.search?.slice(3);

  const fetchData = async () => {
    try {
      const res = await axios.get("/search/multi", {
        params: {
          query: location?.search?.slice(3),
          page: pageNo,
        },
      });

      setData((prev) => {
        return [...prev, ...res.data.results];
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPageNo((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [pageNo]);

  useEffect(() => {
    if (query) {
      setPageNo(1);
      setData([]);
      fetchData();
    }
  }, [location?.search]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pt-25">
      <div className="lg:hidden my-2 mx-3 sticky top-[100px] z-30">
        <input
          type="text"
          placeholder="Search here"
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          className="px-4 py-2 text-lg w-full bg-white text-black rounded-full"
        />
      </div>

      <div className="container mx-4">
        <h2 className="capitalize text-lg lg:text-2xl font-bold my-2">
          Search Results
        </h2>

        <div className="grid grid-cols-[repeat(auto-fit,350px)] gap-4 my-3">
          {data.map((item, index) => {
            return (
              item.backdrop_path && (
                <Card
                  data={item}
                  key={item.id + "search"}
                  media_type={item.media_type}
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
