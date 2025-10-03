import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import TopNav from "./templetes/TopNav";
import Dropdown from "./Dropdown";
import Cards from "./cards";
import Loading from "../utiles/Loading";

const Trending = () => {
  document.title = "SCSDB | TRENDING";
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const GetTrending = async (reset = false) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/${category}/${duration}?api_key=2a9337ca88d4c1727b65a3eabff258cb&page=${page}`
      );
      if (res.data.results && res.data.results.length > 0) {
        setTrending((prev) =>
          reset ? res.data.results : [...prev, ...res.data.results]
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Reset when category/duration changes
  useEffect(() => {
    setPage(1);
    setTrending([]);
    GetTrending(true);
  }, [category, duration]);

  // Fetch more when page changes
  useEffect(() => {
    if (page > 1) GetTrending();
  }, [page]);

  // Infinite scroll
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

  return trending.length > 0 ? (
    <div className="px-2 sm:px-4 md:px-[3%] w-full min-h-screen overflow-hidden overflow-y-auto">
      {/* Header Row */}
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-3 sticky top-0 bg-black z-50 py-3">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-400 flex items-center gap-2">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] cursor-pointer ri-arrow-left-line"
          ></i>
          Trending
        </h1>

        {/* Search Bar */}
        <div className="w-full md:w-auto">
          <TopNav />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap gap-2">
          <Dropdown
            title="Category"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
          />

          <Dropdown
            title="Duration"
            options={["day", "week"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>

      {/* Trending Cards */}
      <Cards data={trending} title={category} />

      {/* Loading More Spinner */}
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

export default Trending;
