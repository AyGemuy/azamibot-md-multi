import photai from "../../api/ai/photai.js";

export const cmd = {
  name: ["photai"],
  command: ["photai"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await photai(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI photai:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
