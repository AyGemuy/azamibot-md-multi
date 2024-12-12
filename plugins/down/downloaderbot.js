import downloaderbot from "../../api/down/downloaderbot.js";

export const cmd = {
  name: ["downloaderbot"],
  command: ["downloaderbot"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await downloaderbot(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI downloaderbot:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
