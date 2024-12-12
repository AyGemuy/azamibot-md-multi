import aiodown from "../../api/down/aiodown.js";

export const cmd = {
  name: ["aiodown"],
  command: ["aiodown"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await aiodown(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI aiodown:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
