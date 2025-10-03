import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import TopNav from "./templetes/TopNav";
import Cards from "./cards";
import Loading from "../utiles/Loading";

const Popular = () => {
  const navigate = useNavigate();
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const GetPopular = async (reset = false) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=2a9337ca88d4c1727b65a3eabff258cb&page=${page}`
      );
      if (res.data.results && res.data.results.length > 0) {
        setPopular((prev) =>
          reset ? res.data.results : [...prev, ...res.data.results]
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Load first page on mount
  useEffect(() => {
    GetPopular(true);
  }, []);

  // Fetch more when page changes
  useEffect(() => {
    if (page > 1) GetPopular();
  }, [page]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loadingMore
      ) {
        setLoadingMore(true);
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore]);

  return popular.length > 0 ? (
    <div className="px-[3%] w-screen min-h-screen overflow-hidden overflow-y-auto">
      {/* Header Row */}
      <div className="w-full flex items-center justify-between sticky top-0 bg-black z-50 py-3">
        <h1 className="text-2xl font-bold text-zinc-400 flex items-center gap-2">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] cursor-pointer ri-arrow-left-line"
          ></i>
          Popular 
        </h1>

        {/* Search Bar */}
        <TopNav />
      </div>

      {/* Popular Cards */}
      <Cards data={popular} title="Popular" />

      {/* Loading more spinner */}
      {loadingMore && (
        <div className="flex justify-center py-10">
          <Loading />
        </div>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
