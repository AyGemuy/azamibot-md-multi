import * as youtube from "../../api/down/youtube.js";

const { detail, search, notube, cobalt, quick } = youtube;

export const cmd = {
  name: ["mikasa"],
  command: ["youtubedetail", "youtubesearch", "notube", "cobalt", "quick"],
  category: ["down"],
  async start({ m, text, command }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      let output;
      switch (command) {
        case "youtubedetail":
          output = await detail(text);
          break;
        case "youtubesearch":
          output = await search(text);
          break;
        case "notube":
          output = await notube(text);
          break;
        case "cobalt":
          output = await cobalt(text);
          break;
        case "quick":
          output = await quick(text);
          break;

        default:
          return m.reply("Perintah tidak dikenali.");
      }
      return m.reply(output);
    } catch (error) {
      console.error(`Error pada AI ${command}:`, error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
