import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopNav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        GetSearches();
      } else {
        setSearches([]);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const GetSearches = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=2a9337ca88d4c1727b65a3eabff258cb&query=${query}`
      );
      setSearches(res.data.results || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    // ✅ Fixed navbar
    <div className="w-full h-[60px] fixed top-0 left-0 flex items-center justify-between px-4 md:px-10 bg-black z-50 shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <i className="text-[#6556CD] ri-tv-fill text-xl"></i>
        <span className="text-white font-bold text-lg">SCSDB</span>
      </div>

      {/* Search Input */}
      <div className="relative flex items-center w-[70%] sm:w-[80%] md:w-[500px]">
        <div className="flex items-center w-full bg-zinc-800/60 hover:bg-zinc-700/70 
                        border border-zinc-700 focus-within:border-[#6556CD]
                        px-3 py-2 rounded-full shadow-md transition duration-300">
          <i className="ri-search-line text-zinc-400 text-base md:text-lg"></i>
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            type="text"
            placeholder="Search..."
            className="ml-2 w-full bg-transparent text-zinc-200 text-sm md:text-base 
                       outline-none placeholder:text-zinc-500"
          />
          {query.length > 0 && (
            <i
              onClick={() => {
                setQuery("");
                setSearches([]);
              }}
              className="ri-close-line text-zinc-400 text-lg md:text-xl cursor-pointer 
                         hover:text-white transition ml-2"
            ></i>
          )}
        </div>

        {/* Dropdown Overlay */}
        {query.trim().length > 0 && searches.length > 0 && (
          <div className="absolute left-0 top-full mt-2 w-full md:w-[700px] 
                          bg-zinc-900/90 backdrop-blur-md rounded-xl shadow-2xl 
                          max-h-[70vh] overflow-y-auto z-50 p-4 fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {searches.map((s, i) => {
                const imageUrl = s.poster_path
                  ? `https://image.tmdb.org/t/p/w300${s.poster_path}`
                  : s.profile_path
                  ? `https://image.tmdb.org/t/p/w300${s.profile_path}`
                  : "https://via.placeholder.com/150x220?text=No+Image";

                return (
                  <div
                    key={s.id || i}
                    className="bg-zinc-800/60 hover:bg-zinc-700/70 rounded-lg overflow-hidden 
                               shadow-md hover:shadow-xl transition duration-300 flex flex-col"
                  >
                    <img
                      src={imageUrl}
                      alt={s.title || s.name || "No Title"}
                      className="w-full h-[200px] object-cover"
                    />

                    <div className="p-2 flex flex-col flex-grow">
                      <h2 className="text-white text-sm md:text-base font-semibold truncate">
                        {s.title || s.name}
                      </h2>
                      {(s.release_date || s.first_air_date) && (
                        <p className="text-zinc-400 text-xs md:text-sm">
                          {s.release_date?.slice(0, 4) ||
                            s.first_air_date?.slice(0, 4)}
                        </p>
                      )}
                      <p className="text-xs text-zinc-500 mt-1">
                        {s.media_type?.toUpperCase()}
                      </p>

                      <Link
                        to={`/${s.media_type === "person" ? "people" : s.media_type}/details/${s.id}`}
                        className="mt-auto bg-[#6556CD] hover:bg-[#4c44a6] text-white 
                                   text-center text-xs md:text-sm px-2 py-1 rounded-lg transition"
                      >
                        More Info
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;
