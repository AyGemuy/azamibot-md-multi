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
  let bodyIndex = args.indexOf("--body");
  if (bodyIndex > 1) {
    for (let i = 1; i < bodyIndex; i++) {
      const [key, value] = args[i].split("=");
      if (key && value) queryParams[key] = value;
    }
    try {
      body = JSON.parse(args.slice(bodyIndex + 1).join(" "));
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
    if (body) {
      const method = (body.method || "post").toLowerCase();
      delete body.method;
      response = await axios[method](apiUrl, body);
    } else {
      response = await axios.get(apiUrl);
    }
    if (response.data) conn.reply(m.chat, `\`\`\`${JSON.stringify(response.data, null, 2)}\`\`\``, m);
    else conn.reply(m.chat, "Tidak ada data diterima.", m);
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `Terjadi kesalahan:\n\n\`\`\`${error}\`\`\``, m);
  }
};
handler.help = ["runapi <path> [key=value ...] [--body <json>]"];
handler.tags = ["owner"];
handler.command = /^(runapi)$/i;
handler.owner = true;
export default handler;