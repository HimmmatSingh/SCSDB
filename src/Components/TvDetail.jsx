import React, { useEffect } from "react";
import { useParams, useNavigate, Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv } from "../store/actions/tvActions";
import { removetv } from "../store/Reducers/tvSlice";
import Loading from "../utiles/Loading";
import HorizontalCards from "../Components/HorizontalCards";

const TvDetail = () => {
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => dispatch(removetv());
  }, [dispatch, id]);

  if (!info) return <Loading />;

  const title = info.detail.name || "No Name";
  const firstAirDate = info.detail.first_air_date || "N/A";
  const runtime = info.detail.episode_run_time?.[0] || "N/A";
  const imageUrl = info.detail.backdrop_path
    ? `https://image.tmdb.org/t/p/original${info.detail.backdrop_path}`
    : null;
  const posterUrl = info.detail.poster_path
    ? `https://image.tmdb.org/t/p/w300${info.detail.poster_path}`
    : "https://via.placeholder.com/200x300?text=No+Image";

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
      className="relative w-screen min-h-screen px-[10%] py-6 text-white"
    >
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-white bg-[#6556CD] px-4 py-2 rounded-lg hover:bg-[#4c44a6] transition"
      >
        ⬅ Back
      </button>

      {/* Poster + Details */}
      <div className="w-full flex gap-8 mt-6">
        <div className="w-[200px] flex-shrink-0">
          <img src={posterUrl} alt={title} className="w-full h-auto rounded-lg shadow-lg" />
        </div>

        <div className="flex flex-col justify-start">
          <h1 className="text-4xl font-bold">
            {title} <span className="text-gray-400">({new Date(firstAirDate).getFullYear()})</span>
          </h1>

          <p className="text-green-400 mt-2 text-lg">{Math.round(info.detail.vote_average * 10)}% User Score</p>

          {info.detail.tagline && <p className="mt-3 text-zinc-300 italic">{info.detail.tagline}</p>}

          <h2 className="mt-5 text-xl font-semibold">Overview</h2>
          <p className="text-zinc-300">{info.detail.overview}</p>

          <p className="mt-3 text-sm text-zinc-400">{firstAirDate} • {runtime} min</p>

          <p className="text-sm mb-10 text-zinc-400">
            {info.detail.genres?.map((g) => g.name).join(", ") || "N/A"}
          </p>

          {/* Trailer button */}
          <Link
            to={`/tv/details/${id}/trailer`}
            className="w-fit inline-block text-white py-2 px-6 bg-[#6556CD] rounded-lg hover:bg-[#4c44a6] transition"
          >
            <i className="ri-play-fill"></i> WATCH TRAILER
          </Link>
        </div>
      </div>

      {/* Seasons */}
      {info.detail.seasons && info.detail.seasons.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Seasons</h2>
          <div className="flex flex-wrap gap-5">
            {info.detail.seasons.map((season) => (
              <div
                key={season.id}
                className="w-[180px] bg-zinc-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-transform duration-300"
              >
                <img
                  src={
                    season.poster_path
                      ? `https://image.tmdb.org/t/p/w300${season.poster_path}`
                      : "https://via.placeholder.com/180x250?text=No+Image"
                  }
                  alt={season.name}
                  className="w-full h-[250px] object-cover"
                />
                <h3 className="text-white text-center mt-2 px-2">{season.name}</h3>
                <p className="text-gray-400 text-center mb-2">
                  {season.episode_count} Episodes
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <h1 className="mt-10 text-white-200 text-2xl font-semibold">Recommendations</h1>
      <HorizontalCards data={info.recommendations?.length > 0 ? info.recommendations : info.similar || []} />

      <Outlet />
    </div>
  );
};

export default TvDetail;
