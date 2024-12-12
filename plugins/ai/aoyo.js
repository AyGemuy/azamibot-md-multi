import aoyo from "../../api/ai/aoyo.js";

export const cmd = {
  name: ["aoyo"],
  command: ["aoyo"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await aoyo(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI aoyo:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
