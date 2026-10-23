import type { Exercise, LearningItem } from '../domain/types';

export const idiomItems: readonly LearningItem[] = [
  {
    id: 'phrasal-put-forward',
    category: 'phrasal-verb',
    topic: 'Suggesting ideas',
    level: 'C1',
    title: 'put forward',
    meaning:
      'To suggest an idea, proposal or candidate for other people to consider. Neutral to formal; common in meetings and minutes.',
    examples: [
      'She put forward a proposal to merge the two support teams.',
      'Several solutions were put forward at the workshop.',
    ],
    commonError:
      "Put forward needs an object: 'put forward a proposal'. For postponing something, use 'put off'.",
    collocations: ['put forward a proposal', 'put forward an idea', 'put forward a candidate'],
    register: 'formal',
    variant: 'both',
    tags: ['meetings', 'proposals', 'inseparable'],
  },
  {
    id: 'phrasal-come-up-against',
    category: 'phrasal-verb',
    topic: 'Problems and obstacles',
    level: 'C1',
    title: 'come up against',
    meaning:
      'To meet a problem, obstacle or opposition that you have to deal with. Inseparable; the object follows the whole verb.',
    examples: [
      'We came up against unexpected resistance from the regulator.',
      'Every developer comes up against this limitation sooner or later.',
    ],
    commonError: "Do not confuse 'come up against' (obstacles) with 'come up with' (ideas).",
    collocations: ['come up against resistance', 'come up against a problem', 'come up against opposition'],
    register: 'neutral',
    variant: 'both',
    tags: ['problems', 'phrasal verbs', 'confusable pairs'],
  },
  {
    id: 'idiom-final-straw',
    category: 'idiom',
    topic: 'Patience and limits',
    level: 'C1',
    title: 'the last / final straw',
    meaning:
      'The last in a series of problems, which finally makes you react or lose patience. From the image of a straw that breaks a camel\u2019s back.',
    examples: [
      'The third missed delivery was the final straw, and we cancelled the contract.',
      'Losing that client was the last straw for the sales director.',
    ],
    commonError:
      "The idiom is 'the last straw' or 'the final straw', not 'the last drop' or 'the final line'.",
    register: 'informal',
    variant: 'both',
    tags: ['idioms', 'frustration', 'everyday'],
  },
  {
    id: 'idiom-cut-corners',
    category: 'idiom',
    topic: 'Quality and shortcuts',
    level: 'C1',
    title: 'cut corners',
    meaning:
      'To do something in the quickest, cheapest or easiest way, usually sacrificing quality or safety. Always negative in tone.',
    examples: [
      'The inspector found that the builder had cut corners on fire safety.',
      'We cannot cut corners on testing if we want the app to be reliable.',
    ],
    commonError:
      "Do not use 'cut corners' to mean 'save time sensibly': it implies a damaging shortcut, not efficiency.",
    register: 'informal',
    variant: 'both',
    tags: ['idioms', 'quality', 'work'],
  },
];

export const idiomExercises: readonly Exercise[] = [
  {
    id: 'ex-put-forward-choice',
    itemId: 'phrasal-put-forward',
    kind: 'multiple-choice',
    instructions: 'Complete the sentence with the correct passive form.',
    prompt: 'After the meeting, three alternative designs ___ by the engineering team.',
    options: [
      { id: 'a', text: 'were put forward' },
      { id: 'b', text: 'were put off' },
      { id: 'c', text: 'were put up' },
      { id: 'd', text: 'were put out' },
    ],
    correctOptionId: 'a',
    explanation:
      "'Put forward' means suggest for consideration, so designs can be put forward. 'Put off' means postpone, 'put up' means accommodate or raise, and 'put out' means extinguish or inconvenience.",
  },
  {
    id: 'ex-come-up-against-gap',
    itemId: 'phrasal-come-up-against',
    kind: 'gap-fill',
    instructions: 'Complete with the past simple form of the phrasal verb.',
    sentenceBefore: 'During the trial we',
    sentenceAfter: 'unexpected resistance from several departments.',
    accepted: ['came up against'],
    hint: 'The object is a problem, not an idea, so this is not come up with.',
    explanation:
      "'Came up against' is used with obstacles and opposition. 'Came up with' would mean produced an idea or solution, which does not fit resistance.",
  },
  {
    id: 'ex-final-straw-choice',
    itemId: 'idiom-final-straw',
    kind: 'multiple-choice',
    instructions: 'Choose the idiom that completes the sentence.',
    prompt:
      'The report was two weeks late, the figures were wrong, and the missing signature was ___ — we switched suppliers.',
    options: [
      { id: 'a', text: 'the final straw' },
      { id: 'b', text: 'the last drop' },
      { id: 'c', text: 'the final line' },
      { id: 'd', text: 'the last point' },
    ],
    correctOptionId: 'a',
    explanation:
      "The final straw is the last problem in a series that finally makes you act. 'The last drop' and 'the final line' are not English idioms; 'the last point' is literal and has no such meaning.",
  },
  {
    id: 'ex-cut-corners-best',
    itemId: 'idiom-cut-corners',
    kind: 'best-expression',
    instructions:
      'A manager warns the team not to reduce testing just to hit the release date.',
    prompt: 'Which sentence is correct and natural?',
    options: [
      { id: 'a', text: "We mustn't cut corners on testing just to hit the release date." },
      { id: 'b', text: "We mustn't cut edges on testing just to hit the release date." },
      { id: 'c', text: "We mustn't cut the corners off testing just to hit the release date." },
      { id: 'd', text: "We mustn't cut through testing just to hit the release date." },
    ],
    correctOptionId: 'a',
    explanation:
      "The idiom is 'cut corners', and it takes 'on' when you name the area: cut corners on testing. The other versions alter the fixed expression and stop being idiomatic.",
  },
];
