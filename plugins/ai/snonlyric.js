import snonlyric from "../../api/ai/snonlyric.js";

export const cmd = {
  name: ["snonlyric"],
  command: ["snonlyric"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await snonlyric(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI snonlyric:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
