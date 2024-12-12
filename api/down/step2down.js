import axios from "axios";
import * as cheerio from "cheerio";

async function step2down(link) {
  try {
    const { data: api } = await axios.get("https://steptodown.com/");
    const token = cheerio.load(api)("#token").val();

    const { data } = await axios.post(
      "https://steptodown.com/wp-json/aio-dl/video-data/",
      new URLSearchParams({ url: link, token }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Postify/1.0.0",
        },
      },
    );
    return data;
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
}

export default step2down;
