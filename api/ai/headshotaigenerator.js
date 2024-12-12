import fetch from "node-fetch";
const HeadshotAiGenerator = async (prompt) => {
  try {
    const response = await fetch("https://headshotaigenerator.com/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
        Referer:
          "https://headshotaigenerator.com/?ref=taaft&utm_source=taaft&utm_medium=referral",
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("Error in HeadshotAiGenerator:", error);
    return null;
  }
};
export default HeadshotAiGenerator;
