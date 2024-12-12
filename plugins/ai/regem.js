import * as regem from "../../api/ai/regem.js";

const { flux, writer, rephrase } = regem;

export const cmd = {
  name: ["mikasa"],
  command: ["regemflux", "regemwriter", "regemrephrase"],
  category: ["ai"],
  async start({ m, text, command }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      let output;
      switch (command) {
        case "regemflux":
          output = await flux(text);
          break;
        case "regemwriter":
          output = await writer(text);
          break;
        case "regemrephrase":
          output = await rephrase(text);
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
