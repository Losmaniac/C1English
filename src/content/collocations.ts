import type { Exercise, LearningItem } from '../domain/types';

export const collocationItems: readonly LearningItem[] = [
  {
    id: 'colloc-raise-concerns',
    category: 'collocation',
    topic: 'Meetings and formal writing',
    level: 'C1',
    title: 'raise / voice concerns',
    meaning:
      'To express worries, especially to a group or in an official setting. Common in meetings, reports and formal emails.',
    examples: [
      'Several shareholders raised concerns about the timing of the sale.',
      'She voiced her concerns at the end of the meeting.',
    ],
    commonError:
      "Say concerns is not English. Use 'raise concerns', 'voice concerns' or 'express concern' (uncountable: no 'a').",
    collocations: ['raise concerns', 'voice concerns', 'address concerns', 'concerns have been raised'],
    register: 'formal',
    variant: 'both',
    tags: ['meetings', 'business', 'verb-noun collocation'],
  },
  {
    id: 'colloc-meet-a-deadline',
    category: 'collocation',
    topic: 'Work and deadlines',
    level: 'C1',
    title: 'meet / miss a deadline',
    meaning: 'To finish work by the agreed time, or to fail to do so.',
    examples: [
      'We met the deadline with two days to spare.',
      'The supplier missed the deadline for the third time this quarter.',
    ],
    commonError:
      "Reach a deadline is not idiomatic for completing work on time. Use 'meet' (or the more informal 'hit') and 'miss'.",
    collocations: ['meet a deadline', 'miss a deadline', 'a tight deadline', 'a deadline for something'],
    register: 'neutral',
    variant: 'both',
    tags: ['work', 'business', 'verb-noun collocation'],
  },
  {
    id: 'colloc-carry-out-research',
    category: 'collocation',
    topic: 'Research and reviews',
    level: 'C1',
    title: 'carry out / conduct research',
    meaning:
      "'Carry out' and 'conduct' collocate with research, a survey, an experiment, an inspection and a review.",
    examples: [
      'The team carried out a review of all outstanding invoices.',
      'We conducted research with forty participants.',
    ],
    commonError:
      "Make research is not English. Use 'carry out research', 'conduct research' or, informally, 'do research'.",
    collocations: ['carry out a review', 'carry out research', 'conduct a survey', 'carry out an inspection'],
    register: 'neutral',
    variant: 'both',
    tags: ['research', 'business', 'verb-noun collocation'],
  },
  {
    id: 'colloc-take-issue-with',
    category: 'collocation',
    topic: 'Disagreement',
    level: 'C1',
    title: 'take issue with',
    meaning:
      "To disagree strongly with something, especially in a discussion or in writing. The preposition is always 'with'.",
    examples: [
      'I take issue with the assumption that the delay was unavoidable.',
      "Several reviewers took issue with the report's conclusions.",
    ],
    commonError: "Not 'take issue on/against/about'; the preposition is 'with'.",
    collocations: ['take issue with a claim', 'take issue with a conclusion'],
    register: 'formal',
    variant: 'both',
    czechNote:
      "The Czech reflex is 'mít problém s' (with), which matches the English preposition here, but 'take issue' is more formal than 'have a problem with'.",
    tags: ['disagreement', 'meetings', 'prepositions'],
  },
];

export const collocationExercises: readonly Exercise[] = [
  {
    id: 'ex-raise-concerns-gap',
    itemId: 'colloc-raise-concerns',
    kind: 'gap-fill',
    instructions: 'Complete with the verb in the past simple. Two verbs from the item are accepted.',
    sentenceBefore: 'Several members',
    sentenceAfter: "concerns about the proposed timetable at yesterday's meeting.",
    accepted: ['raised', 'voiced'],
    hint: 'One verb is neutral-formal, the other slightly more formal. Both collocate with concerns.',
    explanation:
      "Both 'raised concerns' and 'voiced concerns' are standard collocations. 'Said concerns' does not exist, and 'expressed a concern' would need the uncountable form 'expressed concern'.",
  },
  {
    id: 'ex-meet-deadline-choice',
    itemId: 'colloc-meet-a-deadline',
    kind: 'error-correction',
    instructions: 'Choose the most natural sentence.',
    prompt: 'Which sentence is the most natural English?',
    options: [
      { id: 'a', text: 'We reached the deadline with two days to spare.' },
      { id: 'b', text: 'We met the deadline with two days to spare.' },
      { id: 'c', text: 'We arrived the deadline with two days to spare.' },
      { id: 'd', text: 'We fulfilled the deadline with two days to spare.' },
    ],
    correctOptionId: 'b',
    explanation:
      "English speakers meet (or informally hit) a deadline, and miss one. 'Reach the deadline' suggests arriving at a point in time rather than completing the work, and 'fulfil a deadline' is not idiomatic.",
  },
  {
    id: 'ex-carry-out-gap',
    itemId: 'colloc-carry-out-research',
    kind: 'collocation-match',
    instructions: 'Complete with the past simple. Two standard verbs are accepted.',
    sentenceBefore: 'Before changing the process, we',
    sentenceAfter: 'a full risk assessment.',
    accepted: ['carried out', 'conducted'],
    hint: 'Think of the verbs that collocate with assessment, survey and research.',
    explanation:
      "'Carried out' and 'conducted' both collocate with a risk assessment. 'Made a risk assessment' is possible informally but far less natural in professional writing.",
  },
  {
    id: 'ex-take-issue-best',
    itemId: 'colloc-take-issue-with',
    kind: 'best-expression',
    instructions:
      "In a meeting you want to disagree politely but firmly with a colleague's conclusion.",
    prompt: 'Which sentence uses the expression correctly?',
    options: [
      { id: 'a', text: "I'd take issue with the conclusion that the delay was unavoidable." },
      { id: 'b', text: "I'd take issue on the conclusion that the delay was unavoidable." },
      { id: 'c', text: "I'd take issue against the conclusion that the delay was unavoidable." },
      { id: 'd', text: "I'd take an issue about the conclusion that the delay was unavoidable." },
    ],
    correctOptionId: 'a',
    explanation:
      "The fixed pattern is 'take issue with something' — no article, and the preposition is always 'with'. It signals firm disagreement while remaining professional.",
  },
];
