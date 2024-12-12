import tuneai from "../../api/ai/tuneai.js";

export const cmd = {
  name: ["tuneai"],
  command: ["tuneai"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await tuneai(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI tuneai:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
