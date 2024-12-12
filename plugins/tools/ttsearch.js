import ttsearch from "../../api/tools/ttsearch.js";

export const cmd = {
  name: ["ttsearch"],
  command: ["ttsearch"],
  category: ["tools"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await ttsearch(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI ttsearch:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
