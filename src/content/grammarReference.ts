import type { Exercise, LearningItem } from '../domain/types';

/** Batch 2 grammar: aspect, reference and countability. */
export const grammarReferenceItems: readonly LearningItem[] = [
  {
    id: 'grammar-present-perfect-continuous-unfinished',
    category: 'grammar',
    topic: 'Tense and aspect',
    level: 'C1',
    title: 'have been doing vs have done',
    meaning:
      'The continuous form highlights an activity that is still going on, or whose effects are still visible; the simple form presents a completed result or a finished amount of work.',
    examples: [
      "I've been reviewing the contract all morning, so I haven't looked at your email yet.",
      "I've reviewed the contract and sent my comments to legal.",
    ],
    commonError:
      "I've been reviewing the contract and sent my comments mixes the two viewpoints: use the simple form when the result, not the activity, is the point.",
    register: 'neutral',
    variant: 'both',
    tags: ['aspect', 'present perfect', 'time reference'],
  },
  {
    id: 'grammar-generic-the-singular',
    category: 'grammar',
    topic: 'Articles and reference',
    level: 'C1',
    title: 'The + singular noun for a whole class',
    meaning:
      "In formal and academic English, 'the' + a singular countable noun can stand for a whole class, as can a bare plural (tigers) or an uncountable noun.",
    examples: [
      'The smartphone has changed how teams coordinate their work.',
      'Whales communicate across hundreds of kilometres.',
    ],
    commonError:
      'A tiger is endangered sounds like one individual animal in many contexts; use the bare plural or the + singular for general statements.',
    register: 'formal',
    variant: 'both',
    tags: ['articles', 'generalisation', 'academic writing'],
  },
  {
    id: 'grammar-uncountable-nouns',
    category: 'grammar',
    topic: 'Countability',
    level: 'C1',
    title: 'Uncountable nouns: evidence, information, advice',
    meaning:
      'Nouns such as evidence, information, advice, research, feedback, equipment and progress are uncountable: no plural -s and no a/an. Count them with a piece of, an item of, a great deal of.',
    examples: [
      'The team collected a great deal of evidence before the hearing.',
      'She gave me three pieces of advice that changed my approach.',
    ],
    commonError:
      "Informations, an advice, evidences and equipments do not exist. Write 'some information', 'a piece of advice' or 'two items of equipment'.",
    register: 'neutral',
    variant: 'both',
    czechNote:
      "Czech counts many of these words ('informace', 'rada'), so the missing English plural feels wrong: 'advice' and 'information' never take -s.",
    tags: ['countability', 'common errors', 'academic writing'],
  },
  {
    id: 'grammar-few-little',
    category: 'grammar',
    topic: 'Quantifiers',
    level: 'C1',
    title: 'few / a few, little / a little',
    meaning:
      "'A few' and 'a little' mean some — a small but sufficient amount, and sound positive. 'Few' and 'little' alone mean not enough, almost none, and sound negative.",
    examples: [
      'A few colleagues volunteered, so we had enough people.',
      'Few colleagues volunteered, so we had to postpone the workshop.',
    ],
    commonError:
      "'Few people came' sounds like a complaint; 'a few people came' reports a small but usable number. The article changes the attitude, not the quantity.",
    register: 'neutral',
    variant: 'both',
    tags: ['quantifiers', 'nuance', 'countability'],
  },
  {
    id: 'grammar-wish-past-perfect',
    category: 'grammar',
    topic: 'Unreal past',
    level: 'C1',
    title: 'wish / if only + past perfect',
    meaning:
      "wish + past perfect expresses regret about the past. 'If only' uses the same structure and makes the regret more emphatic.",
    examples: [
      "I wish I hadn't promised a delivery date before checking with production.",
      'If only we had tested the migration on a copy of the real data.',
    ],
    commonError:
      "I wish I didn't promise yesterday mixes times: regret about a past action needs the past perfect (hadn't promised).",
    register: 'neutral',
    variant: 'both',
    tags: ['wish', 'regret', 'unreal past'],
  },
  {
    id: 'grammar-wish-would',
    category: 'grammar',
    topic: 'Unreal past',
    level: 'C1',
    title: 'wish + would (annoyance)',
    meaning:
      "wish + would criticises a repeated action or a refusal, usually by somebody else. It is not used for wishes about your own actions.",
    examples: [
      'I wish the supplier would answer emails within a week.',
      'She wishes her manager would stop rearranging meetings at the last minute.',
    ],
    commonError:
      "I wish I would finish this report is not English for your own wishes; write 'I wish I could finish this report'.",
    register: 'neutral',
    variant: 'both',
    tags: ['wish', 'annoyance', 'criticism'],
  },
];

