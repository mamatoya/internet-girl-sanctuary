// ASCII Art utilities for Internet Girl's Learning Sanctuary

export const ASCII_HEADER = `
╔══════════════════════════════════════════════════════════════╗
║  *  . *    INTERNET GIRL'S LEARNING SANCTUARY    * .  *     ║
║    *    ~~  where curiosity meets creativity  ~~    *       ║
╚══════════════════════════════════════════════════════════════╝
`;

export const ASCII_SMALL_HEADER = `
+--[ INTERNET GIRL ]--+
|   *  SANCTUARY  *   |
+---------------------+
`;

export const ASCII_CAT = `
   /\\_/\\
  ( o.o )
   > ^ <
`;

export const ASCII_STAR = '*';
export const ASCII_SPARKLE = '~*';
export const ASCII_HEART = '<3';
export const ASCII_FLOWER = '@}->--';
export const ASCII_DIAMOND = '<>';

export const DECORATIONS = {
  stars: '* . * . * . * . *',
  waves: '~^~^~^~^~^~^~^~^~',
  dots: '. . . . . . . . .',
  dashes: '- - - - - - - - -',
  hearts: '<3 . <3 . <3 . <3',
  arrows: '>> >> >> >> >> >>',
};

export const BORDERS = {
  top: '╔═══════════════════════════════════════╗',
  bottom: '╚═══════════════════════════════════════╝',
  side: '║',
  simple: {
    horizontal: '─',
    vertical: '│',
    topLeft: '┌',
    topRight: '┐',
    bottomLeft: '└',
    bottomRight: '┘',
  },
  double: {
    horizontal: '═',
    vertical: '║',
    topLeft: '╔',
    topRight: '╗',
    bottomLeft: '╚',
    bottomRight: '╝',
  },
  rounded: {
    horizontal: '─',
    vertical: '│',
    topLeft: '╭',
    topRight: '╮',
    bottomLeft: '╰',
    bottomRight: '╯',
  },
};

export const SUBJECT_ICONS = {
  math: `
  [+]
 [-x-]
  [/]
`,
  physics: `
  ○
 /|\\
 / \\
`,
  philosophy: `
  ?
 ~~~
  !
`,
  'music-theory': `
 ♪ ♫
  ♩
 ♪ ♫
`,
};

export const CREATURES = {
  egg: `
  .--.
 /    \\
 |    |
 \\    /
  '--'
`,
  hatchling: `
   ^
  (o)
  /|\\
`,
  youngster: `
  ^-^
 (o o)
  /|\\
  / \\
`,
  teen: `
  /\\
 (oo)
<|--|>
  /\\
`,
  adult: `
  /\\___/\\
 (  o o  )
 (  =^=  )
  (______)
`,
};

export const MOOD_FACES = {
  happy: '^_^',
  content: '-_-',
  sleepy: '-.-zzz',
  sad: 'T_T',
};

// Generate a decorative line
export function generateDecorativeLine(
  width: number,
  style: keyof typeof DECORATIONS = 'stars'
): string {
  const pattern = DECORATIONS[style];
  const repeats = Math.ceil(width / pattern.length);
  return pattern.repeat(repeats).slice(0, width);
}

// Wrap text in ASCII box
export function wrapInBox(
  text: string,
  borderStyle: 'simple' | 'double' | 'rounded' = 'simple'
): string {
  const border = BORDERS[borderStyle];
  const lines = text.split('\n');
  const maxWidth = Math.max(...lines.map((l) => l.length));
  const paddedLines = lines.map(
    (l) => `${border.vertical} ${l.padEnd(maxWidth)} ${border.vertical}`
  );

  const top = `${border.topLeft}${border.horizontal.repeat(maxWidth + 2)}${border.topRight}`;
  const bottom = `${border.bottomLeft}${border.horizontal.repeat(maxWidth + 2)}${border.bottomRight}`;

  return [top, ...paddedLines, bottom].join('\n');
}

// Get random sparkle decoration
export function getRandomSparkle(): string {
  const sparkles = ['*', '~', '.', '+', 'o', '<3'];
  return sparkles[Math.floor(Math.random() * sparkles.length)];
}
