import type { Exercise, LearningItem } from '../domain/types';

/** Batch 2 phrasal verbs and idioms for meetings, projects and everyday work. */
export const idiomAdvancedItems: readonly LearningItem[] = [
  {
    id: 'phrasal-put-off',
    category: 'phrasal-verb',
    topic: 'Time and scheduling',
    level: 'C1',
    title: 'put off',
    meaning:
      'to postpone something, or to discourage somebody from doing something. Separable: put the meeting off or put off the meeting.',
    examples: [
      'We put the review off until the new figures arrive.',
      'Repeated delays put the client off the whole idea.',
    ],
    commonError:
      "Do not confuse 'put off' (postpone or discourage) with 'call off' (cancel) or 'put out' (inconvenience).",
    collocations: ['put a meeting off', 'put somebody off', 'put off a decision'],
    register: 'neutral',
    variant: 'both',
    tags: ['scheduling', 'phrasal verbs', 'separable'],
  },
  {
    id: 'phrasal-come-up-with',
    category: 'phrasal-verb',
    topic: 'Ideas and problems',
    level: 'C1',
    title: 'come up with',
    meaning:
      'to produce an idea, plan or solution. For obstacles use come up against; for unexpectedly meeting somebody use run into.',
    examples: [
      'She came up with a simple way to halve the waiting time.',
      'We need to come up with something before Friday.',
    ],
    commonError:
      "Never write 'come up an idea' or 'come up with against a problem'. The pairs are: come up with an idea, come up against a problem.",
    collocations: ['come up with a solution', 'come up with an idea', 'come up with a plan'],
    register: 'neutral',
    variant: 'both',
    tags: ['ideas', 'phrasal verbs', 'confusable pairs'],
  },
  {
    id: 'phrasal-get-round-to',
    category: 'phrasal-verb',
    topic: 'Time and scheduling',
    level: 'C1',
    title: 'get round to',
    meaning:
      "to finally find time for something you have been meaning to do. American English often uses 'get around to'. Followed by -ing.",
    examples: [
      'I still have not got round to reading the specification.',
      'Once we get round to automating the checks, this will take minutes.',
    ],
    commonError:
      "The pattern is get round to + -ing: 'get round to checking it', never 'get round to check it'.",
    collocations: ['get round to doing something', 'never get round to'],
    register: 'informal',
    variant: 'both',
    tags: ['scheduling', 'gerund', 'phrasal verbs'],
  },
  {
    id: 'phrasal-look-into',
    category: 'phrasal-verb',
    topic: 'Investigation',
    level: 'C1',
    title: 'look into',
    meaning:
      "to investigate or examine a matter before deciding. More neutral than 'investigate' and extremely common in business email.",
    examples: [
      'I will look into why the report was not sent and come back to you.',
      'The team is looking into the cause of the outage.',
    ],
    commonError:
      "Do not confuse with 'look after' (take care of) or 'look for' (search). 'Look into' is about examining a question.",
    collocations: ['look into a matter', 'look into the cause', 'look into it'],
    register: 'neutral',
    variant: 'both',
    tags: ['investigation', 'email', 'phrasal verbs'],
  },
  {
    id: 'phrasal-bring-about',
    category: 'phrasal-verb',
    topic: 'Cause and change',
    level: 'C1',
    title: 'bring about',
    meaning:
      'to cause something to happen, especially a significant change. Formal in register; the change follows the verb.',
    examples: [
      'The new regulation brought about a complete redesign of the form.',
      'Only sustained pressure brought about a change of policy.',
    ],
    commonError:
      "The object follows the particle: 'bring about change', not 'bring change about' in this meaning. For a person changing their mind, use 'bring round'.",
    collocations: ['bring about change', 'bring about a result', 'bring about reform'],
    register: 'formal',
    variant: 'both',
    tags: ['cause and effect', 'change', 'formal writing'],
  },
  {
    id: 'phrasal-rule-out',
    category: 'phrasal-verb',
    topic: 'Decisions and options',
    level: 'C1',
    title: 'rule out',
    meaning:
      'to decide that something is impossible or no longer an option; also to exclude a cause when diagnosing a problem.',
    examples: [
      'A network fault has been ruled out; the issue is in the application.',
      'We cannot rule out another delay.',
    ],
    commonError:
      "Do not confuse with 'rule on' (make a formal decision) or with 'roll out' (release something gradually).",
    collocations: ['rule out a cause', 'rule out an option', 'cannot be ruled out'],
    register: 'neutral',
    variant: 'both',
    tags: ['decisions', 'diagnosis', 'confusable pairs'],
  },
  {
    id: 'phrasal-draw-up',
    category: 'phrasal-verb',
    topic: 'Documents and plans',
    level: 'C1',
    title: 'draw up',
    meaning:
      'to prepare a document, contract, plan or list. Formal and common in legal and project contexts.',
    examples: [
      'Legal drew up the amendment over the weekend.',
      'We drew up a shortlist of five suppliers.',
    ],
    commonError:
      "Do not confuse 'draw up' (prepare a document) with 'draw down' (use part of a budget) or 'draw on' (use as a resource).",
    collocations: ['draw up a contract', 'draw up a plan', 'draw up a shortlist'],
    register: 'formal',
    variant: 'both',
    tags: ['documents', 'contracts', 'phrasal verbs'],
  },
  {
    id: 'phrasal-get-across',
    category: 'phrasal-verb',
    topic: 'Communication',
    level: 'C1',
    title: 'get across',
    meaning:
      'to succeed in making people understand a point or a feeling. Often used about communication that is difficult.',
    examples: [
      'The diagram gets the idea across in ten seconds.',
      'He struggled to get across why the change mattered.',
    ],
    commonError:
      "The point is what you get across: 'I got my point across', not 'I got across my point' in most natural usage, although both orders occur.",
    collocations: ['get a point across', 'get the message across', 'get across an idea'],
    register: 'neutral',
    variant: 'both',
    tags: ['communication', 'presentations', 'phrasal verbs'],
  },
  {
    id: 'phrasal-put-up-with',
    category: 'phrasal-verb',
    topic: 'Tolerance',
    level: 'C1',
    title: 'put up with',
    meaning:
      'to tolerate something annoying without complaining much. Inseparable: the object follows the whole phrase.',
    examples: [
      'We put up with the noise for a month before moving desks.',
      'Nobody should have to put up with that level of rudeness.',
    ],
    commonError:
      "Do not split the phrase: 'put up with the noise', not 'put the noise up with'. In writing, 'tolerate' is the neutral alternative.",
    collocations: ['put up with the noise', 'put up with behaviour', 'no longer willing to put up with'],
    register: 'informal',
    variant: 'both',
    tags: ['tolerance', 'inseparable', 'everyday English'],
  },
  {
    id: 'phrasal-stand-out',
    category: 'phrasal-verb',
    topic: 'Comparison',
    level: 'C1',
    title: 'stand out',
    meaning:
      'to be noticeably better, more important or different from the rest. Often followed by from or against.',
    examples: [
      'One proposal stood out for its clarity.',
      'Her presentation stood out against a rather dull programme.',
    ],
    commonError:
      "Do not confuse with 'stand in for' (replace somebody) or 'stand up for' (defend). Only 'stand out' means being noticeably different.",
    collocations: ['stand out from the rest', 'stand out in a crowd', 'a standout candidate'],
    register: 'neutral',
    variant: 'both',
    tags: ['comparison', 'phrasal verbs', 'confusable pairs'],
  },
  {
    id: 'phrasal-weigh-up',
    category: 'phrasal-verb',
    topic: 'Decisions and options',
    level: 'C1',
    title: 'weigh up',
    meaning:
      'to consider the advantages and disadvantages of options before deciding. Related: weigh the pros and cons.',
    examples: [
      'We are still weighing up the two offers.',
      'She weighed up the risks and chose the slower, safer route.',
    ],
    commonError:
      "Weigh up takes an object: 'weigh up the options'. The formal noun phrase is 'weigh the relative merits of the options'.",
    collocations: ['weigh up the options', 'weigh up the pros and cons', 'weigh up a risk'],
    register: 'neutral',
    variant: 'both',
    tags: ['decisions', 'evaluation', 'phrasal verbs'],
  },
  {
    id: 'phrasal-touch-on',
    category: 'phrasal-verb',
    topic: 'Meetings and documents',
    level: 'C1',
    title: 'touch on',
    meaning:
      'to mention a subject briefly, without going into detail. Common in presentations and reports.',
    examples: [
      'The report only touches on the question of cost.',
      'I will touch on next year’s priorities at the end.',
    ],
    commonError:
      "Do not confuse with 'touch up' (improve slightly) or 'touch down' (land). And note the preposition: touch on a subject.",
    collocations: ['touch on a subject', 'briefly touch on', 'touch on the issue'],
    register: 'formal',
    variant: 'both',
    tags: ['meetings', 'reports', 'phrasal verbs'],
  },
  {
    id: 'idiom-back-burner',
    category: 'idiom',
    topic: 'Priorities and delay',
    level: 'C1',
    title: 'on the back burner',
    meaning:
      'receiving low priority for now, while other things are dealt with. From cooking: the burner at the back keeps food warm.',
    examples: [
      'The analytics project is on the back burner until the audit is finished.',
      'We put the redesign on the back burner for two quarters.',
    ],
    commonError:
      "On the back burner means deliberately postponed, not cancelled. For a permanent stop, use 'shelved' or 'dropped'.",
    register: 'informal',
    variant: 'both',
    tags: ['priorities', 'idioms', 'projects'],
  },
  {
    id: 'idiom-grey-area',
    category: 'idiom',
    topic: 'Rules and ambiguity',
    level: 'C1',
    title: 'a grey area',
    meaning:
      'a situation where the rules are unclear and reasonable people could judge it differently. American spelling: gray area.',
    examples: [
      'Whether we need consent for anonymised data is a grey area.',
      'The contract leaves a grey area around subcontracted work.',
    ],
    commonError:
      "A grey area is not the same as a loophole: it is unclear, rather than an unregulated gap that can be exploited.",
    register: 'neutral',
    variant: 'both',
    tags: ['rules', 'ambiguity', 'idioms'],
  },
  {
    id: 'idiom-the-bottom-line',
    category: 'idiom',
    topic: 'Essentials',
    level: 'C1',
    title: 'the bottom line',
    meaning:
      'the most important fact or the final result, especially the profit figure. Used to cut through detail.',
    examples: [
      'The bottom line is that we need two more weeks.',
      'Training pays off: the bottom line improved by twelve per cent.',
    ],
    commonError:
      "In financial contexts the bottom line means net profit; in general use it means the essential point. Context decides which one is meant.",
    register: 'informal',
    variant: 'both',
    tags: ['essentials', 'business', 'idioms'],
  },
  {
    id: 'idiom-on-the-same-page',
    category: 'idiom',
    topic: 'Agreement',
    level: 'C1',
    title: 'on the same page',
    meaning:
      'sharing the same understanding of a situation or plan. Very common before meetings and handovers.',
    examples: [
      'Let us make sure we are on the same page before the client call.',
      'The two teams were not on the same page about who owned the risk.',
    ],
    commonError:
      "The phrase describes shared understanding, not agreement on everything: people can be on the same page about the facts and still disagree about the decision.",
    register: 'informal',
    variant: 'both',
    tags: ['agreement', 'meetings', 'idioms'],
  },
];

