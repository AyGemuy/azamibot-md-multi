import fbdown from "../../api/down/fbdown.js";

export const cmd = {
  name: ["fbdown"],
  command: ["fbdown"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await fbdown(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI fbdown:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
