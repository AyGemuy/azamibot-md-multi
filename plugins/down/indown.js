import indown from "../../api/down/indown.js";

export const cmd = {
  name: ["indown"],
  command: ["indown"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await indown(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI indown:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
