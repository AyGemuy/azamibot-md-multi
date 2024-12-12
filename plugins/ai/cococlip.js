import cococlip from "../../api/ai/cococlip.js";

export const cmd = {
  name: ["cococlip"],
  command: ["cococlip"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await cococlip(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI cococlip:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
