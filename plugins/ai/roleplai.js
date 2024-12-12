import roleplai from "../../api/ai/roleplai.js";

export const cmd = {
  name: ["roleplai"],
  command: ["roleplai"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await roleplai(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI roleplai:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
