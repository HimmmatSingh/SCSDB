import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import TopNav from "./templetes/TopNav";
import Loading from "../utiles/Loading";

const People = () => {
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const GetPeople = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/person/popular?api_key=2a9337ca88d4c1727b65a3eabff258cb&page=${page}`
      );
      if (res.data.results && res.data.results.length > 0) {
        setPeople((prev) => [...prev, ...res.data.results]);
      }
    } catch (error) {
      console.error("Error fetching people:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    GetPeople();
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

  return people.length > 0 ? (
    <div className="px-[3%] w-screen min-h-screen overflow-hidden overflow-y-auto bg-black">
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between sticky top-0 bg-black z-50 py-3 gap-3">
        <h1 className="text-xl md:text-2xl font-bold text-zinc-400 flex items-center gap-2">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] cursor-pointer ri-arrow-left-line"
          ></i>
          Popular People
        </h1>

        <div className="w-full md:w-auto">
          <TopNav />
        </div>
      </div>

      {/* People Grid */}
      <div
        className="
          grid
          grid-cols-2      /* Mobile: 2 cards */
          sm:grid-cols-3   /* Small tablet: 3 */
          md:grid-cols-4   /* Tablet: 4 */
          lg:grid-cols-6   /* Desktop: 6 */
          xl:grid-cols-7   /* Big screen: 7 */
          gap-4 sm:gap-5 md:gap-6
          p-3 sm:p-5
        "
      >
        {people.map((p, i) => (
          <Link
            key={i}
            to={`/people/details/${p.id}`} // ✅ navigate to details
            className="bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <img
              src={
                p.profile_path
                  ? `https://image.tmdb.org/t/p/w300${p.profile_path}`
                  : "https://via.placeholder.com/150x200?text=No+Image"
              }
              alt={p.name}
              className="w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover"
            />
            <div className="p-2">
              <h1 className="text-sm sm:text-base font-semibold text-white truncate">
                {p.name}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400">
                {p.known_for_department || "Actor"}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Loading Spinner */}
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

export default People;
