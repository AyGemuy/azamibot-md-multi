const {
  proto,
  generateWAMessage,
  areJidsSameUser
} = await (await import("@whiskeysockets/baileys")).default;
import _ from "lodash";
export async function all(m, chatUpdate) {
  if (m.isBaileys || !m.message?.pollUpdate) return;
  let pu = m.message.pollUpdate;
  let voted = pu.options.find(o => Array.isArray(o.voters) && o.voters.length > 0);
  if (!voted) return;
  let id = voted.optionId;
  let text = id;
  let usedPrefix, isIdMessage = false;
  for (let name in global.plugins) {
    let plugin = global.plugins[name];
    if (!plugin || plugin.disabled) continue;
    if (!opts["restrict"] && plugin.tags?.includes("admin")) continue;
    if (typeof plugin !== "function" || !plugin.command) continue;
    const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
    let _prefix = plugin.customPrefix || this.prefix || global.prefix;
    let match = (_prefix instanceof RegExp ? [
      [_prefix.exec(id), _prefix]
    ] : Array.isArray(_prefix) ? _prefix.map(p => {
      let re = p instanceof RegExp ? p : new RegExp(str2Regex(p));
      return [re.exec(id), re];
    }) : [
      [new RegExp(str2Regex(_prefix)).exec(id), new RegExp(str2Regex(_prefix))]
    ]).find(p => p[0]);
    if (!match) continue;
    usedPrefix = match[1].exec(id)[0];
    let noPrefix = id.replace(usedPrefix, "");
    let [command] = noPrefix.trim().split` `.filter(v => v);
    command = (command || "").toLowerCase();
    let isId = plugin.command instanceof RegExp ? plugin.command.test(command) : Array.isArray(plugin.command) ? plugin.command.some(cmd => cmd instanceof RegExp ? cmd.test(command) : cmd === command) : typeof plugin.command === "string" ? plugin.command === command : false;
    if (!isId) continue;
    isIdMessage = true;
    break;
  }
  const fakeSender = m.sender || m.key?.participant || m.key?.remoteJid;
  const fakeChat = m.chat || m.key?.remoteJid;
  if (!fakeChat || !fakeSender) return;
  let msg = await generateWAMessage(fakeChat, {
    text: isIdMessage ? id : text,
    mentions: m.mentionedJid
  }, {
    userJid: this.user.id,
    quoted: m.quoted?.fakeObj
  });
  msg.key.fromMe = areJidsSameUser(fakeSender, this.user.id);
  msg.key.id = m.key.id;
  msg.pushName = m.pushName || m.name;
  if (m.isGroup) msg.key.participant = msg.participant = fakeSender;
  this.ev.emit("messages.upsert", {
    ...chatUpdate,
    messages: [proto.WebMessageInfo.fromObject(msg)].map(v => (v.conn = this, v)),
    type: "append"
  });
}