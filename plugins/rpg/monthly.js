import db from "../../lib/database.js";
const rewards = {
  exp: 75e3,
  money: 1e5,
  potion: 12,
  wood: 12,
  rock: 12,
  string: 9,
  iron: 9,
  sand: 15
};
const cooldown = 2592e6;
let handler = async m => {
  let user = db.data.users[m.sender];
  if (new Date() - user.lastmonthly < cooldown) throw `You have already claimed this monthly claim, wait for *${(user.lastmonthly + cooldown - new Date()).toTimeString()}*`;
  let text = "";
  for (let reward of Object.keys(rewards))
    if (reward in user) {
      user[reward] += rewards[reward];
      text += `*+${rewards[reward]}* ${rpg.emoticon(reward)}${reward}\n`;
    }
  m.reply(text);
  user.lastmonthly = new Date() * 1;
};
handler.help = ["monthly"];
handler.tags = ["rpg"];
handler.command = /^(monthly)$/i;
handler.cooldown = cooldown;
export default handler;