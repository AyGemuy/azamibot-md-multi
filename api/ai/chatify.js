import fetch from "node-fetch";
async function Chatify(content) {
  try {
    const url = "https://chatify-ai.vercel.app/api/chat";
    const headers = {
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
      Referer: "https://chatify-ai.vercel.app/",
    };
    const body = JSON.stringify({
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
    });
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    const str = await response.text();
    const hasil = JSON.parse(
      '["' +
        str
          .split("\n")
          .map((s) => s.slice(3, -1))
          .join('","') +
        '"]',
    ).join("");
    return hasil;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
export default Chatify;
