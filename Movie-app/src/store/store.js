import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";

const store = configureStore({
  reducer: {
    movieData: movieReducer,
  },
});

export default store;
