import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const ExplorePage = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totolPageNo, setTotalPageNo] = useState(0);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNo,
        },
      });

      setData((prev) => {
        return [...prev, ...res.data.results];
      });

      setTotalPageNo(res.data.total_pages);
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
    fetchData();
  }, [pageNo]);

  useEffect(() => {
    setPageNo(1);
    setData([]);
    fetchData();
  }, [params.explore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pt-25">
      <div className="container mx-4">
        <h3 className="capitalize text-lg lg:text-2xl font-bold my-2">
          Popular {params.explore} Show
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,350px)] gap-4 my-3">
          {data.map((item, index) => {
            return (
              <Card
                data={item}
                key={item.id + "explore"}
                media_type={params.explore}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
