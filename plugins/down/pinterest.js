import * as pinterest from "../../api/down/pinterest.js";

const { video, image, search } = pinterest;

export const cmd = {
  name: ["mikasa"],
  command: ["pinterestsearch", "pinterestvideo", "pinterestimage"],
  category: ["down"],
  async start({ m, text, command }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      let output;
      switch (command) {
        case "pinterestsearch":
          output = await search(text);
          break;
        case "pinterestvideo":
          output = await video(text);
          break;
        case "pinterestimage":
          output = await image(text);
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
