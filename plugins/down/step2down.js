import step2down from "../../api/down/step2down.js";

export const cmd = {
  name: ["step2down"],
  command: ["step2down"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await step2down(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI step2down:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
