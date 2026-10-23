import type { Exercise, LearningItem } from '../domain/types';

/** Batch 4 grammar: participle clauses, relative clauses, concession, purpose, verb patterns. */
export const grammarClauseItems: readonly LearningItem[] = [
  {
    id: 'grammar-participle-clause',
    category: 'grammar',
    topic: 'Participle clauses',
    level: 'C1',
    title: 'Having finished ..., she ...',
    meaning:
      'A perfect participle clause (having + past participle) shows that one action finished before the next. The -ing participle clause shows an action happening at the same time, and it must share the subject of the main clause.',
    examples: [
      'Having reviewed the figures, she raised three objections.',
      'Walking to the office, he listened to the briefing.',
    ],
    commonError:
      "Having reviewed the figures, three objections were raised is wrong: the clause must describe the subject of the main clause, not the object.",
    register: 'formal',
    variant: 'both',
    tags: ['participle clauses', 'cohesion', 'formal writing'],
  },
  {
    id: 'grammar-reduced-relative',
    category: 'grammar',
    topic: 'Relative clauses',
    level: 'C1',
    title: 'Reduced relative clauses',
    meaning:
      'Active reduced relatives use -ing (the man sitting over there) and passive ones use the past participle (the proposal submitted last week), replacing who/which + be.',
    examples: [
      'The consultant sitting by the window drafted the framework.',
      'The proposal submitted last week is still under review.',
    ],
    commonError:
      "The proposal submitted last week by the committee is fine, but 'the proposal submitting last week' changes the meaning: active -ing would say the proposal submits something.",
    register: 'formal',
    variant: 'both',
    tags: ['relative clauses', 'reduction', 'academic writing'],
  },
  {
    id: 'grammar-relative-whose-of-which',
    category: 'grammar',
    topic: 'Relative clauses',
    level: 'C1',
    title: 'whose, of which, in which',
    meaning:
      'whose links a person or thing to something they possess; of which is the formal equivalent for objects; in which / at which are formal alternatives to where and when.',
    examples: [
      'The company whose servers failed has offered compensation.',
      'We met in a period in which budgets were frozen.',
      'The scheme, the cost of which remains unclear, was approved.',
    ],
    commonError:
      "Never write 'the company who his servers failed' or 'a period where budgets were frozen' in formal writing: use whose and in which.",
    register: 'formal',
    variant: 'both',
    tags: ['relative clauses', 'formal writing', 'prepositions'],
  },
  {
    id: 'grammar-concession',
    category: 'grammar',
    topic: 'Concession and contrast',
    level: 'C1',
    title: 'although / despite / whereas / while',
    meaning:
      "although introduces a clause; despite and in spite of take a noun or -ing form; whereas contrasts two facts; while can mean both contrast and simultaneity.",
    examples: [
      'Although the data was incomplete, the board approved the plan.',
      'Despite the incomplete data, the board approved the plan.',
      'Sales rose in the north, whereas the south stagnated.',
      'While the north improved, the south stagnated.',
    ],
    commonError:
      "Despite the data was incomplete is wrong: despite cannot introduce a clause. Write 'despite the incomplete data' or 'although the data was incomplete'.",
    register: 'neutral',
    variant: 'both',
    czechNote:
      "Czech 'přestože' covers both although and despite, so it is easy to write 'despite of' or 'despite that'. English keeps the two patterns strictly separate.",
    tags: ['concession', 'contrast', 'discourse'],
  },
  {
    id: 'grammar-purpose-result',
    category: 'grammar',
    topic: 'Purpose and result',
    level: 'C1',
    title: 'so as to / so that / for fear of',
    meaning:
      'so as to + infinitive and in order to + infinitive express purpose; so that + clause gives the intended result; for fear of + -ing and in case + clause express prevention.',
    examples: [
      'We logged every change so as to reconstruct the sequence later.',
      'She repeated the deadline twice so that nobody could claim ignorance.',
      'They took a copy of the data in case the migration failed.',
    ],
    commonError:
      "For + -ing does not express purpose in English: 'for to check' and 'for checking the data' are wrong. Use 'to check the data' or 'so as to check the data'.",
    register: 'neutral',
    variant: 'both',
    czechNote:
      "Czech uses 'aby / abych' for purpose; English switches between to + infinitive, so as to and so that + clause depending on whether a new subject is needed.",
    tags: ['purpose', 'clauses', 'common errors'],
  },
  {
    id: 'grammar-verb-patterns',
    category: 'grammar',
    topic: 'Verb patterns',
    level: 'C1',
    title: 'admit doing / refuse to do / suggest doing',
    meaning:
      'Some verbs take -ing (admit, avoid, consider, deny, suggest, recommend), others take to + infinitive (refuse, decide, manage, promise, fail), and some take both with a change of meaning (remember, stop, go on).',
    examples: [
      'She admitted approving the change without consultation.',
      'The supplier refused to extend the warranty.',
      'We recommend reviewing the contract annually.',
    ],
    commonError:
      "He suggested to postpone the meeting is wrong: suggest + -ing or suggest that + clause. 'He suggested postponing the meeting' is correct.",
    register: 'neutral',
    variant: 'both',
    tags: ['verb patterns', 'gerund', 'infinitive'],
  },
  {
    id: 'grammar-dependent-prepositions-ing',
    category: 'grammar',
    topic: 'Dependent prepositions',
    level: 'C1',
    title: 'object to / insist on / succeed in + -ing',
    meaning:
      'When a preposition follows a verb, adjective or noun, the verb after it takes -ing: object to doing, insist on doing, succeed in doing, look forward to doing, be capable of doing.',
    examples: [
      'Several staff objected to working extra weekends without notice.',
      'She insisted on reviewing the figures herself.',
      'They succeeded in reducing the backlog by half.',
    ],
    commonError:
      "I look forward to hear from you is a common slip: after the preposition 'to' the verb takes -ing, so 'look forward to hearing from you'.",
    register: 'neutral',
    variant: 'both',
    czechNote:
      "Czech marks the same idea with an infinitive ('těším se, že uslyším'), so the English -ing form after prepositions must be learned as a rule.",
    tags: ['prepositions', 'gerund', 'formal writing'],
  },
];

