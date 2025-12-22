import type { CreatureStage, CreatureMood } from '../../store/types';

// Pixel art sprites as 2D arrays
// 0 = transparent, 1 = primary color, 2 = secondary color, 3 = accent

export type SpriteData = number[][];

export const CREATURE_SPRITES: Record<CreatureStage, SpriteData> = {
  // Stage 0: Egg
  0: [
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 2, 2, 2, 1, 0, 0],
    [0, 1, 2, 2, 3, 2, 2, 1, 0],
    [0, 1, 2, 2, 2, 2, 2, 1, 0],
    [0, 1, 2, 3, 2, 3, 2, 1, 0],
    [0, 1, 2, 2, 2, 2, 2, 1, 0],
    [0, 0, 1, 2, 2, 2, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
  ],

  // Stage 1: Hatchling - tiny blob with eyes
  1: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 2, 2, 2, 1, 0, 0],
    [0, 1, 2, 3, 2, 3, 2, 1, 0],
    [0, 1, 2, 2, 2, 2, 2, 1, 0],
    [0, 0, 1, 2, 2, 2, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],

  // Stage 2: Youngster - has little limbs
  2: [
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 2, 2, 2, 1, 0, 0],
    [0, 1, 2, 3, 2, 3, 2, 1, 0],
    [0, 1, 2, 2, 2, 2, 2, 1, 0],
    [1, 0, 1, 2, 2, 2, 1, 0, 1],
    [0, 0, 0, 1, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0],
  ],

  // Stage 3: Teen - bigger, more defined
  3: [
    [0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 2, 3, 2, 3, 2, 1, 0],
    [0, 1, 2, 2, 2, 2, 2, 1, 0],
    [1, 1, 2, 2, 2, 2, 2, 1, 1],
    [0, 1, 2, 2, 2, 2, 2, 1, 0],
    [0, 0, 1, 1, 0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0],
  ],

  // Stage 4: Adult - fully evolved!
  4: [
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 2, 3, 2, 2, 2, 3, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 3, 2, 2, 2, 1],
    [0, 1, 2, 2, 2, 2, 2, 1, 0],
    [0, 1, 1, 0, 0, 0, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
  ],
};

// Eye variations based on mood
export const MOOD_EYES: Record<CreatureMood, number[][]> = {
  happy: [
    [0, 3, 0, 3, 0], // ^_^
  ],
  content: [
    [3, 0, 3], // -_-
  ],
  sleepy: [
    [3, 3, 3], // zzz
  ],
  sad: [
    [0, 3, 3, 0], // T_T
  ],
};

// Messages based on mood
export const MOOD_MESSAGES: Record<CreatureMood, string[]> = {
  happy: [
    "you're showing up. that's the hardest part.",
    'consistency > intensity. you get it.',
    'look at you go!',
    'proud of you.',
  ],
  content: [
    "hey, you're here. that counts.",
    'one step at a time, yeah?',
    "let's learn something today.",
    'ready when you are.',
  ],
  sleepy: [
    'missed yesterday? no big deal. try again today.',
    'rest is part of learning too.',
    'take your time.',
    "it's okay to go slow.",
  ],
  sad: [
    'i miss you. even 5 minutes counts.',
    'you said you wanted this. i believe you.',
    "hey... it's been a while.",
    'still here, waiting for you.',
  ],
};

export function getRandomMessage(mood: CreatureMood): string {
  const messages = MOOD_MESSAGES[mood];
  return messages[Math.floor(Math.random() * messages.length)];
}

// Stage names
export const STAGE_NAMES: Record<CreatureStage, string> = {
  0: 'egg',
  1: 'hatchling',
  2: 'youngster',
  3: 'teen',
  4: 'adult',
};
