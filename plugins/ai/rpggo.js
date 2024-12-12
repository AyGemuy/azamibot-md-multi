import rpggo from "../../api/ai/rpggo.js";

export const cmd = {
  name: ["rpggo"],
  command: ["rpggo"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await rpggo(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI rpggo:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