export const idiomAdvancedExercises: readonly Exercise[] = [
  {
    id: 'ex-put-off-choice',
    itemId: 'phrasal-put-off',
    kind: 'multiple-choice',
    instructions: 'Choose the phrasal verb that means "postpone".',
    prompt: 'The figures were late, so we ___ the review until Friday.',
    options: [
      { id: 'a', text: 'put off' },
      { id: 'b', text: 'called off' },
      { id: 'c', text: 'put out' },
      { id: 'd', text: 'put up' },
    ],
    correctOptionId: 'a',
    explanation:
      "'Put off' means postpone. 'Call off' means cancel, 'put out' means inconvenience or extinguish, and 'put up' means accommodate or raise.",
  },
  {
    id: 'ex-come-up-with-error',
    itemId: 'phrasal-come-up-with',
    kind: 'error-correction',
    instructions: 'Choose the sentence that is correct English.',
    prompt: 'Which sentence is correct?',
    options: [
      { id: 'a', text: 'She came up with a simple way to halve the waiting time.' },
      { id: 'b', text: 'She came up a simple way to halve the waiting time.' },
      { id: 'c', text: 'She came up with against a simple way to halve the waiting time.' },
      { id: 'd', text: 'She came with up a simple way to halve the waiting time.' },
    ],
    correctOptionId: 'a',
    explanation:
      "The particle 'with' is required: come up with an idea. 'Come up against' is used for obstacles, so it cannot be combined with a solution.",
  },
  {
    id: 'ex-get-round-to-gap',
    itemId: 'phrasal-get-round-to',
    kind: 'gap-fill',
    instructions: 'Complete with the correct form of the verb in brackets: (check).',
    sentenceBefore: 'I still have not got round to',
    sentenceAfter: 'the specification.',
    accepted: ['checking', 'reading', 'reviewing'],
    hint: 'After the preposition "to" the verb takes -ing.',
    explanation:
      "The pattern is get round to + -ing: 'got round to checking the specification'. Any -ing verb that fits the meaning is accepted here, because the point is the grammatical form.",
  },
  {
    id: 'ex-look-into-choice',
    itemId: 'phrasal-look-into',
    kind: 'best-expression',
    instructions: 'Choose the sentence you would write in a business email promising to investigate.',
    prompt: 'Which sentence is best in an email reply?',
    options: [
      { id: 'a', text: 'I will look into why the report was not sent and come back to you.' },
      { id: 'b', text: 'I will look after why the report was not sent and come back to you.' },
      { id: 'c', text: 'I will look for why the report was not sent and come back to you.' },
      { id: 'd', text: 'I will look up why the report was not sent and come back to you.' },
    ],
    correctOptionId: 'a',
    explanation:
      "'Look into' means investigate a question. 'Look after' means take care of, 'look for' means search, and 'look up' means consult a reference or visit somebody.",
  },
];

