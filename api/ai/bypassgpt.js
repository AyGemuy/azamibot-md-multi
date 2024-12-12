import fetch from "node-fetch";
async function BypassGpt(prompt) {
  const url = "https://finechatserver.erweima.ai/api/v1/projectGpts/chat";
  const headers = {
    "Content-Type": "application/json",
    uniqueId: `${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
    "User-Agent": "Mozilla/5.0",
    Referer: "https://bypassgpt.co",
    "Accept-Encoding": "gzip, deflate",
  };
  const data = {
    prompt: prompt,
    attachments: [],
    source: "bypassgpt.co",
    sessionId: `${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
    const responseBody = await response.text();
    const lines = responseBody.split("\n").slice(0, -1);
    const messages = lines.map((line) => {
      try {
        const jsonData = JSON.parse(line);
        return jsonData.data.message;
      } catch (error) {
        return "";
      }
    });
    const message = messages.join("");
    return message;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export default BypassGpt;
