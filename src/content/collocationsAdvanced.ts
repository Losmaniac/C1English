import type { Exercise, LearningItem } from '../domain/types';

/** Batch 2 collocations: the verb + noun pairs that carry business and academic meaning. */
export const collocationAdvancedItems: readonly LearningItem[] = [
  {
    id: 'colloc-take-a-decision',
    category: 'collocation',
    topic: 'Decisions',
    level: 'C1',
    title: 'take / make a decision',
    meaning:
      'British English prefers take a decision; American English prefers make a decision. Both are correct, and the choice signals the variety you are writing in.',
    examples: [
      'The committee will take a decision on the budget on Thursday.',
      'They made a decision to postpone the launch.',
    ],
    commonError:
      "Do not mix the two forms inside one document, and never write 'do a decision'.",
    collocations: ['take a decision', 'make a decision', 'reach a decision', 'postpone a decision'],
    register: 'neutral',
    variant: 'both',
    czechNote:
      "Czech 'udělat rozhodnutí' tempts learners towards 'do a decision'; English uses take or make.",
    tags: ['decisions', 'British English', 'business'],
  },
  {
    id: 'colloc-bear-in-mind',
    category: 'collocation',
    topic: 'Considerations',
    level: 'C1',
    title: 'bear in mind',
    meaning:
      'to keep something in your thoughts when making a judgement or plan. Slightly formal and very common in instructions.',
    examples: [
      'Bear in mind that the figures exclude VAT.',
      'This is a first estimate; bear that in mind when you plan.',
    ],
    commonError:
      "The object goes inside the phrase: 'bear in mind the deadline', not 'bear the deadline in mind' in formal writing (though the split form exists in speech).",
    collocations: ['bear in mind that', 'bear in mind the deadline', 'worth bearing in mind'],
    register: 'formal',
    variant: 'both',
    tags: ['instructions', 'formal writing', 'considerations'],
  },
  {
    id: 'colloc-come-to-terms-with',
    category: 'collocation',
    topic: 'Accepting difficulty',
    level: 'C1',
    title: 'come to terms with',
    meaning:
      'to gradually accept something difficult or unwelcome. It describes an emotional or strategic process, not a single decision.',
    examples: [
      'The team is still coming to terms with the loss of the contract.',
      'It took the board a year to come to terms with the new regulation.',
    ],
    commonError:
      "Not 'come to term with' or 'come in terms with'. The fixed phrase is 'come to terms with'.",
    collocations: ['come to terms with the loss', 'come to terms with reality'],
    register: 'neutral',
    variant: 'both',
    tags: ['acceptance', 'fixed phrases', 'difficulties'],
  },
  {
    id: 'colloc-draw-a-conclusion',
    category: 'collocation',
    topic: 'Reasoning',
    level: 'C1',
    title: 'draw a conclusion',
    meaning:
      'to decide what something means after considering the evidence. Also used with conclusions in the plural and with the adjective hasty.',
    examples: [
      'It is too early to draw a conclusion from one quarter of data.',
      'The auditors drew two conclusions from the interviews.',
    ],
    commonError:
      "Use 'draw' or 'reach' a conclusion, not 'make' or 'do' a conclusion. 'Jump to conclusions' means deciding too quickly.",
    collocations: ['draw a conclusion', 'reach a conclusion', 'jump to conclusions'],
    register: 'neutral',
    variant: 'both',
    tags: ['reasoning', 'evidence', 'academic writing'],
  },
  {
    id: 'colloc-set-a-precedent',
    category: 'collocation',
    topic: 'Rules and consequences',
    level: 'C1',
    title: 'set a precedent',
    meaning:
      'to establish an example that later decisions will be expected to follow. Often used when someone worries about the consequences of a concession.',
    examples: [
      'Approving this exception would set a precedent for other teams.',
      'The ruling set a precedent for similar cases.',
    ],
    commonError:
      "Note the pattern: set a precedent for something or for somebody. 'Give a precedent' does not exist.",
    collocations: ['set a precedent', 'a dangerous precedent', 'follow a precedent'],
    register: 'formal',
    variant: 'both',
    tags: ['rules', 'law', 'consequences'],
  },
  {
    id: 'colloc-bridge-the-gap',
    category: 'collocation',
    topic: 'Relations and change',
    level: 'C1',
    title: 'bridge the gap',
    meaning:
      'to reduce the difference between two things or groups, for example between skills and requirements, or between two departments.',
    examples: [
      'The training programme is designed to bridge the gap between theory and daily work.',
      'A single interface bridged the gap between the two systems.',
    ],
    commonError:
      "The gap is bridged, not 'jumped' or 'filled in' in this meaning. 'Narrow the gap' means reduce it partly; 'bridge' suggests connecting the two sides.",
    collocations: ['bridge the gap between', 'close the gap', 'narrow the gap'],
    register: 'neutral',
    variant: 'both',
    tags: ['change', 'relations', 'business'],
  },
  {
    id: 'colloc-incur-costs',
    category: 'collocation',
    topic: 'Money and obligations',
    level: 'C1',
    title: 'incur costs',
    meaning:
      'to become responsible for costs, losses, penalties or debts as a result of an action. The subject is usually the organisation or the action, not the money.',
    examples: [
      'Cancelling the order would incur significant costs.',
      'The delay incurred penalties of two thousand euros.',
    ],
    commonError:
      "You incur costs or penalties; you do not 'get' or 'receive' them. Also note the passive: 'costs were incurred'.",
    collocations: ['incur costs', 'incur a penalty', 'incur a loss', 'costs incurred'],
    register: 'formal',
    variant: 'both',
    tags: ['money', 'contracts', 'formal writing'],
  },
  {
    id: 'colloc-pose-a-threat',
    category: 'collocation',
    topic: 'Risk and danger',
    level: 'C1',
    title: 'pose a threat / pose a risk',
    meaning:
      'to be a possible source of danger, harm or difficulty. Posed by somebody or something follows as a passive phrase.',
    examples: [
      'Unpatched servers pose a threat to the whole network.',
      'The change poses a risk to the delivery date.',
    ],
    commonError:
      "The pattern is 'pose a threat to something', not 'pose a threat for'. For people who are dangerous, 'present a threat' is also used.",
    collocations: ['pose a threat to', 'pose a risk', 'the threat posed by'],
    register: 'formal',
    variant: 'both',
    tags: ['risk', 'security', 'formal writing'],
  },
  {
    id: 'colloc-strike-a-balance',
    category: 'collocation',
    topic: 'Competing priorities',
    level: 'C1',
    title: 'strike a balance',
    meaning:
      'to find a sensible middle point between two competing needs, such as speed and quality, or cost and flexibility.',
    examples: [
      'The team struck a balance between speed and reliability.',
      'We need to strike a balance between automation and human review.',
    ],
    commonError:
      "The pattern is 'strike a balance between A and B'. 'Find a balance' is possible, but 'keep a balance between' changes the meaning to maintenance.",
    collocations: ['strike a balance between', 'the right balance', 'a fine balance'],
    register: 'neutral',
    variant: 'both',
    tags: ['priorities', 'negotiation', 'business'],
  },
  {
    id: 'colloc-tackle-an-issue',
    category: 'collocation',
    topic: 'Problems and solutions',
    level: 'C1',
    title: 'tackle an issue',
    meaning:
      "to deal with a problem actively and deliberately. The verb is stronger than 'address' and suggests effort.",
    examples: [
      'The new lead wants to tackle the backlog before hiring.',
      'Nothing was done to tackle the underlying issue.',
    ],
    commonError:
      "Tackle takes a direct object: tackle the issue, not 'tackle with the issue'. 'Deal with' needs 'with'; 'tackle' does not.",
    collocations: ['tackle an issue', 'tackle a problem', 'tackle the backlog'],
    register: 'neutral',
    variant: 'both',
    tags: ['problems', 'verb patterns', 'management'],
  },
  {
    id: 'colloc-reach-an-agreement',
    category: 'collocation',
    topic: 'Negotiation',
    level: 'C1',
    title: 'reach an agreement',
    meaning:
      'to arrive at an agreement after discussion. Used with reach, come to, and arrive at; the parties involved follow with between or with.',
    examples: [
      'The two sides reached an agreement on the payment schedule.',
      'We came to an agreement after three rounds of talks.',
    ],
    commonError:
      "Do not write 'do an agreement' or 'make a deal with an agreement'. Also note 'a tentative agreement' when it is not final.",
    collocations: ['reach an agreement', 'come to an agreement', 'an agreement between'],
    register: 'formal',
    variant: 'both',
    tags: ['negotiation', 'contracts', 'business'],
  },
  {
    id: 'colloc-meet-expectations',
    category: 'collocation',
    topic: 'Performance',
    level: 'C1',
    title: 'meet / exceed expectations',
    meaning:
      'to perform as well as, or better than, what was expected. Fail to meet expectations is the standard negative form.',
    examples: [
      'The first release met expectations but did not exceed them.',
      'Service levels failed to meet expectations for two months.',
    ],
    commonError:
      "Expectations are met, exceeded or managed; they are not 'fulfilled' in standard English, and they are not 'reached'.",
    collocations: ['meet expectations', 'exceed expectations', 'manage expectations', 'fall short of expectations'],
    register: 'neutral',
    variant: 'both',
    tags: ['performance', 'business', 'collocation'],
  },
  {
    id: 'colloc-run-a-risk',
    category: 'collocation',
    topic: 'Risk',
    level: 'C1',
    title: 'run a risk / run the risk of',
    meaning:
      'to expose yourself to a possible bad outcome. The pattern is run the risk of + -ing, or the shorter run a risk.',
    examples: [
      'Shipping without a second test runs the risk of a failed release.',
      'We ran a risk by relying on a single supplier.',
    ],
    commonError:
      "It is 'run a risk', not 'make a risk' or 'take a risk' when you mean an avoidable exposure. 'Take a risk' is a deliberate, calculated choice.",
    collocations: ['run the risk of', 'run a risk', 'at risk of'],
    register: 'neutral',
    variant: 'both',
    tags: ['risk', 'verb-noun collocation', 'business'],
  },
  {
    id: 'colloc-shed-light-on',
    category: 'collocation',
    topic: 'Explaining',
    level: 'C1',
    title: 'shed light on',
    meaning:
      'to make something easier to understand by providing information, especially about a difficult or unclear matter.',
    examples: [
      'The interviews shed light on why the handover failed.',
      'A short log analysis shed light on the pattern of errors.',
    ],
    commonError:
      "The preposition is 'on': shed light on a problem. Note also 'cast light on', which is a formal variant.",
    collocations: ['shed light on', 'cast light on', 'throw light on'],
    register: 'formal',
    variant: 'both',
    tags: ['explaining', 'research', 'formal writing'],
  },
  {
    id: 'colloc-pave-the-way',
    category: 'collocation',
    topic: 'Change over time',
    level: 'C1',
    title: 'pave the way for',
    meaning:
      'to make something possible or easier in the future by preparing the ground now.',
    examples: [
      'The pilot paved the way for a full migration in the spring.',
      'Automating the checks paved the way for same-day releases.',
    ],
    commonError:
      "The phrase is 'pave the way for something', not 'pave the way to' in this meaning, and never 'pavement the way'.",
    collocations: ['pave the way for', 'clear the way for', 'lay the groundwork for'],
    register: 'neutral',
    variant: 'both',
    tags: ['change', 'fixed phrases', 'business'],
  },
  {
    id: 'colloc-take-into-account',
    category: 'collocation',
    topic: 'Considerations',
    level: 'C1',
    title: 'take something into account',
    meaning:
      "to include a factor in your judgement or calculation. The related forms are 'account for' and 'allow for'.",
    examples: [
      'The estimate takes seasonal demand into account.',
      'We should take into account that two people are on leave.',
    ],
    commonError:
      "Note the word order options: 'take the delay into account' or formal 'take into account the delay'. Not 'take into account of the delay'.",
    collocations: ['take into account', 'take account of', 'allow for'],
    register: 'formal',
    variant: 'both',
    tags: ['considerations', 'formal writing', 'planning'],
  },
  {
    id: 'colloc-fulfil-a-requirement',
    category: 'collocation',
    topic: 'Compliance',
    level: 'C1',
    title: 'fulfil / meet a requirement',
    meaning:
      'to satisfy a rule, condition or specification. Fulfil collocates with requirements, obligations, conditions and criteria; meet collocates with requirements, standards, deadlines and expectations.',
    examples: [
      'The supplier fulfils all the safety requirements in the contract.',
      'The design must meet the requirements of the regulator.',
    ],
    commonError:
      "Requirement pairs with meet, fulfil, satisfy or comply with, but not with 'reach' or 'complete'.",
    collocations: ['meet the requirements', 'fulfil a requirement', 'comply with the requirements'],
    register: 'formal',
    variant: 'both',
    tags: ['compliance', 'contracts', 'formal writing'],
  },
  {
    id: 'colloc-place-emphasis-on',
    category: 'collocation',
    topic: 'Priorities',
    level: 'C1',
    title: 'place emphasis on',
    meaning:
      'to give special importance to something. Alternatives are put emphasis on, lay emphasis on and focus on.',
    examples: [
      'The training places emphasis on writing clear updates.',
      'The report put the emphasis on prevention rather than repair.',
    ],
    commonError:
      "The noun takes 'on': emphasis on quality. Do not write 'emphasis in quality' or 'emphasis to quality'.",
    collocations: ['place emphasis on', 'put the emphasis on', 'shift the emphasis to'],
    register: 'formal',
    variant: 'both',
    tags: ['priorities', 'prepositions', 'formal writing'],
  },
  {
    id: 'colloc-express-reservations',
    category: 'collocation',
    topic: 'Disagreement',
    level: 'C1',
    title: 'express reservations about',
    meaning:
      "to state doubts or objections politely, often while agreeing in principle. More diplomatic than 'disagree'.",
    examples: [
      'Two members expressed reservations about the timescale.',
      'We support the plan, with reservations about the cost.',
    ],
    commonError:
      "The preposition is 'about' or 'with regard to'; reservations are expressed, voiced or held. Not 'make reservations about' in this meaning.",
    collocations: ['express reservations about', 'with reservations', 'have reservations'],
    register: 'formal',
    variant: 'both',
    tags: ['diplomacy', 'meetings', 'formal writing'],
  },
  {
    id: 'colloc-keep-track-of',
    category: 'collocation',
    topic: 'Monitoring',
    level: 'C1',
    title: 'keep track of',
    meaning:
      'to monitor something continuously so that you always know its current state, especially when many items are involved.',
    examples: [
      'A shared board keeps track of who is waiting for what.',
      'It is hard to keep track of every change without a log.',
    ],
    commonError:
      "The preposition is 'of': keep track of the deadlines. Note the opposite: 'lose track of time or of a document'.",
    collocations: ['keep track of', 'lose track of', 'track progress'],
    register: 'neutral',
    variant: 'both',
    tags: ['monitoring', 'projects', 'collocation'],
  },
];

