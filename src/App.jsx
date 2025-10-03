import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Components/Home';
import Trending from './Components/Trending';
import Popular from './Components/Popular';
import Movie from './Components/Movie';
import Tv from './Components/Tv';
import People from './Components/People';
import MovieDetails from './Components/MovieDetails';
import PersonDetails from './Components/PersonDetail';
import TvDetail from './Components/TvDetail';
import Trailer from './Components/templetes/Trailer';

function App() {
  return (
    <div className="bg-[#1F1E24] w-screen h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />

        {/* Movies */}
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<MovieDetails />} />
        <Route path="/movie/details/:id/trailer" element={<Trailer />} />

        {/* TV */}
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/details/:id" element={<TvDetail />} />

        {/* People */}
        <Route path="/people" element={<People />} />
        <Route path="/people/details/:id" element={<PersonDetails />} />
      </Routes>
    </div>
  );
}

export default App;
