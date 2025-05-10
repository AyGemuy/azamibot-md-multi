import {
  watchFile,
  unwatchFile
} from "fs";
import chalk from "chalk";
import {
  fileURLToPath
} from "url";
global.mods = ["6282195322106"];
global.APIs = {
  lol: "https://api.lolhuman.xyz",
  wudysoft: "https://wudysoft.xyz"
};
global.APIKeys = {
  "https://api.lolhuman.xyz": "apikeylu"
};
global.flaaa = ImgLogoFlam();
global.multiplier = 69;
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    let emot = {
      role: "🏅",
      level: "🧬",
      limit: "🌌",
      health: "❤️",
      exp: "✉️",
      money: "💵",
      potion: "🥤",
      diamond: "💎",
      common: "📦",
      uncommon: "🎁",
      mythic: "🗳️",
      legendary: "🗃️",
      pet: "🎁",
      trash: "🗑",
      armor: "🥼",
      sword: "⚔️",
      pickaxe: "⛏️",
      fishingrod: "🎣",
      bow: "🏹",
      wood: "🪵",
      rock: "🪨",
      string: "🕸️",
      horse: "🐎",
      cat: "🐈",
      dog: "🐕",
      fox: "🦊",
      wolf: "🐺",
      centaur: "🐎",
      phoenix: "🦜",
      dragon: "🐉",
      petfood: "🍖",
      iron: "⛓️",
      gold: "👑",
      emerald: "💚",
      bibitmangga: "🌾",
      bibitanggur: "🌾",
      bibitjeruk: "🌾",
      bibitpisang: "🌾",
      bibitapel: "🌾",
      mangga: "🥭",
      anggur: "🍇",
      jeruk: "🍊",
      pisang: "🍌",
      apel: "🍎",
      ayam: "🐔",
      kambing: "🐐",
      sapi: "🐄",
      kerbau: "🐃",
      babi: "🐖",
      harimau: "🐅",
      banteng: "🐂",
      monyet: "🐒",
      babihutan: "🐗",
      panda: "🐼",
      gajah: "🐘",
      buaya: "🐊",
      orca: "🐋",
      paus: "🐳",
      lumba: "🐬",
      hiu: "🦈",
      ikan: "🐟",
      lele: "🐟",
      bawal: "🐡",
      nila: "🐠",
      kepiting: "🦀",
      lobster: "🦞",
      gurita: "🐙",
      cumi: "🦑",
      udang: "🦐",
      steak: "🍝",
      sate: "🍢",
      rendang: "🍜",
      kornet: "🥣",
      nugget: "🍱",
      bluefin: "🍲",
      seafood: "🍛",
      sushi: "🍣",
      moluska: "🥘",
      squidprawm: "🍤",
      rumahsakit: "🏥",
      restoran: "🏭",
      pabrik: "🏯",
      tambang: "⚒️",
      pelabuhan: "🛳️"
    };
    let results = Object.keys(emot).map(v => [v, new RegExp(v, "gi")]).filter(v => v[1].test(string));
    if (!results.length) return "";
    else return emot[results[0][0]];
  },
  role(level) {
    level = parseInt(level);
    if (isNaN(level)) {
      return {
        name: "",
        level: ""
      };
    }
    const baseRoles = [{
      name: "Novice",
      startLevel: 0,
      diff: 5,
      count: 5
    }, {
      name: "Apprentice",
      startLevel: 25,
      diff: 5,
      count: 5
    }, {
      name: "Warrior",
      startLevel: 50,
      diff: 4,
      count: 5
    }, {
      name: "Gladiator",
      startLevel: 70,
      diff: 4,
      count: 5
    }, {
      name: "Knight",
      startLevel: 90,
      diff: 4,
      count: 5
    }, {
      name: "Paladin",
      startLevel: 110,
      diff: 4,
      count: 5
    }, {
      name: "Guardian",
      startLevel: 130,
      diff: 4,
      count: 5
    }, {
      name: "Mage",
      startLevel: 150,
      diff: 5,
      count: 5
    }, {
      name: "Sorcerer",
      startLevel: 175,
      diff: 5,
      count: 5
    }, {
      name: "Wizard",
      startLevel: 200,
      diff: 5,
      count: 5
    }, {
      name: "Sage",
      startLevel: 225,
      diff: 5,
      count: 5
    }, {
      name: "Archmage",
      startLevel: 250,
      diff: 5,
      count: 5
    }, {
      name: "Rogue",
      startLevel: 275,
      diff: 3,
      count: 5
    }, {
      name: "Assassin",
      startLevel: 290,
      diff: 3,
      count: 5
    }, {
      name: "Ninja",
      startLevel: 305,
      diff: 3,
      count: 5
    }, {
      name: "Hunter",
      startLevel: 320,
      diff: 3,
      count: 5
    }, {
      name: "Ranger",
      startLevel: 335,
      diff: 3,
      count: 5
    }, {
      name: "Priest",
      startLevel: 350,
      diff: 4,
      count: 5
    }, {
      name: "Cleric",
      startLevel: 370,
      diff: 4,
      count: 5
    }, {
      name: "Bishop",
      startLevel: 390,
      diff: 4,
      count: 5
    }, {
      name: "Healer",
      startLevel: 410,
      diff: 4,
      count: 5
    }, {
      name: "Saint",
      startLevel: 430,
      diff: 4,
      count: 5
    }, {
      name: "Berserker",
      startLevel: 450,
      diff: 6,
      count: 5
    }, {
      name: "Destroyer",
      startLevel: 480,
      diff: 6,
      count: 5
    }, {
      name: "Titan",
      startLevel: 510,
      diff: 6,
      count: 5
    }, {
      name: "Warlord",
      startLevel: 540,
      diff: 6,
      count: 5
    }, {
      name: "Conqueror",
      startLevel: 570,
      diff: 6,
      count: 5
    }, {
      name: "Necromancer",
      startLevel: 600,
      diff: 5,
      count: 5
    }, {
      name: "Lich",
      startLevel: 625,
      diff: 5,
      count: 5
    }, {
      name: "Death Knight",
      startLevel: 650,
      diff: 5,
      count: 5
    }, {
      name: "Shadowmancer",
      startLevel: 675,
      diff: 5,
      count: 5
    }, {
      name: "Plaguebringer",
      startLevel: 700,
      diff: 5,
      count: 5
    }, {
      name: "Summoner",
      startLevel: 725,
      diff: 4,
      count: 5
    }, {
      name: "Conjurer",
      startLevel: 745,
      diff: 4,
      count: 5
    }, {
      name: "Evoker",
      startLevel: 765,
      diff: 4,
      count: 5
    }, {
      name: "Channeler",
      startLevel: 785,
      diff: 4,
      count: 5
    }, {
      name: "Mystic",
      startLevel: 805,
      diff: 4,
      count: 5
    }, {
      name: "Monk",
      startLevel: 825,
      diff: 3,
      count: 5
    }, {
      name: "Adept",
      startLevel: 840,
      diff: 3,
      count: 5
    }, {
      name: "Master",
      startLevel: 855,
      diff: 3,
      count: 5
    }, {
      name: "Grandmaster",
      startLevel: 870,
      diff: 3,
      count: 5
    }, {
      name: "Guru",
      startLevel: 885,
      diff: 3,
      count: 5
    }, {
      name: "Venus",
      startLevel: 900,
      diff: 2,
      count: 5
    }, {
      name: "Mars",
      startLevel: 910,
      diff: 2,
      count: 5
    }, {
      name: "Jupiter",
      startLevel: 920,
      diff: 2,
      count: 5
    }, {
      name: "Saturn",
      startLevel: 930,
      diff: 2,
      count: 5
    }, {
      name: "Uranus",
      startLevel: 940,
      diff: 2,
      count: 5
    }, {
      name: "Neptune",
      startLevel: 950,
      diff: 2,
      count: 5
    }, {
      name: "Pluto",
      startLevel: 960,
      diff: 2,
      count: 5
    }, {
      name: "Celestial",
      startLevel: 970,
      diff: 3,
      count: 5
    }, {
      name: "Cosmic",
      startLevel: 985,
      diff: 3,
      count: 5
    }, {
      name: "Galactic",
      startLevel: 1e3,
      diff: 3,
      count: 5
    }, {
      name: "Universal",
      startLevel: 1015,
      diff: 3,
      count: 5
    }, {
      name: "Eternal",
      startLevel: 1030,
      diff: 3,
      count: 5
    }, {
      name: "Zeus",
      startLevel: 1045,
      diff: 4,
      count: 5
    }, {
      name: "Hades",
      startLevel: 1065,
      diff: 4,
      count: 5
    }, {
      name: "Poseidon",
      startLevel: 1085,
      diff: 4,
      count: 5
    }, {
      name: "Aphrodite",
      startLevel: 1105,
      diff: 4,
      count: 5
    }, {
      name: "Apollo",
      startLevel: 1125,
      diff: 4,
      count: 5
    }];

    function romanize(num) {
      if (isNaN(num)) return NaN;
      const digits = String(+num).split("");
      const key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
      let roman = "";
      let i = 3;
      while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
      return Array(+digits.join("") + 1).join("M") + roman;
    }
    for (const baseRole of baseRoles) {
      for (let i = baseRole.count; i >= 1; i--) {
        const generatedRole = {
          name: `${baseRole.name} ${romanize(i)}`,
          level: baseRole.startLevel + (baseRole.count - i) * baseRole.diff
        };
        if (level >= generatedRole.level) {
          return generatedRole;
        }
      }
    }
    const lastRoleBase = baseRoles[baseRoles.length - 1];
    return {
      name: `${lastRoleBase.name} I`,
      level: lastRoleBase.startLevel + (lastRoleBase.count - 1) * lastRoleBase.diff + lastRoleBase.diff * (Math.floor((level - (lastRoleBase.startLevel + (lastRoleBase.count - 1) * lastRoleBase.diff)) / lastRoleBase.diff) + 1)
    };
  }
};

function ImgLogoFlam() {
  const flamming = ["fabulous-logo", "memories-anim-logo", "graffiti-3d-logo", "graffiti-burn-logo", "glow-logo"];
  return flamming.map(id => `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=${id}&doScale=true&scaleWidth=480&scaleHeight=240&fontsize=120&backgroundColor=%23000300&shadowType=2&text=`);
}
let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright("Update 'config.js'"));
  import(`${file}?update=${Date.now()}`);
});