export const idiomAdvancedExercisesPartTwo: readonly Exercise[] = [
  {
    id: 'ex-bring-about-choice',
    itemId: 'phrasal-bring-about',
    kind: 'multiple-choice',
    instructions: 'Choose the verb that means "cause a change to happen".',
    prompt: 'The new regulation ___ a complete redesign of the form.',
    options: [
      { id: 'a', text: 'brought about' },
      { id: 'b', text: 'brought up' },
      { id: 'c', text: 'brought in' },
      { id: 'd', text: 'brought down' },
    ],
    correctOptionId: 'a',
    explanation:
      "'Bring about' means cause a significant change. 'Bring up' means raise a topic or a child, 'bring in' means introduce or earn, and 'bring down' means reduce or topple.",
  },
  {
    id: 'ex-rule-out-gap',
    itemId: 'phrasal-rule-out',
    kind: 'gap-fill',
    instructions: 'Complete with the phrasal verb meaning "exclude a cause", in the base form.',
    sentenceBefore: 'We can',
    sentenceAfter: 'a network fault: the logs show no outage.',
    accepted: ['rule out'],
    hint: 'Two words: the verb and its particle.',
    explanation:
      "'Rule out' means decide that something is not the explanation or the option. The passive form is common: 'a network fault has been ruled out'.",
  },
  {
    id: 'ex-draw-up-best',
    itemId: 'phrasal-draw-up',
    kind: 'best-expression',
    instructions: 'Choose the sentence that means "prepared a document".',
    prompt: 'Which sentence uses a phrasal verb meaning "prepared a document"?',
    options: [
      { id: 'a', text: 'Legal drew up the amendment over the weekend.' },
      { id: 'b', text: 'Legal drew down the amendment over the weekend.' },
      { id: 'c', text: 'Legal drew on the amendment over the weekend.' },
      { id: 'd', text: 'Legal drew in the amendment over the weekend.' },
    ],
    correctOptionId: 'a',
    explanation:
      "'Draw up' means prepare a document. 'Draw down' means use part of a budget or facility, 'draw on' means use something as a resource, and 'draw in' means involve somebody.",
  },
  {
    id: 'ex-get-across-choice',
    itemId: 'phrasal-get-across',
    kind: 'multiple-choice',
    instructions: 'Choose the sentence that means the audience understood the point.',
    prompt: 'Which sentence reports that the message was understood?',
    options: [
      { id: 'a', text: 'The diagram gets the idea across in ten seconds.' },
      { id: 'b', text: 'The diagram gets the idea over in ten seconds.' },
      { id: 'c', text: 'The diagram gets through the idea in ten seconds.' },
      { id: 'd', text: 'The diagram gets the idea by in ten seconds.' },
    ],
    correctOptionId: 'a',
    explanation:
      "'Get across' means make people understand. 'Get over' means recover from or overcome, 'get through' means finish or reach somebody by phone, and (d) is not a phrasal verb.",
  },
];

