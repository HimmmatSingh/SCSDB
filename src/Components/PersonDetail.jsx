import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson } from "../store/actions/personActions";
import { removeperson } from "../store/Reducers/personSlice";
import Loading from "../utiles/Loading";
import HorizontalCards from "./HorizontalCards";

const PersonDetail = () => {
  const { info } = useSelector((state) => state.person);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [dispatch, id]);

  if (!info) return <Loading />;

  const profileUrl = info.detail.profile_path
    ? `https://image.tmdb.org/t/p/w300${info.detail.profile_path}`
    : "https://via.placeholder.com/200x300?text=No+Image";

  return (
    <div className="w-screen min-h-screen bg-zinc-900 text-white px-4 sm:px-6 md:px-[10%] py-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="text-white bg-[#6556CD] px-3 py-2 rounded-md hover:bg-[#4c44a6] transition text-sm sm:text-base"
      >
        ⬅ Back
      </button>

      {/* Person Header */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 mt-6">
        {/* Profile Image */}
        <div className="w-full md:w-[250px] flex-shrink-0">
          <img
            src={profileUrl}
            alt={info.detail.name}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {info.detail.name}
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            {info.detail.known_for_department}
          </p>

          <h2 className="mt-5 text-lg sm:text-xl font-semibold">Biography</h2>
          <p className="text-zinc-300 mt-2 whitespace-pre-line text-sm sm:text-base leading-relaxed">
            {info.detail.biography || "No biography available."}
          </p>

          <p className="mt-5 text-xs sm:text-sm text-gray-400">
            Born: {info.detail.birthday || "N/A"}{" "}
            {info.detail.place_of_birth && `in ${info.detail.place_of_birth}`}
          </p>
          {info.detail.deathday && (
            <p className="text-xs sm:text-sm text-gray-400">
              Died: {info.detail.deathday}
            </p>
          )}
        </div>
      </div>

      {/* Images */}
      {info.images && info.images.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Photos</h2>
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2">
            {info.images.map((img, i) => (
              <img
                key={i}
                src={`https://image.tmdb.org/t/p/w300${img.file_path}`}
                alt="Person"
                className="rounded-lg shadow-lg h-[200px] sm:h-[250px] md:h-[300px] object-cover flex-shrink-0"
              />
            ))}
          </div>
        </div>
      )}

      {/* Filmography */}
      <div className="mt-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Filmography</h2>
        <HorizontalCards data={info.combinedCredits.cast || []} />
      </div>
    </div>
  );
};

export default PersonDetail;
