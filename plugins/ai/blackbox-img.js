import blackboximg from "../../api/ai/blackbox-img.js";

export const cmd = {
  name: ["blackboximg"],
  command: ["blackboximg"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await blackboximg(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI blackboximg:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
