import type { Exercise, LearningItem } from '../domain/types';

export const grammarItems: readonly LearningItem[] = [
  {
    id: 'grammar-mixed-conditional-past-present',
    category: 'grammar',
    topic: 'Conditionals',
    level: 'C1',
    title: 'Mixed conditional: past condition, present result',
    meaning:
      'If + past perfect describes an unreal past situation; would + base verb describes its present consequence. The two halves deliberately point at different times.',
    examples: [
      "If I had taken the earlier train, I wouldn't be late for this meeting now.",
      "If she hadn't studied medicine, she wouldn't be running the clinic today.",
    ],
    commonError:
      "If I would have taken the earlier train, I wouldn't be late now. Use the past perfect in the if-clause, not 'would have'.",
    register: 'neutral',
    variant: 'both',
    tags: ['conditionals', 'hypothetical', 'time reference'],
  },
  {
    id: 'grammar-inversion-not-until',
    category: 'grammar',
    topic: 'Inversion and emphasis',
    level: 'C1',
    title: "Inversion after 'Not until'",
    meaning:
      "When a negative adverbial such as 'not until' opens the sentence, the main clause inverts: auxiliary + subject + verb. 'Not until + clause + did/have/was + subject...'",
    examples: [
      'Not until the report was published did we realise how serious the problem was.',
      'Not until much later did she admit that she had been wrong.',
    ],
    commonError:
      'Not until the report was published we realised... The fronted negative phrase forces inversion in the main clause.',
    register: 'formal',
    variant: 'both',
    tags: ['inversion', 'emphasis', 'word order'],
  },
  {
    id: 'grammar-its-high-time',
    category: 'grammar',
    topic: 'Subjunctive and unreal past',
    level: 'C1',
    title: "It's (high) time + past form",
    meaning:
      "'It's time / It's high time / It's about time + subject + past simple' says that something is overdue. With no subject, use 'It's time to + infinitive'.",
    examples: ["It's high time we updated the privacy notice.", "It's about time she was told the truth."],
    commonError:
      "It's high time we update the notice. After a subject, the past form is required even though the meaning is present.",
    register: 'neutral',
    variant: 'both',
    czechNote:
      "Czech 'je nejvyšší čas' also points to the present, so the English past form feels illogical at first: 'It's high time we left', not 'we leave'.",
    tags: ['subjunctive', 'unreal past', 'criticism'],
  },
  {
    id: 'grammar-reporting-passive',
    category: 'grammar',
    topic: 'Passive and reporting verbs',
    level: 'C1',
    title: "Reporting passive: 'is said to have done'",
    meaning:
      'Subject + be + said/believed/reported + to have + past participle reports a claim about an earlier event without naming the source.',
    examples: [
      'The minister is said to have misled Parliament.',
      'The manuscript is believed to date from the twelfth century.',
    ],
    commonError:
      'The minister is said to mislead Parliament last year. Use to have + past participle when the reported action happened before the reporting.',
    register: 'formal',
    variant: 'both',
    tags: ['passive', 'reporting verbs', 'news'],
  },
];

export const grammarExercises: readonly Exercise[] = [
  {
    id: 'ex-mixed-conditional-choice',
    itemId: 'grammar-mixed-conditional-past-present',
    kind: 'multiple-choice',
    instructions: 'Choose the sentence that describes an unreal past condition with a result in the present.',
    prompt: 'Which sentence describes an unreal past condition with a result in the present?',
    options: [
      { id: 'a', text: "If I would have checked the figures, I wouldn't be presenting the wrong numbers now." },
      { id: 'b', text: "If I had checked the figures, I wouldn't be presenting the wrong numbers now." },
      { id: 'c', text: "If I had checked the figures, I wouldn't have presented the wrong numbers now." },
      { id: 'd', text: "If I checked the figures, I wouldn't be presenting the wrong numbers now." },
    ],
    correctOptionId: 'b',
    explanation:
      "Option (b) pairs the past perfect ('had checked') with the present consequence ('wouldn't be presenting now'). Option (c) is correct English but is a pure third conditional about a past result. Option (a) puts 'would have' in the if-clause, which standard English does not do, and (d) uses a present condition, not a past one.",
  },
  {
    id: 'ex-mixed-conditional-gap',
    itemId: 'grammar-mixed-conditional-past-present',
    kind: 'gap-fill',
    instructions: "Complete with the negative past perfect form of 'spot'.",
    sentenceBefore: 'If the team',
    sentenceAfter: 'the error during testing, the app would be unusable today.',
    accepted: ["hadn't spotted", 'had not spotted'],
    hint: 'The if-clause refers to the past; the main clause shows that the result is present.',
    explanation:
      "The unreal condition sits in the past, so the if-clause needs the past perfect: 'hadn't spotted'. The present result 'would be unusable today' shows this is a mixed conditional.",
  },
  {
    id: 'ex-inversion-not-until',
    itemId: 'grammar-inversion-not-until',
    kind: 'error-correction',
    instructions: 'Choose the grammatically correct sentence.',
    prompt: 'Which sentence is grammatically correct?',
    options: [
      { id: 'a', text: 'Not until the auditors had left, we realised the scale of the loss.' },
      { id: 'b', text: 'Not until the auditors had left did we realise the scale of the loss.' },
      { id: 'c', text: 'Not until the auditors had left we did realise the scale of the loss.' },
      { id: 'd', text: 'Not until did the auditors leave we realised the scale of the loss.' },
    ],
    correctOptionId: 'b',
    explanation:
      "After the fronted 'Not until' clause, the main clause takes auxiliary + subject: 'did we realise'. The auditors' action uses the past perfect because it happened before the realisation.",
  },
  {
    id: 'ex-high-time-best',
    itemId: 'grammar-its-high-time',
    kind: 'best-expression',
    instructions:
      'A colleague has been putting off a required data-protection review for months. Choose what you say.',
    prompt: 'Which sentence is correct and natural?',
    options: [
      { id: 'a', text: "It's high time we reviewed our data-protection notice." },
      { id: 'b', text: "It's high time we review our data-protection notice." },
      { id: 'c', text: "It's high time for reviewing our data-protection notice." },
      { id: 'd', text: "It's high time we will review our data-protection notice." },
    ],
    correctOptionId: 'a',
    explanation:
      "With a subject after 'It's high time', English uses the past form ('we reviewed') to signal that the action is overdue. The other options use the present or future, or the wrong structure.",
  },
  {
    id: 'ex-reporting-passive-gap',
    itemId: 'grammar-reporting-passive',
    kind: 'gap-fill',
    instructions: "Complete with the present simple passive form of 'report'.",
    sentenceBefore: 'The company',
    sentenceAfter: 'to have paid a substantial settlement last year.',
    accepted: ['is reported'],
    hint: 'The reporting verb carries the tense; the earlier event sits in a perfect infinitive.',
    explanation:
      "The claim is made now about an earlier payment, so the reporting verb is present passive ('is reported') and the earlier event uses 'to have + past participle'.",
  },
];
