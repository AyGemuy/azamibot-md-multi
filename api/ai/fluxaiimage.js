import fetch from "node-fetch";
async function FluxAiImage(prompt) {
  const taskUrl = "https://fluxaiimagegenerator.com/api/task";
  const statusUrl = (taskId) =>
    `https://fluxaiimagegenerator.com/api/task?taskId=${taskId}`;
  try {
    const createResponse = await fetch(taskUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
        Referer: "https://fluxaiimagegenerator.com/",
      },
      body: JSON.stringify({
        prompt: prompt,
        aspectRatio: "1024x1024",
        outputFormat: "png",
        outputQuality: 100,
        isPublic: true,
      }),
    });
    if (!createResponse.ok) {
      throw new Error(`HTTP error! Status: ${createResponse.status}`);
    }
    const createData = await createResponse.json();
    const taskId = createData.data?.taskId;
    if (!taskId) {
      throw new Error("Failed to create task.");
    }
    const timeout = 6e4;
    const startTime = Date.now();
    let imageUrl = null;
    while (Date.now() - startTime < timeout) {
      await new Promise((resolve) => setTimeout(resolve, 1e4));
      try {
        const statusResponse = await fetch(statusUrl(taskId), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
            Referer: "https://fluxaiimagegenerator.com/",
          },
        });
        if (!statusResponse.ok) {
          throw new Error(`HTTP error! Status: ${statusResponse.status}`);
        }
        const statusData = await statusResponse.json();
        if (statusData.data?.url) {
          imageUrl = statusData.data.url;
          break;
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (imageUrl) {
      return imageUrl;
    } else {
      throw new Error("Failed to generate image within the timeout period.");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export default FluxAiImage;
