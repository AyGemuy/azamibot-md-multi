import * as cheerio from "cheerio";
import fetch from "node-fetch";
async function fbdown(url) {
  try {
    const postOptions = {
        method: "POST",
        body: new URLSearchParams({
          URLz: url,
        }),
      },
      response = await fetch("https://fdown.net/download.php", postOptions),
      html = await response.text(),
      $ = cheerio.load(html);
    return {
      title: $(".lib-row.lib-header").text().trim(),
      description: $(".lib-row.lib-desc").text().trim(),
      sdLink: $("#sdlink").attr("href"),
      hdLink: $("#hdlink").attr("href"),
    };
  } catch (error) {
    return console.error("Error:", error.message), null;
  }
}
export default fbdown;
