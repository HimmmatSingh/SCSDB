import { configureStore } from "@reduxjs/toolkit";

import tvReducer from "./Reducers/tvSlice";
import movieReducer from "./Reducers/movieSlice";
import personReducer from "./Reducers/personSlice";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    person: personReducer,
  },
});
