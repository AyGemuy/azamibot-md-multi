import terabox from "../../api/down/terabox.js";

export const cmd = {
  name: ["terabox"],
  command: ["terabox"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await terabox(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI terabox:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
