import db from "../../lib/database.js";
import {
  delay
} from "../../lib/func.js";
let handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  Number.prototype.noExponents = function() {
    var data = String(this).split(/[eE]/);
    if (data.length == 1) return data[0];
    var z = "",
      sign = this < 0 ? "-" : "",
      str = data[0].replace(".", ""),
      mag = Number(data[1]) + 1;
    if (mag < 0) {
      z = sign + "0.";
      while (mag++) z += "0";
      return z + str.replace(/^\-/, "");
    }
    mag -= str.length;
    while (mag--) z += "0";
    return str + z;
  };
  var n = db.data.users[m.sender].money;
  console.log(n.noExponents());
  if (n < -1e18) {
    db.data.users[m.sender].money = 0;
    await delay(500);
    m.reply(`*Fixed!!*\n\nSaldo 💵 : ${db.data.users[m.sender].money}`);
  } else if (n > 1e20) {
    db.data.users[m.sender].money = 9e19;
    await delay(500);
    m.reply(`*Fixed [ Reseted ] !!*\n\nSaldo 💵 : ${db.data.users[m.sender].money}`);
  } else {
    m.reply(`Duid lu masih normal`);
  }
};
handler.menugroup = ["fixmoney"];
handler.tagsgroup = ["group"];
handler.command = /^((fix|reset)money)$/i;
export default handler;