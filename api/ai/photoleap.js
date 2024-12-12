import axios from "axios";
async function textToImage(text) {
  try {
    const { data } = await axios.get(
      "https://tti.photoleapapp.com/api/v1/generate?prompt=" + text,
    );
    return data;
  } catch (err) {
    return null;
  }
}
export default textToImage;
