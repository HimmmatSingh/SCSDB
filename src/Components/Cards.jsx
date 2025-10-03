import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, title }) => {
  return (
    <div className="w-full mt-5">
      <h2 className="text-lg md:text-xl font-semibold text-white mb-4 capitalize">
        {title} Results
      </h2>

      {/* Responsive Grid */}
      <div
        className="
          grid 
          grid-cols-2   /* Mobile: 2 cards per row */
          sm:grid-cols-3 /* Small tablets: 3 */
          md:grid-cols-4 /* Tablets: 4 */
          lg:grid-cols-5 /* Desktop: 5 */
          xl:grid-cols-6 /* Large desktop: 6 */
          gap-3 sm:gap-4 md:gap-5 /* spacing adjusts */
        "
      >
        {data.map((item, i) => {
          const imageUrl = item.poster_path
            ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
            : item.profile_path
            ? `https://image.tmdb.org/t/p/w300${item.profile_path}`
            : null;

          return (
            <Link
              to={`/${item.media_type || "movie"}/details/${item.id}`}
              key={item.id || i}
              className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 duration-300 shadow-lg"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={item.title || item.name || "No Title"}
                  className="w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover"
                />
              ) : (
                <div className="w-full h-[220px] sm:h-[260px] md:h-[300px] bg-zinc-800 flex items-center justify-center">
                  <i className="ri-image-2-line text-white text-3xl"></i>
                </div>
              )}
              <div className="p-2 sm:p-3">
                <h3 className="text-white text-sm sm:text-base font-medium truncate">
                  {item.title || item.name}
                </h3>
                {(item.release_date || item.first_air_date) && (
                  <p className="text-zinc-400 text-xs mt-1">
                    {item.release_date?.slice(0, 4) ||
                      item.first_air_date?.slice(0, 4)}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
