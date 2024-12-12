import allyfy from "../../api/ai/allyfy.js";

export const cmd = {
  name: ["allyfy"],
  command: ["allyfy"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await allyfy(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI allyfy:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
