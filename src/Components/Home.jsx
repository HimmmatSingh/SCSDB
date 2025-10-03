import React, { useState, useEffect } from "react";
import TopNav from "./templetes/TopNav";
import { Sidenav } from "./templetes/Sidenav";
import axios from "axios";
import Header from "../utiles/Header";
import HorizontalCards from "./HorizontalCards";
import Dropdown from "./Dropdown";
import Loading from "../utiles/Loading";

export const Home = () => {
  document.title = "SCSDB | Homepage";
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  // Fetch random wallpaper
  const GetHeaderWallpaper = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=2a9337ca88d4c1727b65a3eabff258cb`
      );
      if (res.data.results && res.data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * res.data.results.length);
        setWallpaper(res.data.results[randomIndex]);
      }
    } catch (error) {
      console.error("Error fetching wallpaper:", error);
    }
  };

  // Fetch trending list
  const GetTrending = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/${category}/day?api_key=2a9337ca88d4c1727b65a3eabff258cb`
      );
      if (res.data.results && res.data.results.length > 0) {
        setTrending(res.data.results);
      }
    } catch (error) {
      console.error("Error fetching trending:", error);
    }
  };

  useEffect(() => {
    if (!wallpaper) GetHeaderWallpaper();
    GetTrending();
  }, [category]);

  return wallpaper && trending ? (
    <div className="flex h-screen w-screen overflow-y-auto overflow-x-hidden bg-black">
      {/* Sidebar */}
      <Sidenav />

      {/* Main Content */}
      <div className="flex flex-col w-full">
        {/* ✅ Fixed TopNav with search bar (start se visible) */}
        <TopNav />

        {/* ✅ Shift content below navbar */}
        <div className="pt-[60px]">
          {/* Banner / Wallpaper */}
          {wallpaper && <Header data={wallpaper} />}

          {/* Trending section */}
          <div className="mt-9 flex flex-wrap items-center justify-between px-5 gap-5">
            <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
            <Dropdown
              title="Filter"
              options={["tv", "movie", "all"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>

          {/* Trending cards */}
          <HorizontalCards data={trending} />
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Home;