export const collocationAdvancedExercises: readonly Exercise[] = [
  {
    id: 'ex-take-a-decision-choice',
    itemId: 'colloc-take-a-decision',
    kind: 'multiple-choice',
    instructions: 'Choose the option that is correct in British English.',
    prompt: 'Which sentence is most natural in British English?',
    options: [
      { id: 'a', text: 'The committee will take a decision on the budget on Thursday.' },
      { id: 'b', text: 'The committee will do a decision on the budget on Thursday.' },
      { id: 'c', text: 'The committee will make a decision on the budget on Thursday.' },
      { id: 'd', text: 'The committee will give a decision on the budget on Thursday.' },
    ],
    correctOptionId: 'a',
    explanation:
      "Both (a) and (c) are correct English: 'take a decision' is the British preference and 'make a decision' the American one, so (a) is the best answer in a British English exercise. 'Do a decision' is not English, and 'give a decision' means announce one.",
  },
  {
    id: 'ex-bear-in-mind-gap',
    itemId: 'colloc-bear-in-mind',
    kind: 'gap-fill',
    instructions: 'Complete the fixed phrase with three words.',
    sentenceBefore: 'Bear',
    sentenceAfter: 'that the figures exclude VAT.',
    accepted: ['in mind'],
    hint: 'The phrase means "keep this in your thoughts".',
    explanation:
      "The fixed expression is 'bear in mind that ...'. Note the variant with a noun inside: 'bear in mind the deadline'.",
  },
  {
    id: 'ex-come-to-terms-choice',
    itemId: 'colloc-come-to-terms-with',
    kind: 'error-correction',
    instructions: 'Choose the sentence with the correct form of the fixed phrase.',
    prompt: 'Which sentence is correct?',
    options: [
      { id: 'a', text: 'The team is still coming to terms with the loss of the contract.' },
      { id: 'b', text: 'The team is still coming to term with the loss of the contract.' },
      { id: 'c', text: 'The team is still coming in terms with the loss of the contract.' },
      { id: 'd', text: 'The team is still coming to terms of the loss of the contract.' },
    ],
    correctOptionId: 'a',
    explanation:
      "The fixed phrase is 'come to terms with something' — terms in the plural and the preposition 'with'.",
  },
  {
    id: 'ex-draw-a-conclusion-choice',
    itemId: 'colloc-draw-a-conclusion',
    kind: 'multiple-choice',
    instructions: 'Choose the verb that collocates with conclusion.',
    prompt: 'It is too early to ___ a conclusion from one quarter of data.',
    options: [
      { id: 'a', text: 'draw' },
      { id: 'b', text: 'make' },
      { id: 'c', text: 'do' },
      { id: 'd', text: 'give' },
    ],
    correctOptionId: 'a',
    explanation:
      "English draws or reaches conclusions. 'Make a conclusion' and 'do a conclusion' are typical translation errors, and 'give a conclusion' has no such meaning.",
  },
];

