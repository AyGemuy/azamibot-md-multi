import vestiazeta from "../../api/ai/vestia-zeta.js";

export const cmd = {
  name: ["vestiazeta"],
  command: ["vestiazeta"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await vestiazeta(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI vestiazeta:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
