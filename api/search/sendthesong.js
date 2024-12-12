import axios from "axios";

const headers = {
  authority: "api.sendthesong.xyz",
  accept: "*/*",
  origin: "https://sendthesong.xyz",
  referer: "https://sendthesong.xyz/",
  "user-agent": "Postify/1.0.0",
};

async function sendTheSong(name, page = 1, limit = 15) {
  const params = { q: name, page, limit };
  try {
    const response = await axios.get("https://api.sendthesong.xyz/api/posts", {
      params,
      headers: headers,
    });
    const { status, message, data, total, page, limit, offset } = response.data;
    const result = data.map((item) => ({
      id: item._id,
      recipient: item.recipient,
      message: item.message,
      songName: item.song_name,
      songArtist: item.song_artist,
      songImage: item.song_image,
    }));
    return {
      status,
      message,
      data: result,
      total,
      page,
      limit,
      offset,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default sendTheSong;