export const collocationAdvancedExercisesPartTwo: readonly Exercise[] = [
  {
    id: 'ex-set-a-precedent-gap',
    itemId: 'colloc-set-a-precedent',
    kind: 'gap-fill',
    instructions: 'Complete with the verb that collocates with precedent, in the base form.',
    sentenceBefore: 'Approving this exception would',
    sentenceAfter: 'a precedent for other teams.',
    accepted: ['set'],
    hint: 'The verb also collocates with a record, a date and an example.',
    explanation:
      "English sets a precedent. The pattern is 'set a precedent for somebody or something', and the collocation is fixed: 'give a precedent' does not exist.",
  },
  {
    id: 'ex-bridge-the-gap-choice',
    itemId: 'colloc-bridge-the-gap',
    kind: 'multiple-choice',
    instructions: 'Choose the verb that fits the sentence.',
    prompt: 'The training programme is designed to ___ the gap between theory and daily work.',
    options: [
      { id: 'a', text: 'bridge' },
      { id: 'b', text: 'jump' },
      { id: 'c', text: 'cross' },
      { id: 'd', text: 'break' },
    ],
    correctOptionId: 'a',
    explanation:
      "The collocation is 'bridge the gap between A and B'. 'Narrow the gap' is possible when you reduce it partly; 'jump' and 'cross' belong to physical movement.",
  },
  {
    id: 'ex-incur-costs-choice',
    itemId: 'colloc-incur-costs',
    kind: 'multiple-choice',
    instructions: 'Choose the verb that collocates with costs and penalties.',
    prompt: 'Cancelling the order would ___ significant costs.',
    options: [
      { id: 'a', text: 'incur' },
      { id: 'b', text: 'get' },
      { id: 'c', text: 'receive' },
      { id: 'd', text: 'take' },
    ],
    correctOptionId: 'a',
    explanation:
      "Costs, penalties and losses are incurred, which means you become responsible for them. 'Get' and 'receive' suggest somebody hands them to you, and 'take costs' has no such meaning.",
  },
  {
    id: 'ex-pose-a-threat-gap',
    itemId: 'colloc-pose-a-threat',
    kind: 'gap-fill',
    instructions: 'Complete with the preposition that follows threat in this pattern.',
    sentenceBefore: 'Unpatched servers pose a threat',
    sentenceAfter: 'the whole network.',
    accepted: ['to'],
    hint: 'The same pattern is used in "a risk to the delivery date".',
    explanation:
      "The pattern is 'pose a threat to something'. The passive form is equally common: 'the threat posed by unpatched servers'.",
  },
];

