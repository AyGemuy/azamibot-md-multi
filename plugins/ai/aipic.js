import * as aipic from "../../api/ai/aipic.js";

const {
  AiFlux,
  ProdiaGen,
  Flux1ai,
  Aquarelle,
  FluxPro,
  Aipic,
  Animagine,
  Gen,
  Prodia,
  Tensor,
} = aipic;

export const cmd = {
  name: ["mikasa"],
  command: [
    "aiflux",
    "prodiagen",
    "flux1ai",
    "aquarelle",
    "fluxpro",
    "aipic",
    "animagine",
    "gen",
    "prodia",
    "tensor",
  ],
  category: ["ai"],
  async start({ m, text, command }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      let output;
      switch (command) {
        case "aiflux":
          output = await AiFlux(text);
          break;
        case "prodiagen":
          output = await ProdiaGen(text);
          break;
        case "flux1ai":
          output = await Flux1ai(text);
          break;
        case "aquarelle":
          output = await Aquarelle(text);
          break;
        case "fluxpro":
          output = await FluxPro(text);
          break;
        case "aipic":
          output = await Aipic(text);
          break;
        case "animagine":
          output = await Animagine(text);
          break;
        case "gen":
          output = await Gen(text);
          break;
        case "prodia":
          output = await Prodia(text);
          break;
        case "tensor":
          output = await Tensor(text);
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
