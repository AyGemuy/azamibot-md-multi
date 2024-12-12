import sarastudyimg from "../../api/ai/sara-study-img.js";

export const cmd = {
  name: ["sarastudyimg"],
  command: ["sarastudyimg"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await sarastudyimg(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI sarastudyimg:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
