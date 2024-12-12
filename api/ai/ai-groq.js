import fetch from "node-fetch";
export async function groq(q) {
  try {
    const { data } = await (
      await fetch("https://api-zenn.vercel.app/api/ai/groq?q=" + q)
    )?.json();
    return data;
  } catch (error) {
    throw new Error("Error:", error.message);
  }
}
export async function gemini(q) {
  try {
    const res = await fetch(
      "https://functio.vercel.app/api/ai/gemini/generate",
      {
        method: "POST",
        body: JSON.stringify({
          req: q,
        }),
      },
    );
    const payload = (await res.json())?.desc;
    return payload;
  } catch (error) {
    throw new Error("Error:", error.message);
  }
}
