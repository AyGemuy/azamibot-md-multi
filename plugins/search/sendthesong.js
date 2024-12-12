import sendthesong from "../../api/search/sendthesong.js";

export const cmd = {
  name: ["sendthesong"],
  command: ["sendthesong"],
  category: ["search"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await sendthesong(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI sendthesong:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
