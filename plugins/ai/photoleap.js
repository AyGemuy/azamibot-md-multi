import photoleap from "../../api/ai/photoleap.js";

export const cmd = {
  name: ["photoleap"],
  command: ["photoleap"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await photoleap(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI photoleap:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