export const grammarClauseExercises: readonly Exercise[] = [
  {
    id: 'ex-participle-clause-error',
    itemId: 'grammar-participle-clause',
    kind: 'error-correction',
    instructions: 'Choose the sentence in which the participle clause has the right subject.',
    prompt: 'Which sentence is correct?',
    options: [
      { id: 'a', text: 'Having reviewed the figures, she raised three objections.' },
      { id: 'b', text: 'Having reviewed the figures, three objections were raised.' },
      { id: 'c', text: 'Having reviewed the figures, three objections came from her.' },
      { id: 'd', text: 'Having reviewing the figures, she raised three objections.' },
    ],
    correctOptionId: 'a',
    explanation:
      "A participle clause describes the subject of the main clause. In (b) and (c) the objections appear to have reviewed the figures (a dangling participle), and (d) uses the wrong participle form after 'having'.",
  },
  {
    id: 'ex-reduced-relative-choice',
    itemId: 'grammar-reduced-relative',
    kind: 'multiple-choice',
    instructions: 'Choose the reduced relative clause that keeps the meaning.',
    prompt:
      'Which sentence means the same as "The proposal, which was submitted last week, is still under review"?',
    options: [
      { id: 'a', text: 'The proposal submitted last week is still under review.' },
      { id: 'b', text: 'The proposal submitting last week is still under review.' },
      { id: 'c', text: 'The proposal submit last week is still under review.' },
      { id: 'd', text: 'The proposal was submitted last week is still under review.' },
    ],
    correctOptionId: 'a',
    explanation:
      "A passive relative clause reduces to the past participle: 'which was submitted' becomes 'submitted'. Option (b) uses an active -ing form, (c) uses a bare verb, and (d) keeps two finite verbs in one clause.",
  },
  {
    id: 'ex-relative-whose-gap',
    itemId: 'grammar-relative-whose-of-which',
    kind: 'gap-fill',
    instructions: 'Complete with one word that links the server failure to the company.',
    sentenceBefore: 'The company',
    sentenceAfter: 'servers failed has offered compensation.',
    accepted: ['whose'],
    hint: 'The missing word shows possession and refers to a company.',
    explanation:
      "Whose links a noun to something it possesses and works for both people and things: 'the company whose servers failed'. 'Of which' would need a different structure (the company the servers of which failed).",
  },
  {
    id: 'ex-concession-best',
    itemId: 'grammar-concession',
    kind: 'best-expression',
    instructions: 'Choose the sentence that is correct English.',
    prompt: 'Which sentence is correct?',
    options: [
      { id: 'a', text: 'Despite the incomplete data, the board approved the plan.' },
      { id: 'b', text: 'Despite the data was incomplete, the board approved the plan.' },
      { id: 'c', text: 'Despite of the incomplete data, the board approved the plan.' },
      { id: 'd', text: 'Although the incomplete data, the board approved the plan.' },
    ],
    correctOptionId: 'a',
    explanation:
      "Despite takes a noun or -ing form, not a clause, and never takes 'of'. Option (b) adds a finite clause, (c) adds an unnecessary preposition, and (d) uses although without a clause.",
  },
  {
    id: 'ex-purpose-choice',
    itemId: 'grammar-purpose-result',
    kind: 'multiple-choice',
    instructions: 'Choose the sentence that expresses purpose correctly.',
    prompt: 'Which sentence corrects the common error "We logged every change for to reconstruct the sequence"?',
    options: [
      { id: 'a', text: 'We logged every change so as to reconstruct the sequence later.' },
      { id: 'b', text: 'We logged every change for reconstructing to the sequence later.' },
      { id: 'c', text: 'We logged every change for to reconstruct the sequence later.' },
      { id: 'd', text: 'We logged every change for reconstruct the sequence later.' },
    ],
    correctOptionId: 'a',
    explanation:
      "Purpose is expressed with the infinitive ('to reconstruct'), the formal 'so as to reconstruct', or 'so that we could reconstruct'. 'For + infinitive' does not exist in English, and (b) uses the wrong preposition pattern.",
  },
  {
    id: 'ex-verb-patterns-error',
    itemId: 'grammar-verb-patterns',
    kind: 'error-correction',
    instructions: 'Choose the grammatically correct sentence.',
    prompt: 'Which sentence is grammatically correct?',
    options: [
      { id: 'a', text: 'He suggested postponing the meeting until Friday.' },
      { id: 'b', text: 'He suggested to postpone the meeting until Friday.' },
      { id: 'c', text: 'He suggested postpone the meeting until Friday.' },
      { id: 'd', text: 'He suggested us to postpone the meeting until Friday.' },
    ],
    correctOptionId: 'a',
    explanation:
      "Suggest takes -ing or a that-clause: 'suggest postponing' or 'suggest that we postpone'. Options (b) and (d) copy the pattern of verbs such as advise or ask, which do not apply to suggest.",
  },
  {
    id: 'ex-dependent-prepositions-gap',
    itemId: 'grammar-dependent-prepositions-ing',
    kind: 'gap-fill',
    instructions: 'Complete with the correct form of the verb in brackets: (hear).',
    sentenceBefore: 'I look forward to',
    sentenceAfter: 'from you about the final schedule.',
    accepted: ['hearing'],
    hint: 'After a preposition the verb takes -ing.',
    explanation:
      "In 'look forward to', 'to' is a preposition, so the verb takes -ing: 'look forward to hearing from you'. This is one of the most frequent slips in formal email writing.",
  },
];

