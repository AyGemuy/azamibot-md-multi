import agentgpt from "../../api/ai/agentgpt.js";

export const cmd = {
  name: ["agentgpt"],
  command: ["agentgpt"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await agentgpt(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI agentgpt:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
