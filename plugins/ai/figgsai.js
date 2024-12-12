import figgsai from "../../api/ai/figgsai.js";

export const cmd = {
  name: ["figgsai"],
  command: ["figgsai"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await figgsai(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI figgsai:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
