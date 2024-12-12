import controllino from "../../api/ai/controllino.js";

export const cmd = {
  name: ["controllino"],
  command: ["controllino"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await controllino(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI controllino:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
