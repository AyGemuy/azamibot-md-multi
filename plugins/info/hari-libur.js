import harilibur from "../../api/info/hari-libur.js";

export const cmd = {
  name: ["harilibur"],
  command: ["harilibur"],
  category: ["info"],
  async start({ m }) {
    try {
      const output = await harilibur();
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI harilibur:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
