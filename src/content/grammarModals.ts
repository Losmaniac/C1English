import type { Exercise, LearningItem } from '../domain/types';

/** Batch 3 grammar: modal perfects, passive and causative, formal subjunctive, reporting. */
export const grammarModalItems: readonly LearningItem[] = [
  {
    id: 'grammar-modals-past-deduction',
    category: 'grammar',
    topic: 'Modal verbs',
    level: 'C1',
    title: "must have / can't have (past deduction)",
    meaning:
      "must have + past participle means almost certainly true; can't have + past participle means almost certainly not true. Both are used to reason about the past from present evidence.",
    examples: [
      'The file must have been overwritten during the migration.',
      "She can't have received the invitation — she was on a flight all day.",
    ],
    commonError:
      "He must have went home is wrong. The pattern is modal + have + past participle: 'he must have gone home'.",
    register: 'neutral',
    variant: 'both',
    tags: ['modals', 'deduction', 'past'],
  },
  {
    id: 'grammar-modals-possibility-past',
    category: 'grammar',
    topic: 'Modal verbs',
    level: 'C1',
    title: 'might have / could have',
    meaning:
      'might have + past participle presents a past possibility, which may or may not be true. could have + past participle highlights a chance that existed but was not taken.',
    examples: [
      'They might have misread the figures; the totals do not match.',
      'We could have finished earlier if the data had arrived on time.',
    ],
    commonError:
      "'You could tell me' is present; for a missed opportunity in the past write 'you could have told me'.",
    register: 'neutral',
    variant: 'both',
    tags: ['modals', 'speculation', 'unreal past'],
  },
  {
    id: 'grammar-modals-criticism-regret',
    category: 'grammar',
    topic: 'Modal verbs',
    level: 'C1',
    title: "should have / needn't have",
    meaning:
      "should (not) have + past participle criticises a past action or expresses regret; needn't have + past participle says an action was carried out but turned out to be unnecessary.",
    examples: [
      'You should have flagged the risk in the meeting.',
      "We needn't have printed the packs — everyone used the digital version.",
    ],
    commonError:
      "needn't have done means you did it and it was unnecessary. didn't need to do means it was unnecessary, whether or not you did it.",
    register: 'neutral',
    variant: 'both',
    czechNote:
      "Czech 'nemusel jsem' covers both English patterns, so the contrast between needn't have done and didn't need to do has to be learned as a distinction.",
    tags: ['modals', 'criticism', 'nuance'],
  },
  {
    id: 'grammar-get-passive',
    category: 'grammar',
    topic: 'Passive and causative',
    level: 'C1',
    title: 'The get-passive',
    meaning:
      'get + past participle forms an informal passive, often for something unwelcome that happened, or for a process of change. It is common in speech and light writing.',
    examples: [
      'He got made redundant after the merger.',
      'The report got lost somewhere between two departments.',
    ],
    commonError:
      "The get-passive is not appropriate in formal reports: write 'He was made redundant' or 'The report was lost'.",
    register: 'informal',
    variant: 'both',
    tags: ['passive', 'register', 'spoken English'],
  },
  {
    id: 'grammar-causative-have-done',
    category: 'grammar',
    topic: 'Passive and causative',
    level: 'C1',
    title: 'have / get something done',
    meaning:
      'have something done arranges for somebody else to do it; get something done is the more informal version. The word order keeps the object after have/get.',
    examples: [
      'We had the servers audited before the launch.',
      'She got her visa extended while she was in Berlin.',
    ],
    commonError:
      "We made the servers audited is not English. Use 'had the servers audited' (arranged) or 'audited the servers' (did it yourself).",
    register: 'neutral',
    variant: 'both',
    czechNote:
      "Czech 'nechala jsem si něco udělat' has no direct English equivalent: the pattern is have + object + past participle, not a reflexive verb.",
    tags: ['causative', 'word order', 'business'],
  },
  {
    id: 'grammar-subjunctive-formal',
    category: 'grammar',
    topic: 'Subjunctive and formal structures',
    level: 'C1',
    title: 'It is essential that he be / should be',
    meaning:
      "After expressions such as it is essential, vital, crucial, essential, important, recommend, insist and demand, formal English uses the base form of the verb (that he be, that it remain) or should + base form.",
    examples: [
      'It is essential that every change be reviewed before release.',
      'The board recommends that the policy should remain unchanged for now.',
    ],
    commonError:
      "It is essential that he is informed is common but less formal. In writing, prefer 'that he be informed' or 'that he should be informed'.",
    register: 'formal',
    variant: 'both',
    tags: ['subjunctive', 'formal writing', 'recommendations'],
  },
  {
    id: 'grammar-reported-speech-backshift',
    category: 'grammar',
    topic: 'Reported speech',
    level: 'C1',
    title: 'Reported speech: when not to backshift',
    meaning:
      'Tenses usually move back one step in reported speech, but not when the statement is still true, when reporting immediately, or with a past simple that refers to a fixed past time.',
    examples: [
      'She said she works for a Danish company. (still true now)',
      'He said he was born in Brno. (fixed past fact)',
    ],
    commonError:
      "She said she worked for a Danish company suggests she may have left; if she still works there, keep the present.",
    register: 'neutral',
    variant: 'both',
    tags: ['reported speech', 'tense choice', 'business'],
  },
  {
    id: 'grammar-modal-hedging',
    category: 'grammar',
    topic: 'Modal verbs',
    level: 'C1',
    title: 'may well / is likely to / is bound to',
    meaning:
      'C1 writing hedges predictions instead of stating them flatly: may well + base verb (fairly likely), is likely to (probable), is bound to (almost certain).',
    examples: [
      'Costs may well rise once the new tariffs apply.',
      'The migration is likely to take longer than the plan suggests.',
      'Delays of that kind are bound to attract criticism.',
    ],
    commonError:
      "It will probably rise is fine but flat; in reports the hedged patterns are preferred because they signal how strong the evidence is.",
    register: 'formal',
    variant: 'both',
    tags: ['hedging', 'prediction', 'academic writing'],
  },
];

