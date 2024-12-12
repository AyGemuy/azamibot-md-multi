import khodam from "../../api/ai/khodam.js";

export const cmd = {
  name: ["khodam"],
  command: ["khodam"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await khodam(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI khodam:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
