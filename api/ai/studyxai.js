import fetch from "node-fetch";
import fakeUserAgent from "fake-useragent";
const userAgent = fakeUserAgent();
const studyxai = async (prompt) => {
  try {
    const response1 = await fetch(
      "https://studyxai.vercel.app/api/getShortId",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": userAgent,
          Referer: "https://studyxai.vercel.app/",
        },
        body: JSON.stringify({
          questionContent: `<p>${prompt}</p>`,
          modelType: 11,
          type: 0,
          sourceType: 3,
        }),
      },
    );
    if (!response1.ok)
      throw new Error(`First request failed with status: ${response1.status}`);
    const { shortId } = await response1.json();
    const response2 = await fetch(
      "https://studyxai.vercel.app/api/getQuestion",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": userAgent,
          Referer: "https://studyxai.vercel.app/",
        },
        body: JSON.stringify({
          promptInput: prompt,
          questionId: shortId,
          regenerate: true,
          sessionId: "905940875518747900",
          userId: "28457280088360236",
          modelType: 11,
          event: "pushQuestion",
          eventId: "s1725008715064",
          eventType: 2,
          paramsS2: shortId,
          paramsS3: 1,
          paramsS4: "",
          paramsType: 11,
          askType: "",
          eventSourceType: "web_account_homework",
          eventSourceDetail: `https://studyx.ai/webapp/homework/${shortId}`,
        }),
      },
    );
    if (!response2.ok)
      throw new Error(`Second request failed with status: ${response2.status}`);
    const { data } = await response2.json();
    return data[0].answerText || "Error";
  } catch (error) {
    console.error("Error:", error);
    return {
      error: error.message,
    };
  }
};
export default studyxai;
