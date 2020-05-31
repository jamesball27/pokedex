// https://bulbapedia.bulbagarden.net/wiki/Category:Type_color_templates
const pokemonTypeColors = {
  bug: 'A8B820',
  dark: '705848',
  dragon: '7038F8',
  electric: 'F8D030',
  fairy: 'EE99AC',
  fighting: 'C03028',
  fire: 'F08030',
  flying: 'A890F0',
  ghost: '705898',
  grass: '78C850',
  ground: 'E0C068',
  ice: '98D8D8',
  normal: 'A8A878',
  poison: 'A040A0',
  psychic: 'F85888',
  rock: 'B8A038',
  steel: 'B8B8D0',
  water: '6890F0',
  unknown: '68A090',
  shadow: '000000', // made this up idk
};

// https://ant.design/docs/spec/colors
const antDesignColors = {
  red: [
    'fff1f0',
    'ffccc7',
    'ffa39e',
    'ff7875',
    'ff4d4f',
    'f5222d',
    'cf1322',
    'a8071a',
    '820014',
    '5c0011',
  ],
  volcano: [
    'fff2e8',
    'ffd8bf',
    'ffbb96',
    'ff9c6e',
    'ff7a45',
    'fa541c',
    'd4380d',
    'ad2102',
    '871400',
    '610b00',
  ],
  orange: [
    'fff7e6',
    'ffe7ba',
    'ffd591',
    'ffc069',
    'ffa940',
    'fa8c16',
    'd46b08',
    'ad4e00',
    '873800',
    '612500',
  ],
  gold: [
    'fffbe6',
    'fff1b8',
    'ffe58f',
    'ffd666',
    'ffc53d',
    'faad14',
    'd48806',
    'ad6800',
    '874d00',
    '613400',
  ],
  yellow: [
    'feffe6',
    'ffffb8',
    'fffb8f',
    'fff566',
    'ffec3d',
    'fadb14',
    'd4b106',
    'ad8b00',
    '876800',
    '614700',
  ],
  lime: [
    'fcffe6',
    'f4ffb8',
    'eaff8f',
    'd3f261',
    'bae637',
    'a0d911',
    '7cb305',
    '5b8c00',
    '3f6600',
    '254000',
  ],
  green: [
    'f6ffed',
    'd9f7be',
    'b7eb8f',
    '95de64',
    '73d13d',
    '52c41a',
    '389e0d',
    '237804',
    '135200',
    '092b00',
  ],
  cyan: [
    'e6fffb',
    'b5f5ec',
    '87e8de',
    '5cdbd3',
    '36cfc9',
    '13c2c2',
    '08979c',
    '006d75',
    '00474f',
    '002329',
  ],
  blue: [
    'e6f7ff',
    'bae7ff',
    '91d5ff',
    '69c0ff',
    '40a9ff',
    '1890ff',
    '096dd9',
    '0050b3',
    '003a8c',
    '002766',
  ],
  geekblue: [
    'f0f5ff',
    'd6e4ff',
    'adc6ff',
    '85a5ff',
    '597ef7',
    '2f54eb',
    '1d39c4',
    '10239e',
    '061178',
    '030852',
  ],
  purple: [
    'f9f0ff',
    'efdbff',
    'd3adf7',
    'b37feb',
    '9254de',
    '722ed1',
    '531dab',
    '391085',
    '22075e',
    '120338',
  ],
  magenta: [
    'fff0f6',
    'ffd6e7',
    'ffadd2',
    'ff85c0',
    'f759ab',
    'eb2f96',
    'c41d7f',
    '9e1068',
    '780650',
    '520339',
  ],
  grey: [
    'a6a6a6',
    '999999',
    '8c8c8c',
    '808080',
    '737373',
    '666666',
    '404040',
    '1a1a1a',
    '000000',
    '000000',
  ],
};

// https://stackoverflow.com/a/22692625
function hexColorDelta(hex1, hex2) {
  // get red/green/blue int values of hex1
  var r1 = parseInt(hex1.substring(0, 2), 16);
  var g1 = parseInt(hex1.substring(2, 4), 16);
  var b1 = parseInt(hex1.substring(4, 6), 16);
  // get red/green/blue int values of hex2
  var r2 = parseInt(hex2.substring(0, 2), 16);
  var g2 = parseInt(hex2.substring(2, 4), 16);
  var b2 = parseInt(hex2.substring(4, 6), 16);
  // calculate differences between reds, greens and blues
  var r = 255 - Math.abs(r1 - r2);
  var g = 255 - Math.abs(g1 - g2);
  var b = 255 - Math.abs(b1 - b2);
  // limit differences between 0 and 1
  r /= 255;
  g /= 255;
  b /= 255;
  // 0 means opposite colors, 1 means same colors
  return (r + g + b) / 3;
}

function findClosestColor() {
  const matches = {};
  for (type in pokemonTypeColors) {
    let closestMatch = { color: null, idx: null, diff: 0 };

    for (color in antDesignColors) {
      antDesignColors[color].forEach((hex, idx) => {
        const diff = hexColorDelta(pokemonTypeColors[type], hex);

        if (diff > closestMatch.diff) {
          closestMatch = { color, idx, diff, hex };
        }
      });
    }

    matches[type] = closestMatch;
  }

  return matches;
}

const matches = findClosestColor();
for (type in matches) {
  const { color, idx, hex } = matches[type];
  console.log(`${type}: ${color}-${idx} (#${hex})`);
}

// output:
// bug: lime-5 (#a0d911)
// dark: grey-5 (#666666)
// dragon: purple-5 (#722ed1)
// electric: gold-4 (#ffc53d)
// fairy: red-2 (#ffa39e)
// fighting: red-6 (#cf1322)
// fire: volcano-4 (#ff7a45)
// flying: purple-3 (#b37feb)
// ghost: grey-4 (#737373)
// grass: green-4 (#73d13d)
// ground: orange-3 (#ffc069)
// ice: cyan-2 (#87e8de)
// normal: grey-0 (#a6a6a6)
// poison: purple-4 (#9254de)
// psychic: magenta-4 (#f759ab)
// rock: lime-4 (#bae637)
// steel: geekblue-2 (#adc6ff)
// water: geekblue-4 (#597ef7)
// unknown: grey-2 (#8c8c8c)
// shadow: grey-8 (#000000)
