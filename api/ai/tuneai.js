import fetch from "node-fetch";
import fs from "fs";
const url = "https://chat.tune.app/api/chat/completions";
const headers = {
  Authorization: "tune-b4042fc3-b3ae-4b05-a24e-b26dc3b2c0241708053579",
  "Content-Type": "application/json",
};
const allowedModels = [
  "tune-blob",
  "llama-3.1-8b-instruct",
  "tune-mythomax-l2-13b",
  "llama-3.1-70b-instruct",
  "Meta-Llama-3-70B-Instruct",
  "mistral-large-2",
  "llama-3.1-405b-instruct",
  "mixtral-8x7b-inst-v0-1-32k",
  "tune-wizardlm-2-8x22b",
  "openrouter-goliath-120b-4k",
  "tune-gpt-4o",
  "tune-gpt-4o-mini",
  "yi-large-function-calling",
  "hermes-3-llama-3.1-405b",
  "gpt-3.5-turbo",
];
async function TuneAi(query, profile, model = "tune-gpt-4o-mini") {
  if (!allowedModels.includes(model))
    throw new Error(`Invalid model: ${model}`);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        temperature: 0.5,
        messages: [
          {
            role: "system",
            content: profile,
          },
          {
            role: "user",
            content: query,
          },
        ],
        model: model,
        stream: false,
        max_tokens: 300,
      }),
    });
    const jsonResponse = await response.json();
    return jsonResponse.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch data from TuneAi.");
  }
}
export default TuneAi;
