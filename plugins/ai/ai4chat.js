import ai4chat from "../../api/ai/ai4chat.js";

export const cmd = {
  name: ["ai4chat"],
  command: ["ai4chat"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await ai4chat(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI ai4chat:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
