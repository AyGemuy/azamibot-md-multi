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
global.flamming = Flamming();
global.dynamics = Dynamics();
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

function Flamming() {
  const maps = ["fabulous-logo", "memories-anim-logo", "graffiti-3d-logo", "graffiti-burn-logo", "glow-logo", "be-my-valentine-logo", "april-fools-logo", "harry-potter-logo", "crafts-logo", "chrominium-logo", "amped-logo", "fire-logo", "supermarket-logo", "thanksgiving1-logo", "global-logo", "beauty-logo", "steel-logo", "silver-logo", "bevel-emboss-logo", "easter-parade-logo", "winner-logo", "flaming-logo", "birdy-logo", "heavy-metal-logo", "standing3d-logo", "bubble-logo", "minions-logo", "retro-logo", "fortune-logo", "glitter-anim-logo", "inferno-logo", "uprise-logo", "star-wars-logo", "fancy-logo", "burn-in-anim-logo", "brushed-metal-logo", "superfit-logo", "mardi-gras-logo", "electric", "roman-logo", "gradient-shadow-logo", "gold-logo", "colored-logo", "surfboard-white-logo", "swordfire-logo", "outline-logo", "amped-name", "flame-logo", "wild-logo", "memories-name", "cookies-logo", "orlando-logo", "birthday-fun-logo", "colored2-logo", "graffiti-street-logo", "business-logo", "northern-lights-logo", "adidas-logo", "great-gatsby-logo", "burning-logo", "whirl-anim-logo", "urban-style-logo", "street-sport-logo", "licorice-allsorts-logo", "cloud-logo", "fifties-logo", "horizon", "plain-logo", "skywalker-logo", "matrix-logo", "sugar-logo", "golden-logo", "signature-logo", "marbles-logo", "parrot-logo", "funtime-logo", "highlight-anim-logo", "robot-logo", "blood", "genius-logo", "tattoo-logo", "inner-fire-anim-logo", "blue-fire", "my-love-logo", "glossy-logo", "fun-logo", "scribble-logo", "wood", "fun-and-play-logo", "elegant-logo", "cherry-logo", "commando-logo", "cereal-logo", "magic-logo", "dance-logo", "happy-ramadan-silver-logo", "chocolateria-logo", "crinkle-cut-logo", "shrek-logo", "swing-logo", "sweetie-logo", "cartoon-logo", "skate-logo", "cool-logo", "graffiti-logo", "ice-logo", "princess-leia-logo", "meme-logo", "amazing-3d-logo", "vintage-racing-logo", "soho-chic-logo", "drive-in-cinema-logo", "grunge-gray-logo", "restaurant-logo", "drop-shadow-logo", "tagline-logo", "lava-logo", "shake-anim-logo", "disco-party-logo", "kryptonite-logo", "prime-logo", "zilch-logo", "thanksgiving2-logo", "happy-ramadan-soft-logo", "usa", "popsicle-logo", "peace-logo", "baby-logo", "big-blue-logo", "dracula-logo", "st-patricks3-logo", "angels-and-demons-logo", "holiday-logo", "han-solo-logo", "jump-anim-logo", "detective-logo", "cash-logo", "warrior-logo", "booking-logo", "maven-logo", "sound-blast-logo", "sports-logo", "moon-logo", "aurora-logo", "bold-gold-logo", "3d-outline-logo", "sweets-logo", "fiery-text-logo", "plasma-logo", "water-name", "flash-anim-logo", "space-logo", "shadowplay-logo", "emperor-logo", "starscape-logo", "glass-logo", "ninja-logo", "gummy-logo", "easter-gold-logo", "orange-logo", "outline-shadow-logo", "oscar-logo", "fairytale-logo", "love-sunburst-logo", "express-logo", "trance-logo", "crazy-logo", "c3p0-logo", "old-stone-logo", "jumbo-logo", "anakin-logo", "bumblebee-logo", "balloon-logo", "thunder-logo", "viking-logo", "happy-new-year-logo", "game-over-logo", "fireworks-logo", "flash-fire-logo", "funky-logo", "oil-spill-logo", "chip-away-logo", "blue-star-logo", "happy-birthday-logo", "brave-logo", "picnic-logo", "theatre-logo", "shadows-logo", "tiger-logo", "monsoon-logo", "hockey-night-logo", "colgate-logo", "rose-gold-logo", "tropical-logo", "medieval-logo", "basic2-logo", "darth-vader-logo", "husky-logo", "on-fire-logo", "rock-band-logo", "water-world-logo", "casino-logo", "sunshine-logo", "strongman-logo", "patriot-logo", "beehive-logo", "jackpot-logo", "art-deco-logo", "sparkle-logo", "free-range-logo", "aladdin-logo", "army-logo", "mothers-day-sunburst-logo", "alien-glow-logo", "sparkling-logo", "toothpaste-logo", "valentine-forever-logo", "chocoholic-logo", "circuit-logo", "mothers-day3-logo", "blue-logo", "fun-run-logo", "frosty-logo", "gimp-org-logo", "missing-text-logo", "reflexion-logo", "sunrise-logo", "phantom-logo", "paintbrush-logo", "chrome-logo", "aqua-pro-ball-logo", "sincerely-logo", "blueberry-logo", "cams-diner-logo", "service-logo", "plastic-logo", "bubble-gum-logo", "wrestler-logo", "warp-logo", "monster-logo", "enviro-logo", "two-hearts-logo", "smile-logo", "smokey-logo", "gay-pride-logo", "true-love-logo", "slime-logo", "dark-alliance-logo", "runescape-logo", "vampire-logo", "death-star-logo", "super-deal-logo", "its-a-boy-logo", "itext-logo", "burnt-paper-logo", "blue-steel-logo", "blue-jeans-logo", "nuggets-logo", "workshop-logo", "dark-night-logo", "waterfall-logo", "halloween-logo", "futurama-logo", "groovy-logo", "jukebox-logo", "magazine-logo", "cool-metal-logo", "milkshake-logo", "candy-logo", "mello-yello-logo", "frozen-logo", "berry-logo", "splat-logo", "twitter-logo", "football-logo", "summer-sale-logo", "transport-logo", "popstar-logo", "gold-leaf-logo", "party", "thug-life-logo", "fairyland-logo", "earth-day-logo", "blues-logo", "dreamland-logo", "spider-men-logo", "showtime-logo", "spooky-logo", "popcorn-logo", "dream-logo", "vegas-logo", "st-patricks1-logo", "feeling-blue-logo", "blue-wave-logo", "flammen-logo", "winter-snow-logo", "thanksgiving3-logo", "happy-halloween-logo", "birthday-colorful-logo", "tv-drop-logo", "stone-and-wood-logo", "turkey-logo", "watercolor-logo", "break-logo", "adventure-logo", "ice-fire-logo", "molten-logo", "electricity-logo", "night-out-logo", "invasion-logo", "resort-logo", "wooden-letters-logo", "gingerbread-logo", "rise-logo", "double-outline-logo", "pet-care-logo", "woodgrain-logo", "playtime-logo", "lemonade-logo", "milky-logo", "chinese-new-year-sunburst-logo", "superstars-logo", "magical-logo", "wildlife-logo", "ice-age-logo", "fred-and-ginger-logo", "funster-logo", "night-star-logo", "tech-central-logo", "arcade-logo", "festival-logo", "everest-logo", "chinese-new-year-inset-shadow-logo", "white-christmas-logo", "hard-rock-logo", "sota-chrome-logo", "law-order-logo", "mighty-girl-logo", "love-me-tender-logo", "yolo-logo", "magic-marker-logo", "r2d2-logo", "beyond-blue-logo", "maria-sharapova-logo", "alien-neon-logo", "jedi-logo", "feurio-logo", "granada-logo", "think-pink-logo", "bad-oil-logo", "green-dragon-logo", "bananas-logo", "solid-noise-logo", "mosaic-logo", "chinese-new-year-gold-logo", "xiang-liu-logo", "flying-letters-logo", "copper-logo", "deluxe-logo", "music-notes-logo", "fun-kids-logo", "easter-greetings-logo", "vegetable-garden-logo", "grass-logo", "awesome-logo", "cinema-logo", "code-blue-logo", "team-usa-logo", "jessica-ennis-logo", "birthday-pop-logo", "carnival-logo", "kwanzaa-logo", "baby-boy-logo", "alchemy-logo", "starburst-logo", "pattern-shadow-logo", "goldsmith-logo", "greyman", "true-blue-logo", "infected-logo", "techno-dance-logo", "liquid-water-logo", "chalk-logo", "lighthouse-logo", "golden-girl-logo", "golden-goose-logo", "hubba-hubba-logo", "lifesaver-logo", "winter-frost-logo", "gas-flame-logo", "military-logo", "easter-slanted-logo", "lizard-king-logo", "easter-script-logo", "stainedglass-logo", "glowing-logo", "perspective-shadow-logo", "layer-cake-logo", "blue-mountains-logo", "blended-logo", "jingle-bells-logo", "alien-invasion-logo", "christmas2-logo", "st-patricks2-logo", "fruity-logo", "kingdom-come-logo", "stepz-logo", "mothers-day-plain-logo", "dream-light-logo", "bovinated-logo", "oil-drop-logo", "spring-logo", "tranquil-logo", "weird-science-logo", "mistletoe-logo", "gradient3-shadow-logo", "ice-cube-logo", "chinese-new-year-red-radial-logo", "karaoke-logo", "brazil-soccer-logo", "technicolor-logo", "lollipop-logo", "plum-pudding-logo", "blue-smoke-logo", "london-2012-logo", "usain-bolt-logo", "summer-2012-logo", "stonehenge-logo", "renaud-lavillenie-logo", "easter-fun-logo", "mystery-logo", "chinese-new-year1-logo", "christmas-baking-logo", "comic-logo", "thanksgiving4-logo", "go-green-logo", "hula-hoop-logo", "pineapple-logo", "grapevine-logo", "quake-logo", "michael-phelps-logo", "red-dragon-logo", "easter-plain-logo", "happy-new-year2-logo", "starlight-logo", "ho-ho-ho-logo", "hokey-pokey-logo", "thanksgiving5-logo", "thanksgiving7-logo", "trick-or-treat-logo", "sally-pearson-logo", "alpine-logo", "christmas-sunburst-logo", "summer-sand-logo", "apple-sour-logo", "carved-logo", "thanksgiving6-logo", "cotton-candy-logo", "christmas-tree-logo", "christmas-story-logo", "bubble-tea-logo", "seventies-logo", "beach-babe-logo", "desert-logo", "marcel-nguyen-logo", "christmas-logo", "kenyan-runners-logo", "wild-fire-logo", "burger-bar-logo", "shine-logo", "daydream-logo", "cloud-nine-logo", "centipede-logo", "grand-logo", "medical-practice-logo", "christmas3-logo", "spaceships-logo", "crystal-logo", "shark-logo", "sun-logo", "legal-eagle-logo", "give-thanks-logo", "honey-logo", "elf-logo", "planet-logo", "super-hero-logo", "blue-bird-logo", "blue-sky-logo", "loyal-logo", "pool-party-logo", "night-before-christmas-logo", "raindrop-logo", "christmas-stocking-logo", "blurry-logo", "be-happy-logo", "blue-label-logo", "thanksgiving8-logo", "christmas-party-logo", "polar-express-logo", "sweet-shop-logo", "old-photo-logo", "thanksgiving9-logo", "natural-logo", "happy-ramadan-yellow-logo", "north-pole-logo", "dear-diary-logo", "hippy-chick-logo", "christmas-day-logo", "love-always-logo", "american-dream-logo", "sherbet-logo", "hotdog-logo", "shutter-logo", "labyrinth-logo", "mud-logo", "4th-of-july-logo", "spiritual-logo", "france-logo", "grind-logo", "ios10-logo", "happy-4th-of-july-logo", "reindeer-logo", "macadamia-logo", "fort-knox-logo", "seasons-greetings-logo", "love-peace-joy-logo", "water-droplets", "30-percent-off-logo", "50-percent-off-logo", "bandstand-logo", "be-proud-logo", "beach-house-logo", "bestie-logo", "60-dollars-off-logo", "australia-day-logo", "awards-night-logo", "be-mine-logo", "be-yourself-logo", "best-friend-hearts-logo", "big-love-logo", "black-panther-logo", "black-pearl-logo", "blue-lagoon-logo", "bogeyman-logo", "boogie-on-down-logo", "carols-by-candlelight-logo", "birthday-party-logo", "birthday-wish-logo", "bloodbath-logo", "boxing-day-sale-logo", "brimstone-logo", "cash-out-logo", "christmas-spirit-logo", "country-logo", "dad-rocks-logo", "daddy-logo", "disco-groove-logo", "dude-logo", "chinese-new-year2-logo", "christmas-joy-logo", "clearance-sale-logo", "closed-logo", "dance-party-logo", "discovery-logo", "fangirl-logo", "fathers-day-starburst-logo", "festive-season-logo", "flamingo-logo", "frankenstein-logo", "eat-street-logo", "eurorock-logo", "final-sale-logo", "fire-up-logo", "fish-and-chips-logo", "gamezone-logo", "get-ready-logo", "green-daze-logo", "happy-4th-of-july4-logo", "happy-4th-of-july6-logo", "girl-on-fire-logo", "goat-logo", "goblin-logo", "godzilla-logo", "good-times-logo", "goosebumps-logo", "happy-4th-of-july3-logo", "happy-4th-of-july5-logo", "happy-birthday-balloons-logo", "happy-birthday-cards-logo", "happy-holidays-logo", "happy-new-year3-logo", "happy-new-year4-logo", "haunted-halloween-logo", "happy-birthday-cameron-logo", "happy-birthday-emma-logo", "happy-birthday-sister-logo", "happy-birthday2-logo", "happy-birthday3-logo", "happy-birthday4-logo", "haunted-logo", "house-of-horrors-logo", "hugs-logo", "i-love-my-dad-logo", "i-love-my-mom-logo", "ironic-maiden-logo", "its-cold-outside-logo", "jade-logo", "just-married-logo", "heartbeat-logo", "jacks-bar-logo", "joes-diner-logo", "kangaroo-logo", "legendary-logo", "lgbtq-logo", "live-to-ride-logo", "love-is-love-blue-starburst-logo", "love-is-love-logo", "love-wins-logo", "love-with-pride-logo", "karaoke-bar-logo", "king-charles-iii-coronation-logo", "king-charles-iii-logo", "know-your-product-logo", "lawn-and-garden-logo", "mardi-gras-festival-logo", "metal-work-logo", "modern-logo", "mom-rocks-logo", "mommy-logo", "monarch-logo", "massive-winter-savings-logo", "mega-sale-logo", "mom-and-me-logo", "mother-love-logo", "motormouth-logo", "mutant-mayhem-logo", "noel-logo", "oven-baked-logo", "peace-and-love-logo", "pride-heart-logo", "night-club-logo", "no-vacancy-logo", "no-worries-mate-logo", "on-air-logo", "open-24-hrs-logo", "open-logo", "pantry-logo", "pink-flamingo-logo", "pride-logo", "queen-logo", "rise-up-logo", "san-andreas-logo", "santa-claus-logo", "santas-little-helper-logo", "santas-sleigh-logo", "silver-bells-logo", "pumpkin-patch-logo", "red-viper-logo", "rosies-salon-logo", "shamrock-logo", "square-logo", "textured-logo", "soul-mates-logo", "spider-web-logo", "spread-kindness-logo", "squad-logo", "stranger-things-logo", "super-bowl-party-logo", "super-bowl-sunday-logo", "sushi-train-logo", "the-howling-logo", "timezone-logo", "u2-cool-logo", "vinyl-records-logo", "unity-4th-july-logo", "vacancy-logo", "virtual-reality-logo", "welcome-logo", "winter-sale-on-now-logo", "world-cup-2022-logo", "zombie-apocalypse-logo", "comics-logo", "3d-logo", "water-logo", "blackbird-logo", "smurfs-logo", "style-logo", "runner-logo", "fluffy-logo", "neon-logo", "world-cup-2014-logo", "alien-glow-anim-logo", "clan-logo"];
  return maps.map(id => `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=${id}&doScale=true&scaleWidth=480&scaleHeight=240&fontsize=120&backgroundColor=%23000300&shadowType=2&text=`);
}

