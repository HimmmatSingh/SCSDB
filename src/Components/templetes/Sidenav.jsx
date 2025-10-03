import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Sidenav = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-[20%] h-full border-r-2 border-zinc-400 p-10 flex-shrink-0 flex-col">
        <h1 className="text-2xl text-white font-bold flex items-center">
          <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
          <span className="text-2xl">SCSDB</span>
        </h1>

        {/* Navigation Links */}
        <nav className="flex flex-col text-zinc-400 text-xl gap-3 mt-10">
          <h1 className="text-white font-semibold text-xl mb-5">New Feeds</h1>
          <Link to={"/trending"} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3"><i className="ri-fire-line"></i> Trending </Link>
          <Link to={"/popular"} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3"><i className="ri-bard-fill"></i> Popular </Link>
          <Link to={"/movie"} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3"><i className="ri-movie-2-fill"></i> Movies </Link>
          <Link to={"/tv"} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3"><i className="ri-tv-2-fill"></i> TV Shows </Link>
          <Link to={"/people"} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3"><i className="ri-team-line"></i> People </Link>
        </nav>

        <hr className="my-5 border-zinc-500" />

        <nav className="flex flex-col text-zinc-400 text-xl gap-3">
          <h1 className="text-white font-semibold text-xl mb-5">Website Info</h1>
          <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3"><i className="ri-information-2-fill"></i> About SCSDB </Link>
          <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3"><i className="ri-phone-fill"></i> Contact Us </Link>
        </nav>
      </div>

      {/* Mobile Top Bar (Logo + Search) */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-[#1F1E24] border-b border-zinc-700 flex items-center px-4 py-3 gap-3 z-50">
        {/* Logo */}
        <h1 className="text-lg text-white font-bold flex items-center whitespace-nowrap">
          <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
          <span>SCSDB</span>
        </h1>

        {/* Search Bar */}
        <div className="flex items-center w-full bg-zinc-800/60 hover:bg-zinc-700/70 
                        border border-zinc-700 focus-within:border-[#6556CD]
                        px-3 py-2 rounded-full shadow-md transition duration-300">
          <i className="ri-search-line text-zinc-400 text-lg"></i>
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 w-full bg-transparent text-zinc-200 text-sm outline-none placeholder:text-zinc-500"
          />
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#1F1E24] border-t border-zinc-700 flex justify-around py-3 text-white text-lg z-50">
        <Link to="/trending" className="flex flex-col items-center">
          <i className="ri-fire-line"></i>
          <span className="text-xs">Trending</span>
        </Link>
        <Link to="/popular" className="flex flex-col items-center">
          <i className="ri-bard-fill"></i>
          <span className="text-xs">Popular</span>
        </Link>
        <Link to="/movie" className="flex flex-col items-center">
          <i className="ri-movie-2-fill"></i>
          <span className="text-xs">Movies</span>
        </Link>
        <Link to="/tv" className="flex flex-col items-center">
          <i className="ri-tv-2-fill"></i>
          <span className="text-xs">TV</span>
        </Link>
        <Link to="/people" className="flex flex-col items-center">
          <i className="ri-team-line"></i>
          <span className="text-xs">People</span>
        </Link>

        {/* More Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex flex-col items-center"
          >
            <i className="ri-more-2-fill"></i>
            <span className="text-xs">More</span>
          </button>
          {showMore && (
            <div className="absolute bottom-12 right-0 bg-zinc-800 rounded-lg shadow-lg py-2 w-40">
              <Link className="block px-4 py-2 hover:bg-[#6556CD] rounded">
                About SCSDB
              </Link>
              <Link className="block px-4 py-2 hover:bg-[#6556CD] rounded">
                Contact Us
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
