import React from "react";
import { Link } from "react-router-dom";

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-full px-5 py-8">
      <div className="flex gap-5 overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
        {data.map((d, i) => {
          // Normalize route type
          let routeType = "movie";
          if (d.media_type === "tv") routeType = "tv";
          if (d.media_type === "person") routeType = "people";

          return (
            <Link
              to={`/${routeType}/details/${d.id}`}
              key={i}
              className="min-w-[180px] max-w-[180px] flex-shrink-0 bg-zinc-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <img
                src={
                  d.backdrop_path
                    ? `https://image.tmdb.org/t/p/w300${d.backdrop_path}`
                    : d.poster_path
                    ? `https://image.tmdb.org/t/p/w300${d.poster_path}`
                    : "https://via.placeholder.com/180x250?text=No+Image"
                }
                alt={d.title || d.name || "No Title"}
                className="w-full h-[250px] object-cover"
              />

              <h1 className="text-sm font-semibold text-white mt-3 px-3 truncate">
                {d.title || d.original_name || d.name || d.original_title}
              </h1>

              <p className="text-xs mt-2 mb-3 px-3 text-zinc-400 line-clamp-3">
                {d.overview
                  ? `${d.overview.slice(0, 100)}...`
                  : "No description available."}
                <span className="text-blue-400 cursor-pointer"> more</span>
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalCards;

