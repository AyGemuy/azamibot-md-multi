import islamandai from "../../api/ai/islamandai.js";

export const cmd = {
  name: ["islamandai"],
  command: ["islamandai"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await islamandai(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI islamandai:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
