import fetch from "node-fetch";
import crypto from "crypto";
const API_BASE = [
  "https://api.closeai-proxy.xyz",
  "https://api.openai-proxy.live",
];
const API_KEY = "sk-zaTFbMjIUsKv23JlrhbyYdJG6A9gNOK2G713GvoZ0TBRkfI3";
const MODEL_3_5 = "gpt-3.5-turbo";
const MODEL_4 = "gpt-4";
const closeai = async (model, messages, useSecondAPI = false) => {
  const url = useSecondAPI ? API_BASE[1] : API_BASE[0];
  try {
    const response = await fetch(`${url}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: model,
        stream: true,
        temperature: 0,
        top_p: 0,
        messages: messages,
      }),
    });
    const decodedData = await response.text();
    return decodedData
      .split("\n")
      .filter((line) => "" !== line.trim())
      .map((line) => line.replace("data: ", ""))
      .slice(0, -1)
      .map((item) => JSON.parse(item))
      .map((v) => v.choices[0]?.delta.content)
      .join("");
  } catch (error) {
    throw new Error("Fetch completion failed: " + error.message);
  }
};
export default closeai;
