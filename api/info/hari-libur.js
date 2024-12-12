import fetch from "node-fetch";
import * as cheerio from "cheerio";
async function HariLibur() {
  try {
    const response = await fetch("https://www.liburnasional.com/");
    const html = await response.text();
    const $ = cheerio.load(html);
    const nextLibur = $("div.row.row-alert > div")
      .text()
      .split("Hari libur")[1]
      .trim();
    const libnas_content = $("tbody > tr > td > span > div")
      .map((index, element) => {
        const summary = $(element).find("span > strong > a").text();
        const days = $(element)
          .find("div.libnas-calendar-holiday-weekday")
          .text();
        const dateMonth = $(element)
          .find("time.libnas-calendar-holiday-datemonth")
          .text();
        return {
          summary: summary,
          days: days,
          dateMonth: dateMonth,
        };
      })
      .get();
    return {
      nextLibur: nextLibur,
      libnas_content: libnas_content,
    };
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
    throw error;
  }
}
export default HariLibur;
