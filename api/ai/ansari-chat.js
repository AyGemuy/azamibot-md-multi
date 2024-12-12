import fetch from "node-fetch";
async function AnshariChat(message) {
  try {
    const url = "https://api.ansari.chat/api/v1/complete";
    const headers = {
      "Content-Type": "application/json",
      "User-Agent": "Postify/1.0.0",
      Referer: "https://ansari.chat/",
      Origin: "https://ansari.chat",
      "x-forwarded-for": new Array(4)
        .fill(0)
        .map(() => Math.floor(Math.random() * 256))
        .join("."),
    };
    const body = JSON.stringify({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
export default AnshariChat;
