import type { Exercise, LearningItem } from '../domain/types';

export const vocabularyItems: readonly LearningItem[] = [
  {
    id: 'vocab-tenuous',
    category: 'vocabulary',
    topic: 'Evidence and argument',
    level: 'C1',
    title: 'tenuous',
    meaning:
      'Weak, slight and not convincing. Used about links, connections, arguments and evidence, not about physical thinness.',
    examples: [
      'The evidence for a causal link is tenuous at best.',
      'The two organisations share a tenuous connection through a former director.',
    ],
    commonError: 'Do not use tenuous for something merely small. A tenuous link is weak, not short.',
    collocations: ['a tenuous link', 'a tenuous connection', 'a tenuous argument'],
    register: 'formal',
    variant: 'both',
    czechNote:
      "Not a translation of Czech 'tenký' (thin). For physical objects use 'thin'; 'tenuous' only describes weak links or arguments.",
    tags: ['evidence', 'argument', 'false friend'],
  },
  {
    id: 'vocab-mitigate-militate',
    category: 'vocabulary',
    topic: 'Risk and effect',
    level: 'C1',
    title: 'mitigate / militate against',
    meaning:
      "'Mitigate' means make something bad less severe and is transitive: mitigate the impact. 'Militate against' means work strongly against something.",
    examples: [
      'The new procedure should mitigate the risk of data loss.',
      'A lack of funding militated against any expansion.',
    ],
    commonError:
      "Mitigate against is a common blend: write 'militate against' when you mean 'work against'.",
    collocations: ['mitigate the impact', 'mitigate the risk', 'militate against a plan'],
    register: 'formal',
    variant: 'both',
    tags: ['confusable words', 'risk', 'verb patterns'],
  },
  {
    id: 'vocab-substantiate',
    category: 'vocabulary',
    topic: 'Claims and evidence',
    level: 'C1',
    title: 'substantiate',
    meaning: 'To provide evidence that supports or proves a claim, accusation or statement.',
    examples: [
      'The auditor was unable to substantiate the figures in the report.',
      'No documents were produced to substantiate the allegation.',
    ],
    commonError:
      "Do not confuse 'substantiate' (support with evidence) with 'substantial' (large or important), and do not use 'on' after it.",
    collocations: ['substantiate a claim', 'substantiate an allegation'],
    register: 'formal',
    variant: 'both',
    tags: ['evidence', 'formal writing', 'confusable words'],
  },
  {
    id: 'vocab-pragmatic',
    category: 'vocabulary',
    topic: 'Approaches and decisions',
    level: 'C1',
    title: 'pragmatic',
    meaning:
      'Dealing with things practically, based on what works rather than on theory or ideals. Neutral to mildly approving.',
    examples: [
      'We need a pragmatic solution, not a perfect one.',
      'Her approach to the dispute was refreshingly pragmatic.',
    ],
    commonError: 'Pragmatic does not mean cynical or unprincipled; it describes a practical approach.',
    collocations: ['a pragmatic approach', 'a pragmatic solution', 'pragmatic considerations'],
    register: 'neutral',
    variant: 'both',
    tags: ['decisions', 'approval', 'business'],
  },
];

export const vocabularyExercises: readonly Exercise[] = [
  {
    id: 'ex-tenuous-choice',
    itemId: 'vocab-tenuous',
    kind: 'multiple-choice',
    instructions: 'Choose the word that fits the sentence.',
    prompt: 'The connection between the two incidents is ___ — no evidence supports it.',
    options: [
      { id: 'a', text: 'tenuous' },
      { id: 'b', text: 'tentative' },
      { id: 'c', text: 'tedious' },
      { id: 'd', text: 'tensile' },
    ],
    correctOptionId: 'a',
    explanation:
      "A tenuous link or connection is weak and unconvincing. 'Tentative' means not yet final (a tentative agreement); 'tedious' means boring; 'tensile' is a technical word about tension.",
  },
  {
    id: 'ex-mitigate-militate-gap',
    itemId: 'vocab-mitigate-militate',
    kind: 'gap-fill',
    instructions: "Complete with the correct verb in the present simple. Use 'militate' or 'mitigate'.",
    sentenceBefore: 'Several factors',
    sentenceAfter: 'against a quick resolution: limited staff, poor records and a tight deadline.',
    accepted: ['militate'],
    hint: 'The verb is followed by against and means work against.',
    explanation:
      "'Militate against' means work strongly against something. 'Mitigate' needs a direct object (mitigate the risk) and is never followed by 'against'.",
  },
  {
    id: 'ex-mitigate-choice',
    itemId: 'vocab-mitigate-militate',
    kind: 'multiple-choice',
    instructions: 'Choose the sentence that uses the verb correctly.',
    prompt: 'Which sentence uses the verb correctly?',
    options: [
      { id: 'a', text: 'The measures are intended to mitigate the impact of the delay.' },
      { id: 'b', text: 'The measures are intended to mitigate against the impact of the delay.' },
      { id: 'c', text: 'The measures are intended to militate the impact of the delay.' },
      { id: 'd', text: 'The measures are intended to mitigate the delay against its impact.' },
    ],
    correctOptionId: 'a',
    explanation:
      "'Mitigate' takes a direct object and needs no preposition: mitigate the impact. 'Militate' works the other way round: it is followed by 'against' and has no direct object.",
  },
  {
    id: 'ex-substantiate-best',
    itemId: 'vocab-substantiate',
    kind: 'best-expression',
    instructions:
      'A client makes a serious complaint but supplies no documents. Choose the formal sentence for your email.',
    prompt: 'Which sentence is correct and natural in formal writing?',
    options: [
      { id: 'a', text: 'We are unable to substantiate the claim without supporting evidence.' },
      { id: 'b', text: 'We are unable to substantial the claim without supporting evidence.' },
      { id: 'c', text: 'We are unable to substantiate on the claim without supporting evidence.' },
      { id: 'd', text: 'We are unable to substantiate the claim with no evidences.' },
    ],
    correctOptionId: 'a',
    explanation:
      "'Substantiate' means support a claim with evidence and takes a direct object. 'Substantial' is an adjective, 'substantiate' takes no preposition, and 'evidence' is uncountable.",
  },
  {
    id: 'ex-pragmatic-choice',
    itemId: 'vocab-pragmatic',
    kind: 'multiple-choice',
    instructions: 'Choose the word that fits the sentence.',
    prompt: 'The board favoured a ___ approach: fix the two critical defects now and postpone the redesign.',
    options: [
      { id: 'a', text: 'pragmatic' },
      { id: 'b', text: 'dogmatic' },
      { id: 'c', text: 'pedantic' },
      { id: 'd', text: 'erratic' },
    ],
    correctOptionId: 'a',
    explanation:
      "A pragmatic approach deals with what is practical now. 'Dogmatic' means rigidly insisting on a doctrine, 'pedantic' means over-fussy about detail, and 'erratic' means unpredictable.",
  },
];
