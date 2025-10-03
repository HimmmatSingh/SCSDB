import Axios from "../../utiles/Axios"; // your Axios instance
import { loadtv, removetv } from "../Reducers/tvSlice";

export { removetv };

export const asyncloadtv = (id) => async (dispatch) => {
  if (!id) return;

  try {
    const detail = await Axios.get(`/tv/${id}`);
    const externalid = await Axios.get(`/tv/${id}/external_ids`);
    const recommendations = await Axios.get(`/tv/${id}/recommendations`);
    const similar = await Axios.get(`/tv/${id}/similar`);
    const videos = await Axios.get(`/tv/${id}/videos`);
    const watchproviders = await Axios.get(`/tv/${id}/watch/providers`);

    const tvData = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results || [],
      similar: similar.data.results || [],
      videos: videos.data.results || [],
      watchproviders: watchproviders.data.results || {},
    };

    dispatch(loadtv(tvData));
  } catch (error) {
    console.error("❌ Error fetching TV data:", error);
  }
};
