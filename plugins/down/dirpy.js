import dirpy from "../../api/down/dirpy.js";

export const cmd = {
  name: ["dirpy"],
  command: ["dirpy"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await dirpy(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI dirpy:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