export const grammarModalExercises: readonly Exercise[] = [
  {
    id: 'ex-past-deduction-error',
    itemId: 'grammar-modals-past-deduction',
    kind: 'error-correction',
    instructions: 'Choose the grammatically correct sentence.',
    prompt: 'Which sentence is correct English?',
    options: [
      { id: 'a', text: 'She must have gone home early — her coat is not on the hook.' },
      { id: 'b', text: 'She must have went home early — her coat is not on the hook.' },
      { id: 'c', text: 'She must went home early — her coat is not on the hook.' },
      { id: 'd', text: 'She must has gone home early — her coat is not on the hook.' },
    ],
    correctOptionId: 'a',
    explanation:
      "The modal is followed by have + past participle: 'must have gone'. The base form 'have' never changes, so (b), (c) and (d) are wrong.",
  },
  {
    id: 'ex-possibility-past-gap',
    itemId: 'grammar-modals-possibility-past',
    kind: 'gap-fill',
    instructions: 'Complete with a modal and have. Both might have and could have are accepted.',
    sentenceBefore: 'We',
    sentenceAfter: 'finished earlier if the data had arrived on time.',
    accepted: ['could have', 'might have'],
    hint: 'The sentence reports a chance that existed in the past but was not taken.',
    explanation:
      "Both 'could have finished' and 'might have finished' express an unrealised past possibility. 'Could have' emphasises the missed opportunity; 'might have' sounds slightly more tentative.",
  },
  {
    id: 'ex-criticism-best',
    itemId: 'grammar-modals-criticism-regret',
    kind: 'best-expression',
    instructions:
      'Packs were printed for every delegate, but everyone used the digital version. Choose the sentence that says the printing was unnecessary.',
    prompt: 'Which sentence says the printing turned out to be unnecessary?',
    options: [
      { id: 'a', text: "We needn't have printed the packs." },
      { id: 'b', text: "We mustn't have printed the packs." },
      { id: 'c', text: "We didn't need printing the packs." },
      { id: 'd', text: "We needn't print the packs yesterday." },
    ],
    correctOptionId: 'a',
    explanation:
      "needn't have printed means we printed them and it was unnecessary. 'Shouldn't have printed' would criticise the decision itself, (b) does not exist with this meaning, (c) breaks the verb pattern, and (d) mixes the modal with a past time expression.",
  },
  {
    id: 'ex-get-passive-choice',
    itemId: 'grammar-get-passive',
    kind: 'multiple-choice',
    instructions: 'Choose the sentence that suits an informal conversation.',
    prompt: 'You are telling a colleague about a delay informally. Which sentence fits best?',
    options: [
      { id: 'a', text: 'The signed contract got lost somewhere between two departments.' },
      { id: 'b', text: 'The signed contract was getting lost somewhere between two departments.' },
      { id: 'c', text: 'The signed contract got lose somewhere between two departments.' },
      { id: 'd', text: 'The signed contract gets lost somewhere between two departments yesterday.' },
    ],
    correctOptionId: 'a',
    explanation:
      "The get-passive is 'get + past participle' and is typical of informal speech, especially for unwelcome events. (b) uses a continuous form that does not fit, (c) uses the wrong verb form, and (d) mixes a present tense with 'yesterday'.",
  },
];

