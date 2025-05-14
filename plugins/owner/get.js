import axios from "axios";
let handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  try {
    if (!text) return conn.reply(m.chat, `Penggunaan: ${usedPrefix}${command} <url> [params/body]`, m);
    const [url, extra] = text.split(" ", 2);
    if (!url) return conn.reply(m.chat, `Penggunaan: ${usedPrefix}${command} <url> [params/body]`, m);
    const validUrl = url.startsWith("http://") || url.startsWith("https://") ? url : "http://" + url;
    conn.reply(m.chat, "Sedang memproses...", m);
    try {
      const headResponse = await axios.head(validUrl);
      const contentType = headResponse.headers["content-type"];
      const options = {
        quoted: m
      };
      if (contentType?.startsWith("image")) {
        conn.sendMsg(m.chat, {
          image: {
            url: validUrl
          }
        }, options);
      } else if (contentType?.startsWith("video")) {
        conn.sendMsg(m.chat, {
          video: {
            url: validUrl
          },
          mimetype: contentType
        }, options);
      } else if (contentType?.startsWith("audio")) {
        conn.sendMsg(m.chat, {
          audio: {
            url: validUrl
          },
          mimetype: contentType
        }, {
          ...options,
          ptt: false
        });
      } else if (contentType === "application/pdf") {
        const response = await axios.get(validUrl, {
          responseType: "arraybuffer"
        });
        const buffer = Buffer.from(response.data, "binary");
        conn.sendMsg(m.chat, {
          document: buffer,
          mimetype: "application/pdf",
          fileName: "document.pdf"
        }, options);
      } else if (contentType?.startsWith("application/json")) {
        const response = await axios.get(validUrl);
        conn.reply(m.chat, JSON.stringify(response.data, null, 2), m);
      } else {
        try {
          const response = await axios.get(validUrl, {
            responseType: "text"
          });
          conn.reply(m.chat, response.data, m);
        } catch (error) {
          console.error("Gagal mengambil sebagai teks:", error);
          const response = await axios[command === "get" ? "get" : "post"](validUrl, command === "get" ? {
            params: extra ? JSON.parse(extra) : {}
          } : extra ? JSON.parse(extra) : {}, {
            responseType: "arraybuffer"
          });
          const buffer = Buffer.from(response.data, "binary");
          let filename = "document.bin";
          let mimetype = "application/octet-stream";
          const contentDisposition = response.headers["content-disposition"];
          if (contentDisposition?.includes("filename=")) {
            const filenameMatch = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
            filename = filenameMatch?.[1]?.replace(/['"]/g, "") || filename;
          }
          const extension = contentType?.includes("/") ? `.${contentType.split("/")[1]}` : "";
          filename = !filename.includes(".") && extension ? filename + extension : filename;
          conn.sendMsg(m.chat, {
            document: buffer,
            mimetype: mimetype,
            fileName: filename
          }, options);
        }
      }
    } catch (error) {
      console.error("Error saat melakukan permintaan:", error);
      conn.reply(m.chat, `Gagal mengambil atau mengirim konten.\n\n${error}`, m);
    }
  } catch (error) {
    console.error("Error utama:", error);
    conn.reply(m.chat, `Maaf, terjadi kesalahan saat memproses permintaan.\n\n${error}`, m);
  }
};
handler.help = ["get <url> [params (json)]", "fetch <url> [body (json)]"];
handler.tags = ["owner"];
handler.command = /^(get|fetch)$/i;
handler.limit = true;
export default handler;