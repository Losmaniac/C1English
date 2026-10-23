import type { Exercise, LearningItem } from '../domain/types';

/** Batch 5 grammar: cleft sentences, fronting, discourse markers, ellipsis, future in the past. */
export const grammarEmphasisItems: readonly LearningItem[] = [
  {
    id: 'grammar-it-cleft',
    category: 'grammar',
    topic: 'Emphasis and cleft sentences',
    level: 'C1',
    title: 'It was X that ... (it-cleft)',
    meaning:
      'An it-cleft moves the important information to the end: It + be + focus + that/who + rest. It highlights one element instead of the whole sentence.',
    examples: [
      'It was the missing signature that delayed the payment.',
      'It is the team in Brno who maintain the legacy system.',
    ],
    commonError:
      "Only after the it-cleft does the verb agree with the focus: 'It was the delays that caused the problem', not 'It were the delays'.",
    register: 'neutral',
    variant: 'both',
    tags: ['cleft sentences', 'emphasis', 'writing'],
  },
  {
    id: 'grammar-wh-cleft',
    category: 'grammar',
    topic: 'Emphasis and cleft sentences',
    level: 'C1',
    title: 'What I need is ... (wh-cleft)',
    meaning:
      'A wh-cleft starts with what + clause and puts the new information at the end, which makes speech sound natural and writing sound deliberate.',
    examples: [
      'What the report lacks is a clear timescale.',
      'What we need now is a decision, not another meeting.',
    ],
    commonError:
      "The verb after the wh-clause agrees with the final noun phrase: 'What we need is two more days' is common in speech, but writing prefers 'What we need are two more days'.",
    register: 'neutral',
    variant: 'both',
    tags: ['cleft sentences', 'emphasis', 'speaking'],
  },
  {
    id: 'grammar-negative-fronting',
    category: 'grammar',
    topic: 'Inversion and emphasis',
    level: 'C1',
    title: 'Rarely / Little did ... (negative fronting)',
    meaning:
      'Fronting a negative or restrictive adverbial forces inversion: Rarely have I seen ..., Little did we know ..., Never before had the team faced ..., Only when the figures arrived did we understand.',
    examples: [
      'Rarely have I seen a migration run this smoothly.',
      'Little did we know that the supplier had already withdrawn.',
    ],
    commonError:
      "Rarely I have seen is wrong. Once the negative adverbial is first, the auxiliary comes before the subject: 'Rarely have I seen'.",
    register: 'formal',
    variant: 'both',
    tags: ['inversion', 'emphasis', 'formal writing'],
  },
  {
    id: 'grammar-discourse-markers',
    category: 'grammar',
    topic: 'Cohesion and discourse',
    level: 'C1',
    title: 'however / nevertheless / hence / thereby',
    meaning:
      'C1 writing links ideas precisely: however and nevertheless mark contrast (nevertheless is more formal and more emphatic), hence marks a consequence, thereby + -ing says how something was achieved.',
    examples: [
      'The data was incomplete. Nevertheless, the board approved the plan.',
      'Demand fell sharply, hence the decision to pause production.',
      'Costs were cut by a fifth, thereby protecting the margin.',
    ],
    commonError:
      "However is not a conjunction: 'However the data was incomplete, the board approved' is wrong. Use 'although the data was incomplete' or 'however, the board approved'.",
    register: 'formal',
    variant: 'both',
    tags: ['discourse markers', 'cohesion', 'academic writing'],
  },
  {
    id: 'grammar-ellipsis-substitution',
    category: 'grammar',
    topic: 'Cohesion and discourse',
    level: 'C1',
    title: 'so do I / neither did she / if so / do so',
    meaning:
      'Substitution avoids repetition: so + auxiliary (agreement), neither/nor + auxiliary (agreement with negatives), if so / if not, and do so for a repeated action.',
    examples: [
      'She moved to a four-day week and so did her whole team.',
      'We never received the signed copy, and neither did the client.',
      'If so, we will need to postpone publication.',
    ],
    commonError:
      "So I do is wrong as an agreement form. Match the auxiliary and invert: 'so do I', 'so did she', 'so have we'.",
    register: 'neutral',
    variant: 'both',
    tags: ['ellipsis', 'auxiliaries', 'speaking'],
  },
  {
    id: 'grammar-future-in-the-past',
    category: 'grammar',
    topic: 'Tense and aspect',
    level: 'C1',
    title: 'was going to / was to have done',
    meaning:
      'Future in the past shifts a plan into the past: was going to + infinitive (intention), would + infinitive (prediction or habit), was to have + past participle (an arrangement that did not happen).',
    examples: [
      'We were going to announce the merger on Monday.',
      'The report was to have been published in March, but the review took longer.',
    ],
    commonError:
      "'was to have been published' means it was planned but did not happen; if it did happen, use 'was published'.",
    register: 'formal',
    variant: 'both',
    tags: ['future in the past', 'time reference', 'business'],
  },
];