function Dynamics() {
  const maps = ["04ca85c5-a4c1-4582-8296-7fb8cbdf7df1", "063a3d53-d7bb-4abb-8b20-3e45ae7c61ac", "065b4535-d123-4261-accb-2f21e3eac3cf", "09699c93-f687-4c58-b6dc-cb8010de7df9", "097b9969-5019-433a-9a3f-d2e097b50e99", "0c963355-e735-4cdd-bec8-1373ba2a222e", "0cd45dda-e1e6-46bc-9f0d-b49a5d3c3667", "10cd8160-2b8d-41c5-87cc-f683a853d5d9", "163db786-9e2a-494a-a996-de565ae52f83", "1e47fc81-0c56-45d5-aa5e-07006260dfbc", "1fd728fb-fdb3-4407-a7da-fe55bfcb5fb0", "236a12ee-2b79-4b58-b9e4-5536f5e93db7", "2648d66c-fec5-488f-9626-06991ca917e0", "362270db-6933-4ccc-8c11-25b2fe97f023", "4a0312ef-6f47-421d-9d10-354c27de8e0f", "50dd554f-ffed-4496-b770-870fef2aefe5", "5ed1f95d-736f-4fe3-9aec-d0a8875dee17", "6458e177-55ec-4b2d-8be7-4094431378ad", "672fc6e7-e445-47e3-9391-2e1d1452960a", "7229c0d6-cc4f-4e47-87b2-3b01285f502d", "73113e56-8ac2-484e-9272-06759b7d51e2", "7429f9b9-562f-439b-86cd-81f04d76d883", "746604d3-8da9-4488-8fa9-bf301d62ea0e", "867bea51-793c-4b09-b13f-44c9053b6754", "882f41c2-98ee-43f2-bf07-f033cf1c3320", "8a2d089b-7b87-4979-906e-7731b594bd4b", "8bb23d1a-7fb2-4f5d-ba6c-2a9bd13cc673", "8dcc7e92-c12c-40df-8c8b-9f9db93b11a0", "8f825f13-dadf-442c-b9e5-a1daa03611c4", "8ffdc28c-ea27-4b0c-89c3-3f9a9b40e5fd", "912b6462-49d3-435a-959e-5c5f3254d6c4", "924d12da-4a2b-46b3-82cd-bc9b38a519d0", "9459965a-f378-430a-8cb9-62778fec5713", "9608708e-7907-4bae-892c-87964aee0454", "963fcb8b-1ba3-46f1-82bd-8e92a5a024d1", "99c6feef-cee4-47b3-afc7-1f192e7f48f4", "a075034f-0363-4af4-877f-aba47a7c059d", "a428ed89-5ed1-4b1d-b095-2ee98ae54b40", "afa0be93-d4ae-46d5-b741-64bd3b4b6148", "b0fb81f5-59a4-4197-947f-26037441ea2f", "b1826077-0a6f-403d-939e-b445c334c470", "b3581ffd-a127-465b-b880-bd3770b85aad", "b5be66f6-a6a6-42dc-ab67-de8f80e96291", "b5e150af-101d-4e96-9518-dff66548dc31", "b8b4fc21-d1b6-4ee1-a6f3-4410a49e123a", "b95516e4-645d-4249-b81b-b9ca65bd2087", "b97103b8-3b7c-4f1d-8c91-451c11e8cde3", "bbf8e7fe-13c2-420c-bb2c-9c059744d599", "bd9069cc-408d-4f00-90b4-9d6c96bc0b3d", "be638691-3065-45cb-b90c-263945cd0177", "c054d202-df4b-466d-8477-2b8690030ce5", "c1e008df-5207-463e-a6a7-a823174d0bda", "cc9a22ce-f65c-40ff-9eac-43c26817f44a", "d588330f-b11c-4482-baff-49323323a8c0", "e32a0e7e-df48-4b33-bccf-1f74d395d322", "ee1930f1-09a8-4d5e-bbe9-e43547bb7f64", "fde5293a-c69b-4d77-9ec8-f3d6797d2b15"];
  return maps.map(id => `https://dynamic.brandcrowd.com/asset/logo/${id}/logo?v=4&text=`);
}
let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright("Update 'config.js'"));
  import(`${file}?update=${Date.now()}`);
});