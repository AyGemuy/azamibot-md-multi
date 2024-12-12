import sinonim from "../../api/info/persamaan-kata.js";

export const cmd = {
  name: ["sinonim"],
  command: ["sinonim"],
  category: ["info"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await sinonim(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI sinonim:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
