import ddownr from "../../api/down/ddownr.js";

export const cmd = {
  name: ["ddownr"],
  command: ["ddownr"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await ddownr(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI ddownr:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
