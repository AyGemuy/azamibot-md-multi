import fetch from "node-fetch";
import * as cheerio from "cheerio";
import _ from "lodash";
const stylizeText = async (query) => {
  try {
    const response = await fetch(
      `http://qaz.wtf/u/convert.cgi?text=${encodeURIComponent(query)}`,
    );
    const html = await response.text();
    const $ = cheerio.load(html);
    return _.chain($("table tr"))
      .map((row) => {
        const cells = $(row).find("td");
        return cells.length > 1
          ? {
              name: $(cells[0]).find(".aname").text() || $(cells[0]).text(),
              value: $(cells[1]).html().trim(),
            }
          : null;
      })
      .compact()
      .value();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch and process data");
  }
};
export default stylizeText;
