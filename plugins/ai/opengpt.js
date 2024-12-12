import opengpt from "../../api/ai/opengpt.js";

export const cmd = {
  name: ["opengpt"],
  command: ["opengpt"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await opengpt(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI opengpt:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
