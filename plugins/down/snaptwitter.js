import snaptwitter from "../../api/down/snaptwitter.js";

export const cmd = {
  name: ["snaptwitter"],
  command: ["snaptwitter"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await snaptwitter(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI snaptwitter:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
