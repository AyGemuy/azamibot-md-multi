import darkai from "../../api/ai/darkai.js";

export const cmd = {
  name: ["darkai"],
  command: ["darkai"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await darkai(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI darkai:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
