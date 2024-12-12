import reelsavetera from "../../api/down/reelsave-tera.js";

export const cmd = {
  name: ["reelsavetera"],
  command: ["reelsavetera"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await reelsavetera(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI reelsavetera:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
