import * as donghua from "../../api/down/donghua.js";

const { detail, search, stream } = donghua;

export const cmd = {
  name: ["mikasa"],
  command: ["animebatcsearch", "donghuadetail", "donghuastream"],
  category: ["down"],
  async start({ m, text, command }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      let output;
      switch (command) {
        case "donghuasearch":
          output = await search(text);
          break;
        case "donghuadetail":
          output = await detail(text);
          break;
        case "donghuastream":
          output = await stream(text);
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