export const idiomAdvancedExercisesPartThree: readonly Exercise[] = [
  {
    id: 'ex-put-up-with-error',
    itemId: 'phrasal-put-up-with',
    kind: 'error-correction',
    instructions: 'Choose the sentence with the correct word order.',
    prompt: 'Which sentence is correct?',
    options: [
      { id: 'a', text: 'We put up with the noise for a month before moving desks.' },
      { id: 'b', text: 'We put the noise up with for a month before moving desks.' },
      { id: 'c', text: 'We put up the noise with for a month before moving desks.' },
      { id: 'd', text: 'We put with up the noise for a month before moving desks.' },
    ],
    correctOptionId: 'a',
    explanation:
      "'Put up with' is inseparable, so the object cannot go inside the phrase. In formal writing, 'tolerate' is the natural replacement.",
  },
  {
    id: 'ex-stand-out-gap',
    itemId: 'phrasal-stand-out',
    kind: 'gap-fill',
    instructions: 'Complete with the phrasal verb meaning "was noticeably better", in the past simple.',
    sentenceBefore: 'One proposal',
    sentenceAfter: 'for its clarity.',
    accepted: ['stood out'],
    hint: 'Two words, and the verb is irregular.',
    explanation:
      "'Stand out' means be noticeably different or better. Do not confuse it with 'stand in for' (replace somebody) or 'stand up for' (defend).",
  },
  {
    id: 'ex-weigh-up-choice',
    itemId: 'phrasal-weigh-up',
    kind: 'multiple-choice',
    instructions: 'Choose the sentence that describes evaluating options.',
    prompt: 'Which sentence describes comparing two options before deciding?',
    options: [
      { id: 'a', text: 'We are still weighing up the two offers.' },
      { id: 'b', text: 'We are still weighting up the two offers.' },
      { id: 'c', text: 'We are still weighing in the two offers.' },
      { id: 'd', text: 'We are still weighing on the two offers.' },
    ],
    correctOptionId: 'a',
    explanation:
      "'Weigh up' means consider advantages and disadvantages. 'Weigh in' means join a discussion with an opinion, and 'weigh on' means cause worry.",
  },
  {
    id: 'ex-touch-on-best',
    itemId: 'phrasal-touch-on',
    kind: 'best-expression',
    instructions: 'Choose the sentence that means the subject was mentioned only briefly.',
    prompt: 'Which sentence says that the report mentioned cost in passing?',
    options: [
      { id: 'a', text: 'The report only touches on the question of cost.' },
      { id: 'b', text: 'The report only touches up the question of cost.' },
      { id: 'c', text: 'The report only touches down on the question of cost.' },
      { id: 'd', text: 'The report only touches in the question of cost.' },
    ],
    correctOptionId: 'a',
    explanation:
      "'Touch on' means mention briefly. 'Touch up' means improve slightly (often a photo), and 'touch down' means land.",
  },
];

