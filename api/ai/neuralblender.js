import fetch from "node-fetch";
const NeuralBlender = async (prompt) => {
  const url =
    "https://nb3corsproxyfunction2.azurewebsites.net/api/corsproxy/render";
  const blends = ["mnemosyne", "nb3"];
  const randomBlend = blends[Math.floor(Math.random() * blends.length)];
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
      Referer: "https://neuralblender.com/create-art",
    },
    body: JSON.stringify({
      prompt: prompt,
      blend: randomBlend,
      num_inference_steps: randomBlend === "nb3" ? 4 : 25,
      guidance_scale: randomBlend === "nb3" ? 3.5 : 7.5,
    }),
  };
  try {
    const response = await fetch(url, options);
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("Error fetching from neuralblender:", error);
    throw error;
  }
};
export default NeuralBlender;