export const grammarModalExercisesPartTwo: readonly Exercise[] = [
  {
    id: 'ex-causative-gap',
    itemId: 'grammar-causative-have-done',
    kind: 'gap-fill',
    instructions: 'Complete with have or get in the past simple plus the participle of (audit).',
    sentenceBefore: 'Before the launch we',
    sentenceAfter: 'the servers by an external firm.',
    accepted: ['had audited', 'got audited'],
    hint: 'You arranged for somebody else to do the work.',
    explanation:
      "The causative is have/get + object + past participle: 'we had the servers audited'. 'Got audited' is the informal equivalent and is accepted here.",
  },
  {
    id: 'ex-subjunctive-best',
    itemId: 'grammar-subjunctive-formal',
    kind: 'best-expression',
    instructions: 'Choose the sentence you would write in a formal policy document.',
    prompt: 'Which sentence is best in formal written English?',
    options: [
      { id: 'a', text: 'It is essential that every change be reviewed before release.' },
      { id: 'b', text: 'It is essential that every change is reviewed before release.' },
      { id: 'c', text: 'It is essential that every change will be reviewed before release.' },
      { id: 'd', text: 'It is essential every change being reviewed before release.' },
    ],
    correctOptionId: 'a',
    explanation:
      "After 'it is essential that', formal English uses the base form (be reviewed) or should be reviewed. (b) is possible in conversation but less formal, (c) wrongly uses will, and (d) is ungrammatical.",
  },
  {
    id: 'ex-reported-speech-choice',
    itemId: 'grammar-reported-speech-backshift',
    kind: 'multiple-choice',
    instructions: 'Choose the report that keeps the facts accurate.',
    prompt:
      'Yesterday Anna said: "I work for a Danish company." She still works there. Which report is best?',
    options: [
      { id: 'a', text: 'Anna said she works for a Danish company.' },
      { id: 'b', text: 'Anna said she worked for a Danish company.' },
      { id: 'c', text: 'Anna said she has been working for a Danish company since yesterday.' },
      { id: 'd', text: 'Anna says she would work for a Danish company.' },
    ],
    correctOptionId: 'a',
    explanation:
      'Backshift is optional when the statement is still true: keeping the present (works) avoids suggesting that she has left. (b) implies a past situation, (c) distorts the time reference, and (d) changes the meaning.',
  },
  {
    id: 'ex-hedging-gap',
    itemId: 'grammar-modal-hedging',
    kind: 'gap-fill',
    instructions: 'Complete with the modal that forms the hedge may well.',
    sentenceBefore: 'Costs',
    sentenceAfter: 'well rise once the new tariffs apply.',
    accepted: ['may'],
    hint: 'One three-letter modal verb followed by well.',
    explanation:
      "'may well rise' signals that something is fairly likely without claiming certainty. In a report it is stronger than 'might' and weaker than 'is bound to'.",
  },
];


