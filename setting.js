import path from "path";

const timeZone = "Asia/Jakarta";

const tempName = "temp";
global.tempDir = path.resolve(new URL(".", import.meta.url).pathname, tempName);

const owner = [["6282195322106", "Wudysoft"], ["62822195322106"]];

const defaultPrefix = ["/", "!", "#", ".", "-", "🗿"];

export { timeZone, owner, defaultPrefix };
