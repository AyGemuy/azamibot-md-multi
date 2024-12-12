import * as aigen from "../../api/ai/ai-gen.js";

const { Svgai, Zmoai, Arthub, Limewire, LumaAi } = aigen;

export const cmd = {
  name: ["mikasa"],
  command: ["svgai", "zmoai", "arthub", "limewire", "lumaai"],
  category: ["ai"],
  async start({ m, text, command }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      let output;
      switch (command) {
        case "svgai":
          output = await Svgai(text);
          break;
        case "zmoai":
          output = await Zmoai(text);
          break;
        case "arthub":
          output = await Arthub(text);
          break;
        case "limewire":
          output = await Limewire(text);
          break;
        case "lumaai":
          output = await LumaAi(text);
          break;
        default:
          return m.reply("Perintah tidak dikenali.");
      }
      return m.reply(output);
    } catch (error) {
      console.error(`Error pada AI ${command}:`, error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