export const idiomAdvancedExercisesPartFour: readonly Exercise[] = [
  {
    id: 'ex-back-burner-choice',
    itemId: 'idiom-back-burner',
    kind: 'multiple-choice',
    instructions: 'Choose the idiom that means the project has low priority for now.',
    prompt: 'The analytics project has been ___ until the audit is finished.',
    options: [
      { id: 'a', text: 'on the back burner' },
      { id: 'b', text: 'on the back seat' },
      { id: 'c', text: 'on the back foot' },
      { id: 'd', text: 'on the back shelf' },
    ],
    correctOptionId: 'a',
    explanation:
      "On the back burner means postponed in priority, not cancelled. 'On the back foot' means at a disadvantage in a discussion; the other forms are not idioms.",
  },
  {
    id: 'ex-grey-area-gap',
    itemId: 'idiom-grey-area',
    kind: 'gap-fill',
    instructions: 'Complete with the idiom for a situation where the rules are unclear (three words).',
    sentenceBefore: 'Whether we need consent for anonymised data is',
    sentenceAfter: 'that reasonable people read differently.',
    accepted: ['a grey area', 'a gray area'],
    hint: 'British spelling uses grey; American spelling uses gray.',
    explanation:
      "A grey area is a situation the rules do not clearly cover. It differs from a loophole, which is an unregulated gap that can be exploited deliberately.",
  },
  {
    id: 'ex-bottom-line-best',
    itemId: 'idiom-the-bottom-line',
    kind: 'best-expression',
    instructions: 'Choose the sentence that sums up the essential point.',
    prompt: 'Which sentence sums up the essential point?',
    options: [
      { id: 'a', text: 'The bottom line is that we need two more weeks.' },
      { id: 'b', text: 'The last line is that we need two more weeks.' },
      { id: 'c', text: 'The down line is that we need two more weeks.' },
      { id: 'd', text: 'The base line is that we need two more weeks.' },
    ],
    correctOptionId: 'a',
    explanation:
      "'The bottom line' is the essential fact or final result; in accounts it is the net profit figure. The other versions are not idioms.",
  },
  {
    id: 'ex-same-page-choice',
    itemId: 'idiom-on-the-same-page',
    kind: 'multiple-choice',
    instructions: 'Choose the sentences that mean the two teams shared an understanding.',
    prompt: 'Which sentence means the two teams shared the same understanding?',
    options: [
      { id: 'a', text: 'The two teams were not on the same page about who owned the risk.' },
      { id: 'b', text: 'The two teams were not in the same page about who owned the risk.' },
      { id: 'c', text: 'The two teams were not at the same page about who owned the risk.' },
      { id: 'd', text: 'The two teams were not on the same paper about who owned the risk.' },
    ],
    correctOptionId: 'a',
    explanation:
      "The idiom is 'on the same page', with the preposition 'on'. It describes shared understanding, which can exist even when people still disagree about what to do.",
  },
];




