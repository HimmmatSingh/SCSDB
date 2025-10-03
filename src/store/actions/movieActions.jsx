import Axios from "../../utiles/Axios";   // ✅ custom Axios instance
import { loadmovie, removemovie } from "../Reducers/movieSlice";

export { removemovie };

export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await Axios.get(`/movie/${id}`);
    const externalid = await Axios.get(`/movie/${id}/external_ids`);
    const recommendations = await Axios.get(`/movie/${id}/recommendations`);
    const similar = await Axios.get(`/movie/${id}/similar`);
    const videos = await Axios.get(`/movie/${id}/videos`);
    const watchproviders = await Axios.get(`/movie/${id}/watch/providers`);

    let theultimadtedetails = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data,  // ✅ store full object, not just one trailer
      watchproviders: watchproviders.data.results?.IN || null,
    };

    dispatch(loadmovie(theultimadtedetails));
  } catch (error) {
    console.error("❌ Error fetching movie data:", error);
  }
};
