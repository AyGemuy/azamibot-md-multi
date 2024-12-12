import savetubetera from "../../api/down/savetube-tera.js";

export const cmd = {
  name: ["savetubetera"],
  command: ["savetubetera"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await savetubetera(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI savetubetera:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
