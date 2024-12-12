import flydl from "../../api/down/flydl.js";

export const cmd = {
  name: ["flydl"],
  command: ["flydl"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await flydl(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI flydl:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
