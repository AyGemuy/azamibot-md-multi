import cuaca from "../../api/info/cuaca.js";

export const cmd = {
  name: ["cuaca"],
  command: ["cuaca"],
  category: ["info"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await cuaca(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI cuaca:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
