import tiktokjs from "../../api/down/tiktok-js.js";

export const cmd = {
  name: ["tiktokjs"],
  command: ["tiktokjs"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");
    try {
      const [a, b] = text.split(" ");
      const output = await tiktokjs(a, b);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI tiktokjs:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