export const grammarReferenceExercises: readonly Exercise[] = [
  {
    id: 'ex-present-perfect-continuous',
    itemId: 'grammar-present-perfect-continuous-unfinished',
    kind: 'multiple-choice',
    instructions: 'Choose the sentence that fits the situation.',
    prompt:
      'You are still working on a task and want to explain why something else is not finished yet. Which sentence is best?',
    options: [
      { id: 'a', text: "I've been rewriting the proposal all afternoon, so the figures aren't finalised yet." },
      { id: 'b', text: 'I rewrote the proposal all afternoon, so the figures are not finalised yet.' },
      { id: 'c', text: 'I have rewritten the proposal all afternoon, so the figures are not finalised yet.' },
      { id: 'd', text: 'I am rewriting the proposal all afternoon, so the figures are not finalised yet.' },
    ],
    correctOptionId: 'a',
    explanation:
      'The continuous perfect presents an activity running up to now and explains the present consequence. The past simple in (b) cuts the activity off from the present, (c) suggests a finished amount of work rather than an ongoing activity, and (d) does not combine the present continuous with "all afternoon" in this way.',
  },
  {
    id: 'ex-generic-the-singular',
    itemId: 'grammar-generic-the-singular',
    kind: 'best-expression',
    instructions: 'Choose the most natural general statement for the opening of a report.',
    prompt: 'Which opening sentence is best?',
    options: [
      { id: 'a', text: 'The electric van has become viable for urban deliveries.' },
      { id: 'b', text: 'A electric van has become viable for urban deliveries.' },
      { id: 'c', text: 'Electric van has become viable for urban deliveries.' },
      { id: 'd', text: 'The electric vans has become viable for urban deliveries.' },
    ],
    correctOptionId: 'a',
    explanation:
      "General statements about a class can use 'the' + singular noun in formal writing. Options (b) and (c) break the article rules, and (d) mixes a plural noun with a singular verb.",
  },
  {
    id: 'ex-uncountable-gap',
    itemId: 'grammar-uncountable-nouns',
    kind: 'gap-fill',
    instructions: 'Complete with the noun in brackets in its correct form: (evidence).',
    sentenceBefore: 'Before the hearing the team gathered a large amount of',
    sentenceAfter: 'that supported the claim.',
    accepted: ['evidence'],
    hint: 'The noun is uncountable, so it stays in the singular.',
    explanation:
      "Evidence is uncountable: it never takes -s and is not used with a/an. 'A large amount of evidence' is the natural pattern.",
  },
  {
    id: 'ex-few-little',
    itemId: 'grammar-few-little',
    kind: 'multiple-choice',
    instructions: 'Choose the option that matches the intended meaning.',
    prompt:
      'You want to say that only a small number of people replied and that this was almost nobody. Which sentence do you write?',
    options: [
      { id: 'a', text: 'Few people replied, so we had to postpone the workshop.' },
      { id: 'b', text: 'A few people replied, so we had to postpone the workshop.' },
      { id: 'c', text: 'Little people replied, so we had to postpone the workshop.' },
      { id: 'd', text: 'A little people replied, so we had to postpone the workshop.' },
    ],
    correctOptionId: 'a',
    explanation:
      "'Few' means almost none and justifies postponing. 'A few' means a small but usable number, which contradicts the postponement, and 'little / a little' only combine with uncountable nouns.",
  },
  {
    id: 'ex-wish-past-perfect',
    itemId: 'grammar-wish-past-perfect',
    kind: 'multiple-choice',
    instructions: 'Choose the sentence that expresses regret about the past.',
    prompt: 'Which sentence expresses regret about something that has already happened?',
    options: [
      { id: 'a', text: "I wish I hadn't promised a delivery date before checking with production." },
      { id: 'b', text: "I wish I didn't promise a delivery date before checking with production." },
      { id: 'c', text: "I wish I wouldn't promise a delivery date before checking with production." },
      { id: 'd', text: "I wish I don't promise a delivery date before checking with production." },
    ],
    correctOptionId: 'a',
    explanation:
      'Regret about a past action takes wish + past perfect. The past simple in (b) describes a present state or habit, (c) would criticise somebody else, and (d) is not grammatical after wish.',
  },
  {
    id: 'ex-wish-would',
    itemId: 'grammar-wish-would',
    kind: 'error-correction',
    instructions: 'Choose the sentence that is correct English.',
    prompt: 'Which sentence is correct?',
    options: [
      { id: 'a', text: 'I wish the supplier would answer emails within a week.' },
      { id: 'b', text: 'I wish I would answer emails within a week.' },
      { id: 'c', text: 'I wish the supplier would have answered every email within a week.' },
      { id: 'd', text: 'I wish the supplier answers emails within a week.' },
    ],
    correctOptionId: 'a',
    explanation:
      "Wish + would criticises somebody else's repeated behaviour. Option (b) applies it to the speaker's own action, (c) mixes would with a perfect form, and (d) uses the present simple after wish.",
  },
];

// __APPEND__
