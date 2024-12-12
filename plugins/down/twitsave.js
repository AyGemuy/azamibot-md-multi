import twitsave from "../../api/down/twitsave.js";

export const cmd = {
  name: ["twitsave"],
  command: ["twitsave"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await twitsave(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI twitsave:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
