import fetch from "node-fetch";
const AiArtGenerator = async (
  prompt,
  style = "3D Model",
  model = "sdxl-lightning",
) => {
  try {
    const response = await fetch(
      "https://www.ai-art-generator.net/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user": "",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
          Referer: "https://www.ai-art-generator.net/playground",
        },
        body: JSON.stringify({
          prompt: prompt,
          style: style,
          model: model,
        }),
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text();
    const jsonData = JSON.parse(data);
    return jsonData.images;
  } catch (error) {
    console.error("Error in AiArtGenerator:", error);
    return null;
  }
};
export default AiArtGenerator;