export const collocationAdvancedExercisesPartThree: readonly Exercise[] = [
  {
    id: 'ex-strike-a-balance-gap',
    itemId: 'colloc-strike-a-balance',
    kind: 'gap-fill',
    instructions: 'Complete with the verb that collocates with balance, in the past simple.',
    sentenceBefore: 'The team',
    sentenceAfter: 'a balance between speed and reliability.',
    accepted: ['struck'],
    hint: 'The same verb is used in "strike a deal" and "strike a chord".',
    explanation:
      "English strikes a balance between two competing needs. The pattern is fixed: 'strike a balance between A and B'.",
  },
  {
    id: 'ex-tackle-an-issue-error',
    itemId: 'colloc-tackle-an-issue',
    kind: 'error-correction',
    instructions: 'Choose the grammatically correct sentence.',
    prompt: 'Which sentence is correct?',
    options: [
      { id: 'a', text: 'The new lead wants to tackle the backlog before hiring.' },
      { id: 'b', text: 'The new lead wants to tackle with the backlog before hiring.' },
      { id: 'c', text: 'The new lead wants to tackle on the backlog before hiring.' },
      { id: 'd', text: 'The new lead wants to tackle to the backlog before hiring.' },
    ],
    correctOptionId: 'a',
    explanation:
      "Tackle takes a direct object with no preposition. If you prefer 'deal', then 'deal with the backlog' is required — the two patterns cannot be mixed.",
  },
  {
    id: 'ex-reach-an-agreement-choice',
    itemId: 'colloc-reach-an-agreement',
    kind: 'multiple-choice',
    instructions: 'Choose the verb that collocates with agreement.',
    prompt: 'After three rounds of talks, the two sides ___ an agreement on the payment schedule.',
    options: [
      { id: 'a', text: 'reached' },
      { id: 'b', text: 'did' },
      { id: 'c', text: 'made up' },
      { id: 'd', text: 'completed' },
    ],
    correctOptionId: 'a',
    explanation:
      "English reaches, comes to or arrives at an agreement. 'Do an agreement' is a translation error, 'made up' means invented or reconciled, and 'completed an agreement' means finished drafting it.",
  },
  {
    id: 'ex-meet-expectations-gap',
    itemId: 'colloc-meet-expectations',
    kind: 'gap-fill',
    instructions: 'Complete with the verb that means "do as well as expected", in the past simple.',
    sentenceBefore: 'The first release',
    sentenceAfter: 'expectations but did not exceed them.',
    accepted: ['met'],
    hint: 'The same verb is used in "meet a deadline".',
    explanation:
      "Expectations are met, exceeded, managed or fallen short of. 'Met' fits the sentence, and the same verb collocates with deadlines, standards and requirements.",
  },
];

