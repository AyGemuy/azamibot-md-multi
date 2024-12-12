import fetch from "node-fetch";
const baseURL = "https://api.prefind.ai/api";
const headers = {
  Accept: "application/json, text/plain, */*",
  Referer: "https://www.prefind.ai/",
  "User-Agent": "Postify/1.0.0",
  "Accept-Language":
    "id-MM,id;q=0.9,ms-MM;q=0.8,ms;q=0.7,en-MM;q=0.6,en;q=0.5,es-MX;q=0.4,es;q=0.3,fil-PH;q=0.2,fil;q=0.1,id-ID;q=0.1,en-US;q=0.1",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
  "Content-Type": "application/json",
  Origin: "https://www.prefind.ai",
  Accept: "text/event-stream",
};
const extractData = (input) => {
  return input
    .split("\n")
    .filter(
      (line) => line.startsWith("data: ") && line.includes('"type":"chunk"'),
    )
    .map((line) => {
      try {
        const { chunk } = JSON.parse(line.substring(6).trim());
        return chunk?.content || "";
      } catch {
        return "";
      }
    })
    .join("")
    .trim();
};
const prefindAI = async (url, method, data = {}) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: method === "POST" ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.text();
    return JSON.parse(result);
  } catch (error) {
    console.error("❌ Error: " + error.message);
    throw error;
  }
};
export default prefindAI;
