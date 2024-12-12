import tikvid from "../../api/down/tikvid.js";

export const cmd = {
  name: ["tikvid"],
  command: ["tikvid"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await tikvid(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI tikvid:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
