import blackbox from "../../api/ai/blackbox.js";

export const cmd = {
  name: ["blackbox"],
  command: ["blackbox"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await blackbox(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI blackbox:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
