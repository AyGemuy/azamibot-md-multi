import cp from "child_process";
import {
  promisify
} from "util";
let exec = promisify(cp.exec).bind(cp);
let handler = async (m, {
  conn
}) => {
  await conn.sendMsg(m.chat, {
    react: {
      text: "⌛",
      key: m.key
    }
  });
  let o;
  try {
    o = await exec("py speed.py");
  } catch (e) {
    o = e;
  } finally {
    let {
      stdout,
      stderr
    } = o;
    if (stdout.trim()) m.reply(stdout.replaceAll("..", ""));
    if (stderr.trim()) console.log(stderr);
  }
};
handler.help = ["speedtest"];
handler.tags = ["entertainment"];
handler.command = /^(speed(test?)?)$/i;
export default handler;