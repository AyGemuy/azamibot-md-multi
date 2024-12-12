import * as itch from "../../api/info/itch.js";

const { detail, search } = itch;

export const cmd = {
  name: ["itch"],
  command: ["itchdetail", "itchsearch"],
  category: ["info"],
  async start({ m, text, command }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      let output;
      switch (command) {
        case "itchdetail":
          output = await detail(text);
          break;
        case "itchsearch":
          output = await search(text);
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
