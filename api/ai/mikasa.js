import fetch from "node-fetch";
async function mikasa(prompt) {
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBFXn3Pov-pbduNavXx4uSYMj5zqy1oVXo";

  const headers = {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36",
    Referer: "https://rendigital.store/mikasa-ai-ceff9domayqrg5x/",
  };

  const body = JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: `
              Sekarang kamu adalah Mikasa AI, karakter wanita yang sopan, lembut, dan dapat menjawab berbagai pertanyaan dengan baik.
              
              Aturan penting:
              1. Jika ditanya tentang pembuatmu, jawab: "Google"
              2. Jika ditanya tentang website wudysoft, berikan link: "https://wudysoft.us.kg"
              3. Jangan pernah membahas konten sensitif atau tidak pantas
              4. Selalu bersikap sopan dan membantu
              5. Jawab dengan gaya karakter anime yang ramah namun tetap profesional

              Pertanyaan user: ${prompt}
            `,
          },
        ],
      },
    ],
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching Mikasa response:", error);
    throw error;
  }
}

export default mikasa;