export const collocationAdvancedExercisesPartFour: readonly Exercise[] = [
  {
    id: 'ex-run-a-risk-choice',
    itemId: 'colloc-run-a-risk',
    kind: 'multiple-choice',
    instructions: 'Choose the sentence that means the exposure was avoidable.',
    prompt: 'Which sentence warns about an unnecessary exposure?',
    options: [
      { id: 'a', text: 'Shipping without a second test runs the risk of a failed release.' },
      { id: 'b', text: 'Shipping without a second test makes a risk of a failed release.' },
      { id: 'c', text: 'Shipping without a second test does a risk of a failed release.' },
      { id: 'd', text: 'Shipping without a second test puts a risk of a failed release.' },
    ],
    correctOptionId: 'a',
    explanation:
      "English runs the risk of something happening. 'Take a risk' describes a deliberate, calculated choice, and the other verbs do not collocate with risk in this pattern.",
  },
  {
    id: 'ex-shed-light-gap',
    itemId: 'colloc-shed-light-on',
    kind: 'gap-fill',
    instructions: 'Complete with the preposition that follows "shed light".',
    sentenceBefore: 'The interviews shed light',
    sentenceAfter: 'why the handover failed.',
    accepted: ['on'],
    hint: 'It is the same preposition as in "light on a subject".',
    explanation:
      "The collocation is 'shed light on something'. The formal variants 'cast light on' and 'throw light on' take the same preposition.",
  },
  {
    id: 'ex-pave-the-way-choice',
    itemId: 'colloc-pave-the-way',
    kind: 'multiple-choice',
    instructions: 'Choose the correct form of the phrase.',
    prompt: 'Which sentence is correct?',
    options: [
      { id: 'a', text: 'The pilot paved the way for a full migration in the spring.' },
      { id: 'b', text: 'The pilot paved the way to a full migration in the spring.' },
      { id: 'c', text: 'The pilot pavemented the way for a full migration in the spring.' },
      { id: 'd', text: 'The pilot paved the road for a full migration in the spring.' },
    ],
    correctOptionId: 'a',
    explanation:
      "The fixed phrase is 'pave the way for something'. 'Pavement' is a noun, and 'pave the road' is literal and has no figurative meaning here.",
  },
  {
    id: 'ex-take-into-account-error',
    itemId: 'colloc-take-into-account',
    kind: 'error-correction',
    instructions: 'Choose the sentence that is correct English.',
    prompt: 'Which sentence is correct?',
    options: [
      { id: 'a', text: 'The estimate takes seasonal demand into account.' },
      { id: 'b', text: 'The estimate takes into account of seasonal demand.' },
      { id: 'c', text: 'The estimate takes account into seasonal demand.' },
      { id: 'd', text: 'The estimate takes into account to seasonal demand.' },
    ],
    correctOptionId: 'a',
    explanation:
      "Either 'take something into account' or the formal 'take into account something' works, and the shorter variant is 'take account of something'. Options (b), (c) and (d) mix the three patterns.",
  },
];

