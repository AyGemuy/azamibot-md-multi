import doods from "../../api/down/doods.js";

export const cmd = {
  name: ["doods"],
  command: ["doods"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await doods(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI doods:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
