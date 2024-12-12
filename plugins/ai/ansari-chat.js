import ansarichat from "../../api/ai/ansari-chat.js";

export const cmd = {
  name: ["ansarichat"],
  command: ["ansarichat"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await ansarichat(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI ansarichat:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
