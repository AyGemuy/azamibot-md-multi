import arting from "../../api/ai/arting.js";

export const cmd = {
  name: ["arting"],
  command: ["arting"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await arting(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI arting:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
