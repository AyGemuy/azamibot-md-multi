import fetch from "node-fetch";
async function Ai4Chat(prompt) {
  const url = new URL(
    "https://yw85opafq6.execute-api.us-east-1.amazonaws.com/default/boss_mode_15aug",
  );
  url.search = new URLSearchParams({
    text: prompt,
    country: "Asia",
    user_id: "IWgCVHgf4N",
  }).toString();
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
        Referer: "https://www.ai4chat.co/pages/riddle-generator",
      },
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return JSON.parse(await response.text());
  } catch (error) {
    console.error(error);
  }
}
export default Ai4Chat;
