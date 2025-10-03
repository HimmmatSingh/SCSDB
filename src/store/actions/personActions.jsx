import Axios from "../../utiles/Axios";
import { loadperson, removeperson } from "../Reducers/personSlice";

export { removeperson };

export const asyncloadperson = (id) => async (dispatch) => {
  try {
    const detail = await Axios.get(`/person/${id}`);
    const externalid = await Axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await Axios.get(`/person/${id}/combined_credits`);
    const images = await Axios.get(`/person/${id}/images`);

    let theUltimatePersonDetails = {
      detail: detail.data,
      externalid: externalid.data,
      combinedCredits: combinedCredits.data,
      images: images.data.profiles,
    };

    dispatch(loadperson(theUltimatePersonDetails));

    // console.log("✅ Person Data:", theUltimatePersonDetails);
  } catch (error) {
    console.error("❌ Error fetching person data:", error);
  }
};
