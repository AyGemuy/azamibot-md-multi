import fetch from "node-fetch";
async function SkyByte(prompt) {
  const url = "https://chat1.lnf2.skybyte.me/api/chat-process";
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
    Referer: "https://chat1.lnf2.skybyte.me/#/chat/1002",
  };
  const body = JSON.stringify({
    prompt: prompt,
    options: {},
    systemMessage:
      "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.",
    temperature: 0.8,
    top_p: 1,
  });
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    return (await response.text())
      .trim()
      .split("\n")
      .map((msg) => JSON.parse(msg)?.detail.choices[0]?.delta?.content)
      .join("");
  } catch (error) {
    console.error("Error in chatProcess:", error);
    throw error;
  }
}
export default SkyByte;
