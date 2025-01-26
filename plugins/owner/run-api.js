import axios from "axios";

let handler = async (m, { text }) => {
  try {
    if (!text) throw `Format penggunaan salah. Gunakan:\n<command> <endpoint> <payload/param>\nContoh:\nrun /ai/jadve prompt=halo\nrun /ai/jadve { "prompt": "halo" }`;

    const spaceIndex = text.indexOf(" ");
    const endpoint = spaceIndex === -1 ? text.trim() : text.slice(0, spaceIndex).trim();
    const payload = spaceIndex === -1 ? "" : text.slice(spaceIndex + 1).trim();
    const url = `https://malik-jmk.us.kg/api${endpoint}`;

    let options = {};

    if (payload) {
      if (payload.startsWith("{")) {
        options = {
          method: "POST",
          url: url,
          headers: {
            "Content-Type": "application/json"
          },
          data: JSON.parse(payload)
        };
      } else {
        options = {
          method: "GET",
          url: url,
          params: Object.fromEntries(new URLSearchParams(payload))
        };
      }
    } else {
      options = {
        method: "GET",
        url: url
      };
    }

    const response = await axios(options);
    const contentType = response.headers["content-type"];
    const data = response.data;

    if (contentType.includes("application/json")) {
      const jsonData = typeof data === "string" ? JSON.parse(data) : data;
      await m.reply(`${JSON.stringify(jsonData, null, 2)}`);
    } else if (contentType.includes("text")) {
      await m.reply(`${data.toString()}`);
    } else if (contentType.includes("image")) {
      await conn.sendFile(m.chat, data, "image.jpg", "Berikut adalah hasil gambar.", m);
    } else if (contentType.includes("audio")) {
      await conn.sendFile(m.chat, data, "audio.mp3", "", m);
    } else if (contentType.includes("video")) {
      await conn.sendFile(m.chat, data, "video.mp4", "", m);
    } else if (contentType.includes("application/pdf")) {
      await conn.sendFile(m.chat, data, "file.pdf", "", m);
    } else {
      await m.reply(data);
    }
  } catch (e) {
    console.error(e);
    await m.reply(`${JSON.stringify(e, null, 2)}`);
  }
};

handler.help = ["run"];
handler.tags = ["tools"];
handler.command = /^run$/i;
handler.premium = false;
handler.limit = false;

export default handler;
