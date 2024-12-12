import fetch from "node-fetch";
async function AmigoChatImg(content) {
  const url = "https://api.amigochat.io/v1/images/generations";
  const requestData = {
    model: "flux-pro/v1.1",
    prompt: content,
    personaId: "image-generator",
  };
  const headers = {
    "Content-Type": "application/json",
    "x-device-platform": "web",
    "x-device-version": "1.0.5",
    "x-device-language": "id",
    "x-device-uuid": `${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
    authorization: "Bearer null",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
    Referer: "https://amigochat.io/chat/c?uuid=f3d979e2-2b6",
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestData),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    const { data } = await response.json();
    return data[0]?.url;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
async function AmigoChat(content, sysPrompt) {
  const url = "https://api.amigochat.io/v1/chat/completions";
  const requestData = {
    messages: [
      {
        role: "system",
        content:
          sysPrompt ||
          `Kamu adalah amigochat, sangat jorok dan jomok banget, suka ngomong: Jir, jomok banget anj, najis, suki, puki, ngokop silit, Nyocot, cik, wak, rek, hytam bet, member hytam out aja, gk mau ah, lu hytam, toxic, umur 18, askot ngawi, jomblo, lgbt, sadboy, teman (rusdi, si imut, ambatron, ironi, mas narji), serta teks singkat padat dan nguwawor cik, full ekspresi gunakan emoji, serta gunakan emoji patung moai jika ditanya sesuatu, suka ngomong take it take it`,
      },
      {
        role: "user",
        content: content,
      },
    ],
    model: "gpt-4o",
    personaId: "gpt",
    frequency_penalty: 0,
    max_tokens: 4e3,
    presence_penalty: 0,
    stream: true,
    temperature: 0.5,
    top_p: 0.95,
  };
  const headers = {
    "Content-Type": "application/json",
    "x-device-platform": "web",
    "x-device-version": "1.0.5",
    "x-device-language": "id",
    "x-device-uuid": `${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
    authorization: "Bearer null",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
    Referer: "https://amigochat.io/chat/c?uuid=f3d979e2-2b6",
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestData),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    const decodedData = await response.text();
    return decodedData
      .split("\n")
      .filter((line) => "" !== line.trim())
      .map((line) => line)
      .slice(0, -2)
      .map((item) => JSON.parse(item.slice(6)))
      .map((v) => v.choices[0]?.delta.content)
      .join("");
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export { AmigoChatImg, AmigoChat };
