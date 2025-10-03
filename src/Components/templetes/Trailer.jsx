import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

const Trailer = () => {
  const { id } = useParams(); // movie id
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.movie);

  if (!info || !info.videos) {
    return <p className="text-white text-center mt-10">No trailer available.</p>;
   
  }

  // pick the official trailer or fallback to first video
  const trailer =
    info.videos.results?.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    ) || info.videos.results?.[0];

  if (!trailer) {
    return <p className="text-white text-center mt-10">No trailer available.</p>;
  }

  return (
    <div className="w-screen min-h-screen bg-black flex flex-col items-center justify-center">
      {/* Back button */}
      <button
        onClick={() => navigate(`/movie/details/${id}`)}
        className="absolute top-6 left-6 text-white bg-[#6556CD] px-4 py-2 rounded-lg hover:bg-[#4c44a6] transition"
      >
        ⬅ Back to Details
      </button>

      {/* Trailer player */}
      <div className="w-full max-w-4xl aspect-video">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailer.key}`}
          controls
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default Trailer;
