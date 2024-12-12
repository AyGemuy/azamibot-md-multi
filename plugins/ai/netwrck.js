import netwrck from "../../api/ai/netwrck.js";

export const cmd = {
  name: ["netwrck"],
  command: ["netwrck"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await netwrck(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI netwrck:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
