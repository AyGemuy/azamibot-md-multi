import axios from "axios";
async function describe(logo) {
  try {
    const response = await axios.get(
      "https://www.api.vyturex.com/describe?url=" + encodeURIComponent(logo),
    );
    return response.data;
  } catch (error) {
    return console.error("Error fetching data:", error), null;
  }
}
export default describe;
