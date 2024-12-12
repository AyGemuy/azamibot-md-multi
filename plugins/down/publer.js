import publer from "../../api/down/publer.js";

export const cmd = {
  name: ["publer"],
  command: ["publer"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await publer(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI publer:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
