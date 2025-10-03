import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  if (!data) return null;

  const imageUrl = data.backdrop_path
    ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
    : data.poster_path
    ? `https://image.tmdb.org/t/p/original${data.poster_path}`
    : null;

  return (
    <div
    style={{
  backgroundImage: imageUrl
    ? `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.9)), url(${imageUrl})`
    : "linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.9))",
  backgroundSize: "cover",
  backgroundPosition: "center ",  
  backgroundRepeat: "no-repeat",
}}
className="w-full h-[60vh] flex flex-col justify-center items-start p-[5%] text-white"

    >
      {/* Title */}
      <h1 className="w-[60%] text-5xl font-extrabold drop-shadow-lg">
        {data.title || data.name}
      </h1>

      {/* Description */}
      <p className="w-[60%] mt-4 text-lg text-zinc-200 leading-relaxed drop-shadow-md">
        {data.overview
          ? `${data.overview.slice(0, 200)}...`
          : "No description available."}
        <Link  to={`${data.media_type}/details/${data.id}`}  className="text-blue-400 ml-2">more</Link>
      </p>

      {/* Extra Info */}
      <p className="mt-3 text-sm text-zinc-300 flex items-center gap-5">
        <span>
          <i className="ri-dvd-fill text-yellow-500"></i>{" "}
          {data.release_date || "No Information"}
        </span>
        <span>
          <i className="ri-album-fill text-yellow-500"></i>{" "}
          {data.media_type ? data.media_type.toUpperCase() : "UNKNOWN"}
        </span>
      </p>

      {/* CTA Button */}
      <Link className="mt-6 bg-[#6556CD] px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#4e44a5] transition duration-300 w-fit shadow-lg">
        ▶ Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
