import axios from "axios";
import * as cheerio from "cheerio";
async function jarak(from, to) {
  try {
    const query = `jarak ${from} ke ${to}`,
      { data } = await axios.get(
        `https://www.google.com/search?q=${encodeURIComponent(query)}&hl=id`,
      ),
      $ = cheerio.load(data),
      img =
        $('script:contains("var s=\'")')
          .text()
          .match(/var s='(.*?)'/)?.[1] || "",
      imgData = /^data:.*?\/.*?;base64,/i.test(img)
        ? Buffer.from(img.split(",")[1], "base64")
        : null,
      [desc, rute] = $(
        "div.kCrYT > span > div.BNeawe.deIvCb.AP7Wnd, div.kCrYT > span > div.BNeawe.tAd8D.AP7Wnd",
      )
        .toArray()
        .map((el) => $(el).text().trim());
    return {
      img: imgData,
      desc: desc.replace(/(Dari:|Ke:)/g, "- *$1*"),
      rute: rute,
    };
  } catch (error) {
    throw (console.error(error), "Terjadi kesalahan dalam menghitung jarak.");
  }
}
export default jarak;
