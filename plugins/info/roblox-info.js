import robloxinfo from "../../api/info/roblox-info.js";

export const cmd = {
  name: ["robloxinfo"],
  command: ["robloxinfo"],
  category: ["info"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await robloxinfo(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI robloxinfo:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
