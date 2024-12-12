import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { FormData } from "formdata-node";
const meki = [
  "Hyper-Surreal Escape",
  "Neon Fauvism",
  "Post-Analog Glitchscape",
  "AI Dystopia",
  "Vivid Pop Explosion",
];
const FluxImage = async (
  prompt,
  styleIndex = Math.floor(Math.random() * meki.length),
) => {
  try {
    const formData = new FormData();
    formData.append("field-0", prompt);
    formData.append("field-1", meki[styleIndex - 1]);
    const response = await fetch("https://devrel.app.n8n.cloud/form/flux", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "*/*",
        "User-Agent": "Postify/1.0.0",
      },
    });
    const data = await response.text();
    const $ = cheerio.load(data);
    return {
      image: $(".image-container img").attr("src"),
      style: $(".style-text").text().replace("Style: ", ""),
    };
  } catch (error) {
    throw error;
  }
};
export default FluxImage;
