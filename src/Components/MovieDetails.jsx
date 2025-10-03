import React, { useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie } from "../store/actions/movieActions";
import { removemovie } from "../store/Reducers/movieSlice";
import Loading from "../utiles/Loading";
import { Outlet } from "react-router-dom";
import HorizontalCards from "../Components/HorizontalCards";

const MovieDetails = () => {
  const { info } = useSelector((state) => state.movie);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [dispatch, id]);

  if (!info) return <Loading />;

  // Image URLs
  const imageUrl = info.detail.backdrop_path
    ? `https://image.tmdb.org/t/p/original${info.detail.backdrop_path}`
    : null;

  const posterUrl = info.detail.poster_path
    ? `https://image.tmdb.org/t/p/w300${info.detail.poster_path}`
    : "https://via.placeholder.com/200x300?text=No+Image";

  // Watch providers fallback: IN -> US -> first available
  const results = info.watchproviders?.results || {};
  const providers =
    results.IN ?? results.US ?? Object.values(results)[0] ?? null;

  return (
    <div
      style={{
        backgroundImage: imageUrl
          ? `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.9)), url(${imageUrl})`
          : "linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.9))",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen min-h-screen px-[5%] sm:px-[8%] py-6 text-white"
    >
      {/* Navigation */}
      <nav className="w-full text-zinc-400 flex gap-4 items-center py-4 text-lg">
        <button
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] cursor-pointer ri-arrow-left-line text-xl"
        />
        {info.detail.homepage && (
          <a href={info.detail.homepage} target="_blank" rel="noreferrer">
            <i className="ri-external-link-line"></i>
          </a>
        )}
        {info.externalid.imdb_id && (
          <a
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-yellow-400"
          >
            IMDb
          </a>
        )}
      </nav>

      {/* Poster + Details */}
      <div className="w-full flex flex-col md:flex-row gap-6 mt-6">
        {/* Poster */}
        <div className="w-full md:w-[220px] lg:w-[250px] flex-shrink-0 mx-auto md:mx-0">
          <img
            src={posterUrl}
            alt={info.detail.title || "No Title"}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-start w-full">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            {info.detail.title}{" "}
            <span className="text-gray-400 text-lg sm:text-xl">
              ({new Date(info.detail.release_date).getFullYear()})
            </span>
          </h1>

          <p className="text-green-400 mt-2 text-base sm:text-lg">
            {Math.round(info.detail.vote_average * 10)}% User Score
          </p>

          <p className="mt-3 text-zinc-300 italic text-sm sm:text-base">
            {info.detail.tagline}
          </p>

          <h2 className="mt-5 text-lg sm:text-xl font-semibold">Overview</h2>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            {info.detail.overview}
          </p>

          <p className="mt-3 text-xs sm:text-sm text-zinc-400">
            {info.detail.release_date} • {info.detail.runtime} min
          </p>
          <p className="text-xs sm:text-sm mb-6 text-zinc-400">
            {info.detail.genres.map((g) => g.name).join(", ")}
          </p>

          {/* Trailer button */}
          <Link
            to={`${pathname}/trailer`}
            className="w-fit inline-block text-white py-2 px-4 sm:px-6 bg-[#6556CD] rounded-lg hover:bg-[#4c44a6] transition text-sm sm:text-base"
          >
            <i className="ri-play-fill"></i> WATCH TRAILER
          </Link>
        </div>
      </div>

      {/* Recommendations */}
      <h1 className="mt-10 text-xl sm:text-2xl font-semibold text-white">
        Recommendations
      </h1>

      <HorizontalCards
        data={
          info.recommendations?.length > 0
            ? info.recommendations
            : info.similar || []
        }
      />

      <Outlet />
    </div>
  );
};

export default MovieDetails;
