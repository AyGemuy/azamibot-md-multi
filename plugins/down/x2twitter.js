import x2twitter from "../../api/down/x2twitter.js";

export const cmd = {
  name: ["x2twitter"],
  command: ["x2twitter"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await x2twitter(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI x2twitter:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
