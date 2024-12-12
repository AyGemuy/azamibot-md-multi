import * as ondoku from "../../api/tools/ondoku.js";

export const cmd = {
  name: ["ondoku"],
  command: ["ondoku"],
  category: ["tools"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await ondoku.textToSpeech(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI ondoku:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
