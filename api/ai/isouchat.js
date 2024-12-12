import fetch from "node-fetch";
async function iSouChat(
  query,
  model = "gpt-4o-mini",
  mode = "simple",
  categories = ["general"],
  engine = "SEARXNG",
  locally = false,
  reload = false,
) {
  const validModels = [
    "gpt-4o-mini",
    "gpt-4o",
    "gpt-3.5-turbo",
    "yi-34b-chat-0205",
    "deepseek-chat",
    "deepseek-coder",
  ];
  if (!["simple", "deep"].includes(mode))
    return console.log("Mode hanya tersedia: 'simple', 'deep'");
  if (!["general", "science"].includes(categories[0]))
    return console.log("Kategori hanya tersedia: 'general', 'science'");
  if (!validModels.includes(model))
    return console.log(
      `Model tidak valid. Pilih dari: ${validModels.join(", ")}`,
    );
  try {
    const res = await fetch(
      `https://isou.chat/api/search?q=${encodeURIComponent(query)}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
          Referer: `https://isou.chat/search?q=${encodeURIComponent(query)}`,
        },
        body: JSON.stringify({
          stream: true,
          model: model,
          mode: mode,
          language: "all",
          categories: categories,
          engine: engine,
          locally: locally,
          reload: reload,
        }),
      },
    );
    const data = (await res.text())
      .split("\n")
      .filter((line) => line.trim())
      .reduce(
        (result, line) => {
          const { image, context, answer, related } =
            JSON.parse(JSON.parse(line.slice(line.indexOf("{"))).data) || {};
          image
            ? result.image.push(image)
            : context
              ? result.context.push(context)
              : answer
                ? (result.answer += answer)
                : related
                  ? (result.related += related)
                  : null;
          return result;
        },
        {
          image: [],
          context: [],
          answer: "",
          related: "",
        },
      );
    return data;
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data:", error);
    return null;
  }
}
export default iSouChat;
