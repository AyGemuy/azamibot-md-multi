import axios from "axios";
let handler = async (m, {
  conn,
  usedPrefix,
  text,
  args
}) => {
  if (!text) return conn.reply(m.chat, `Penggunaan:\n${usedPrefix}runapi <path> [key=value ...] [--body <json>]`, m);
  let path = args[0];
  if (!path) return conn.reply(m.chat, `Penggunaan:\n${usedPrefix}runapi <path> [key=value ...] [--body <json>]`, m);
  let queryParams = {};
  let body = null;
  let bodyIndex = args.findIndex(arg => arg === "--body");
  if (bodyIndex !== -1) {
    for (let i = 1; i < bodyIndex; i++) {
      const [key, value] = args[i].split("=");
      if (key && value) queryParams[key] = value;
    }
    let bodyText = args.slice(bodyIndex + 1).join(" ");
    try {
      body = JSON.parse(bodyText);
    } catch (error) {
      return conn.reply(m.chat, `Format JSON body tidak valid: ${error}`, m);
    }
  } else {
    for (let i = 1; i < args.length; i++) {
      const [key, value] = args[i].split("=");
      if (key && value) queryParams[key] = value;
    }
  }
  conn.reply(m.chat, "Sedang memproses...", m);
  try {
    const apiUrl = API("wudysoft", `/api${path}`, queryParams);
    if (!apiUrl) return conn.reply(m.chat, "Gagal membuat URL API.", m);
    let response;
    let method = "get";
    if (body) {
      method = (body.method || "post").toLowerCase();
      if (body.method) delete body.method;
      if (["get", "post", "put", "delete", "patch"].includes(method)) {
        response = await axios[method](apiUrl, body);
      } else {
        response = await axios.post(apiUrl, body);
      }
    } else {
      response = await axios.get(apiUrl);
    }
    if (response && response.data) {
      const contentType = response.headers["content-type"];
      const options = {
        quoted: m
      };
      if (contentType?.startsWith("image")) {
        conn.sendImage(m.chat, {
          url: apiUrl
        }, "", "", m);
      } else if (contentType?.startsWith("video")) {
        conn.sendVideo(m.chat, {
          url: apiUrl
        }, "", "", m);
      } else if (contentType?.startsWith("audio")) {
        conn.sendAudio(m.chat, {
          url: apiUrl
        }, false, {
          quoted: m
        });
      } else if (contentType === "application/pdf") {
        const pdfBuffer = Buffer.from(response.data, "binary");
        conn.sendDocument(m.chat, pdfBuffer, "document.pdf", "", m);
      } else if (typeof response.data === "object") {
        const jsonString = JSON.stringify(response.data, null, 2);
        conn.reply(m.chat, `\`\`\`${jsonString}\`\`\``, m);
      } else {
        conn.reply(m.chat, response.data, m);
      }
    } else {
      conn.reply(m.chat, "Tidak ada data yang diterima dari API.", m);
    }
  } catch (error) {
    console.error(error);
    let errorMessage = error.response?.data ? `\`\`\`${JSON.stringify(error.response.data, null, 2)}\`\`\`` : `\`\`\`${error.message || error}\`\`\``;
    conn.reply(m.chat, `Terjadi kesalahan:\n\n${errorMessage}`, m);
  }
};
handler.help = ["runapi <path> [key=value ...] [--body <json>]"];
handler.tags = ["owner"];
handler.command = /^(runapi)$/i;
handler.owner = true;
export default handler;