export const grammarEmphasisExercises: readonly Exercise[] = [
  {
    id: 'ex-it-cleft-choice',
    itemId: 'grammar-it-cleft',
    kind: 'multiple-choice',
    instructions: 'Choose the sentence that emphasises the cause correctly.',
    prompt: 'Which sentence emphasises that the missing signature caused the delay?',
    options: [
      { id: 'a', text: 'It was the missing signature that delayed the payment.' },
      { id: 'b', text: 'It were the missing signature that delayed the payment.' },
      { id: 'c', text: 'It was the missing signature that it delayed the payment.' },
      { id: 'd', text: 'Was the missing signature that delayed the payment.' },
    ],
    correctOptionId: 'a',
    explanation:
      "The it-cleft is 'It + be + focus + that/who + clause'. The verb stays singular with 'it', and the relative clause needs no extra pronoun, which rules out (b), (c) and (d).",
  },
  {
    id: 'ex-wh-cleft-best',
    itemId: 'grammar-wh-cleft',
    kind: 'best-expression',
    instructions: 'Choose the most natural sentence for a briefing.',
    prompt: 'Which sentence puts the important information at the end?',
    options: [
      { id: 'a', text: 'What the report lacks is a clear timescale.' },
      { id: 'b', text: 'What the report lacks it is a clear timescale.' },
      { id: 'c', text: 'What lacks the report is a clear timescale.' },
      { id: 'd', text: 'The report lacks what is a clear timescale.' },
    ],
    correctOptionId: 'a',
    explanation:
      "The wh-cleft is 'What + clause + be + new information'. Option (b) adds a redundant pronoun, (c) scrambles the word order, and (d) changes the meaning.",
  },
  {
    id: 'ex-negative-fronting-gap',
    itemId: 'grammar-negative-fronting',
    kind: 'gap-fill',
    instructions: 'Complete with the auxiliary that makes the inversion correct.',
    sentenceBefore: 'Rarely',
    sentenceAfter: 'I seen a migration run this smoothly.',
    accepted: ['have'],
    hint: 'The main verb is a present perfect, so the auxiliary is have.',
    explanation:
      "After the fronted negative adverbial 'rarely', the auxiliary comes before the subject: 'Rarely have I seen'. Without inversion the sentence is wrong.",
  },
  {
    id: 'ex-discourse-markers-error',
    itemId: 'grammar-discourse-markers',
    kind: 'error-correction',
    instructions: 'Choose the sentence that links the ideas correctly.',
    prompt: 'Which sentence is correct?',
    options: [
      { id: 'a', text: 'The data was incomplete. Nevertheless, the board approved the plan.' },
      { id: 'b', text: 'Nevertheless the data was incomplete, the board approved the plan.' },
      { id: 'c', text: 'The data was incomplete, nevertheless the board approved the plan without review.' },
      { id: 'd', text: 'The data was incomplete. Nevertheless approved the board the plan.' },
    ],
    correctOptionId: 'a',
    explanation:
      "Nevertheless is an adverb, not a conjunction: it starts a new sentence (or follows a semicolon) and takes a comma. Options (b) and (c) use it as if it could join two clauses.",
  },
  {
    id: 'ex-ellipsis-gap',
    itemId: 'grammar-ellipsis-substitution',
    kind: 'gap-fill',
    instructions: 'Complete with the two words that agree with the first part of the sentence.',
    sentenceBefore: 'She moved to a four-day week and so',
    sentenceAfter: 'her whole team.',
    accepted: ['did'],
    hint: 'The first verb is in the past simple, so the substitute auxiliary is did.',
    explanation:
      "Agreement is formed with so + auxiliary + subject: 'so did her whole team'. In the present simple it would be 'so does her whole team'.",
  },
  {
    id: 'ex-future-in-the-past-choice',
    itemId: 'grammar-future-in-the-past',
    kind: 'multiple-choice',
    instructions: 'Choose the sentence that says the publication was planned but did not happen.',
    prompt: 'Which sentence reports an arrangement that never took place?',
    options: [
      { id: 'a', text: 'The report was to have been published in March, but the review took longer.' },
      { id: 'b', text: 'The report was published in March, but the review took longer.' },
      { id: 'c', text: 'The report has been published in March, but the review takes longer.' },
      { id: 'd', text: 'The report was publishing in March, but the review took longer.' },
    ],
    correctOptionId: 'a',
    explanation:
      "was/were to have + past participle describes a plan that was not carried out. Option (b) states a fact, (c) mixes tenses illogically, and (d) uses the wrong passive form.",
  },
];