export const collocationAdvancedExercisesPartFive: readonly Exercise[] = [
  {
    id: 'ex-fulfil-requirement-gap',
    itemId: 'colloc-fulfil-a-requirement',
    kind: 'gap-fill',
    instructions: 'Complete with the verb that collocates with requirements, in the present simple.',
    sentenceBefore: 'The design must',
    sentenceAfter: 'the requirements of the regulator.',
    accepted: ['meet', 'fulfil'],
    hint: 'Two verbs are accepted: one also collocates with deadlines and standards.',
    explanation:
      "Requirements can be met, fulfilled, satisfied or complied with. All four are standard in contracts and specifications; 'reached' and 'completed' are not.",
  },
  {
    id: 'ex-emphasis-gap',
    itemId: 'colloc-place-emphasis-on',
    kind: 'gap-fill',
    instructions: 'Complete with the preposition that follows emphasis.',
    sentenceBefore: 'The training places emphasis',
    sentenceAfter: 'writing clear updates.',
    accepted: ['on'],
    hint: 'The same preposition follows focus, reliance and impact.',
    explanation:
      "Emphasis takes 'on': emphasis on quality, focus on delivery. 'In emphasis on quality' and 'emphasis to quality' are typical preposition errors.",
  },
  {
    id: 'ex-reservations-best',
    itemId: 'colloc-express-reservations',
    kind: 'best-expression',
    instructions: 'Choose the most diplomatic way to raise a doubt in a formal meeting.',
    prompt: 'Which sentence raises a doubt while remaining diplomatic?',
    options: [
      { id: 'a', text: 'Two members expressed reservations about the timescale.' },
      { id: 'b', text: 'Two members made reservations about the timescale.' },
      { id: 'c', text: 'Two members did reservations about the timescale.' },
      { id: 'd', text: 'Two members expressed reservations for the timescale.' },
    ],
    correctOptionId: 'a',
    explanation:
      "Reservations are expressed, voiced or held, and the preposition is 'about'. Note that 'make a reservation' refers to booking a table or a room.",
  },
  {
    id: 'ex-keep-track-choice',
    itemId: 'colloc-keep-track-of',
    kind: 'multiple-choice',
    instructions: 'Choose the sentence with the correct form of the phrase.',
    prompt: 'Which sentence is correct?',
    options: [
      { id: 'a', text: 'A shared board keeps track of who is waiting for what.' },
      { id: 'b', text: 'A shared board keeps track on who is waiting for what.' },
      { id: 'c', text: 'A shared board keeps track for who is waiting for what.' },
      { id: 'd', text: 'A shared board keeps the track of who is waiting for what.' },
    ],
    correctOptionId: 'a',
    explanation:
      "The phrase is 'keep track of something', with no article. The opposite is 'lose track of', which follows the same pattern.",
  },
];





