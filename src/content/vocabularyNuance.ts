import type { Exercise, LearningItem } from '../domain/types';

/**
 * Batch 2 vocabulary: C1 words whose value lies in nuance, collocation and
 * register rather than in a one-word translation.
 */
export const vocabularyNuanceItems: readonly LearningItem[] = [
  {
    id: 'vocab-ubiquitous',
    category: 'vocabulary',
    topic: 'Scale and presence',
    level: 'C1',
    title: 'ubiquitous',
    meaning: 'present everywhere at the same time. Formal and neutral in tone, often slightly emphatic.',
    examples: [
      'Smartphones are now ubiquitous in urban offices.',
      'Two-factor authentication has become ubiquitous in banking apps.',
    ],
    commonError:
      "Ubiquitous does not mean 'very common in general': it means found in every place. For frequency alone, use 'widespread' or 'common'.",
    collocations: ['ubiquitous technology', 'become ubiquitous'],
    register: 'formal',
    variant: 'both',
    tags: ['degree', 'formal writing', 'technology'],
  },
  {
    id: 'vocab-meticulous',
    category: 'vocabulary',
    topic: 'Personal qualities',
    level: 'C1',
    title: 'meticulous',
    meaning:
      'extremely careful about small details, in a way that is approving. It describes people and the work they produce.',
    examples: [
      'She kept meticulous records of every change request.',
      'The audit was meticulous and took three weeks longer than planned.',
    ],
    commonError:
      "Meticulous is a compliment, not a criticism: for the negative sense of over-fussy use 'pedantic' or 'fussy'.",
    collocations: ['meticulous attention to detail', 'meticulous records', 'meticulous planning'],
    register: 'neutral',
    variant: 'both',
    tags: ['approval', 'detail', 'work'],
  },
  {
    id: 'vocab-ambiguous',
    category: 'vocabulary',
    topic: 'Meaning and clarity',
    level: 'C1',
    title: 'ambiguous',
    meaning:
      'having more than one possible meaning, so it can be understood in different ways. It is not the same as unclear or vague.',
    examples: [
      'The clause is ambiguous: it does not say who bears the cost.',
      'His answer was deliberately ambiguous.',
    ],
    commonError:
      "Ambiguous means two or more readings are possible; vague means no precise meaning is given. A contract can be ambiguous; a promise is more often vague.",
    collocations: ['an ambiguous clause', 'deliberately ambiguous', 'open to interpretation'],
    register: 'neutral',
    variant: 'both',
    czechNote:
      "Czech 'dvojznačný' is the close equivalent; the trap is using 'ambivalent' (having mixed feelings) for 'ambiguous' (having two meanings).",
    tags: ['meaning', 'confusable words', 'contracts'],
  },
  {
    id: 'vocab-plausible',
    category: 'vocabulary',
    topic: 'Evidence and argument',
    level: 'C1',
    title: 'plausible',
    meaning:
      'seeming reasonable and likely to be true, even if it may not be. It judges how convincing something sounds, not whether it is proven.',
    examples: [
      'The explanation is plausible, but there is no evidence for it.',
      'A plausible alternative is that the data was mislabelled.',
    ],
    commonError:
      "Plausible does not mean 'true': a plausible theory can still be false. For 'believable and true', write 'credible' or 'convincing'.",
    collocations: ['a plausible explanation', 'sound plausible', 'perfectly plausible'],
    register: 'neutral',
    variant: 'both',
    tags: ['argument', 'evidence', 'nuance'],
  },
  {
    id: 'vocab-reluctant',
    category: 'vocabulary',
    topic: 'Attitude and willingness',
    level: 'C1',
    title: 'reluctant',
    meaning:
      'unwilling and hesitant, usually with a reason. The pattern is reluctant to + infinitive.',
    examples: [
      'The supplier was reluctant to commit to a fixed price.',
      'Senior managers were reluctant to reopen the negotiation.',
    ],
    commonError:
      "Reluctant to do, not 'reluctant for doing'. It also differs from 'refusing': a reluctant person may still agree.",
    collocations: ['reluctant to accept', 'a reluctant agreement', 'reluctant consent'],
    register: 'neutral',
    variant: 'both',
    czechNote:
      "Czech 'zdráhavý / neochotný' maps closely, but note the English pattern: reluctant to do something.",
    tags: ['attitude', 'verb patterns', 'negotiation'],
  },
  {
    id: 'vocab-adverse',
    category: 'vocabulary',
    topic: 'Risk and effect',
    level: 'C1',
    title: 'adverse',
    meaning:
      'harmful or unfavourable. It collocates strongly with effects, conditions, impact, publicity and reaction.',
    examples: [
      'The delay had an adverse effect on the launch schedule.',
      'The medicine is safe, with no adverse reactions reported.',
    ],
    commonError:
      "Do not confuse adverse (harmful) with averse (unwilling): 'risk-averse' means cautious, 'adverse conditions' means bad conditions.",
    collocations: ['adverse effect', 'adverse conditions', 'adverse publicity'],
    register: 'formal',
    variant: 'both',
    tags: ['confusable words', 'risk', 'formal writing'],
  },
  {
    id: 'vocab-coherent',
    category: 'vocabulary',
    topic: 'Meaning and clarity',
    level: 'C1',
    title: 'coherent',
    meaning:
      'logically consistent and easy to follow as a whole. Used about arguments, policies, plans and explanations.',
    examples: [
      'The strategy is coherent: each project supports the same three goals.',
      'We need a coherent response, not a series of separate announcements.',
    ],
    commonError:
      "Coherent describes how the parts fit together; 'clear' describes how easy one part is to understand. A long report can be clear but not coherent.",
    collocations: ['a coherent strategy', 'a coherent argument', 'coherent policy'],
    register: 'neutral',
    variant: 'both',
    tags: ['argument', 'structure', 'business'],
  },
  {
    id: 'vocab-viable',
    category: 'vocabulary',
    topic: 'Feasibility',
    level: 'C1',
    title: 'viable',
    meaning:
      'capable of working successfully, especially in commercial or practical terms. Often used about options, plans and businesses.',
    examples: [
      'Keeping two suppliers may not be commercially viable.',
      'The only viable route was to rebuild the index overnight.',
    ],
    commonError:
      "Viable is about the ability to survive or work, not merely about possibility; for 'possible', use 'feasible' or 'possible'.",
    collocations: ['commercially viable', 'a viable alternative', 'no longer viable'],
    register: 'neutral',
    variant: 'both',
    tags: ['business', 'feasibility', 'decisions'],
  },
  {
    id: 'vocab-inherent',
    category: 'vocabulary',
    topic: 'Cause and nature',
    level: 'C1',
    title: 'inherent',
    meaning:
      'existing as a natural or permanent part of something. The pattern is inherent in something or an inherent risk.',
    examples: [
      'There is an inherent risk in any manual approval step.',
      'Uncertainty is inherent in long-term forecasting.',
    ],
    commonError:
      "Inherent in, not 'inherent to' in most careful usage: 'the risks inherent in the process'.",
    collocations: ['inherent risk', 'inherent in the design', 'an inherent limitation'],
    register: 'formal',
    variant: 'both',
    tags: ['cause', 'formal writing', 'risk'],
  },
  {
    id: 'vocab-arbitrary',
    category: 'vocabulary',
    topic: 'Decisions and rules',
    level: 'C1',
    title: 'arbitrary',
    meaning:
      'based on personal choice or chance rather than on a reason or a system. Mildly critical.',
    examples: [
      'The cut-off date feels arbitrary; nothing changed on that day.',
      'Awarding bonuses at an arbitrary level is hard to defend.',
    ],
    commonError:
      "Arbitrary implies a lack of justification, not randomness itself: 'a random sample' is a method, 'an arbitrary decision' is a criticism.",
    collocations: ['an arbitrary decision', 'arbitrary rules', 'seem arbitrary'],
    register: 'neutral',
    variant: 'both',
    tags: ['criticism', 'rules', 'business'],
  },
  {
    id: 'vocab-candid',
    category: 'vocabulary',
    topic: 'Speech and honesty',
    level: 'C1',
    title: 'candid',
    meaning:
      'honest and direct about something difficult. Used approvingly, often with about or a candid assessment.',
    examples: [
      'She was candid about the limitations of the study.',
      'The report offers a candid assessment of the delays.',
    ],
    commonError:
      "Candid is positive; 'blunt' can sound harsh and 'frank' is neutral. Choose according to the tone you want.",
    collocations: ['candid about', 'a candid assessment', 'perfectly candid'],
    register: 'neutral',
    variant: 'both',
    tags: ['approval', 'register', 'communication'],
  },
  {
    id: 'vocab-scrutinise',
    category: 'vocabulary',
    topic: 'Examination',
    level: 'C1',
    title: 'scrutinise',
    meaning:
      'to examine something very carefully and critically. Common in reporting on audits, accounts and documents. British spelling scrutinise; American scrutinize.',
    examples: [
      'The regulator scrutinised every contract signed last year.',
      'Investors will scrutinise the figures before the vote.',
    ],
    commonError:
      "Scrutinise takes a direct object and needs no preposition: 'scrutinised the accounts', never 'scrutinised on the accounts'.",
    collocations: ['closely scrutinised', 'scrutinise the accounts', 'come under scrutiny'],
    register: 'formal',
    variant: 'british',
    czechNote:
      "The noun is 'scrutiny' ('under scrutiny'), which Czech speakers often miss because the verb and noun look unrelated.",
    tags: ['formal writing', 'audit', 'business'],
  },
  {
    id: 'vocab-alleviate',
    category: 'vocabulary',
    topic: 'Problems and solutions',
    level: 'C1',
    title: 'alleviate',
    meaning:
      'to make pain, a problem or a difficult situation less severe. It suggests relief, not a complete solution.',
    examples: [
      'A second support desk alleviated the pressure on the first-line team.',
      'The measures alleviated the shortage without solving it.',
    ],
    commonError:
      "Alleviate is not the same as 'solve' or 'eliminate'; it reduces severity. For getting rid of something entirely, use 'eradicate' or 'eliminate'.",
    collocations: ['alleviate the pressure', 'alleviate suffering', 'alleviate a shortage'],
    register: 'formal',
    variant: 'both',
    tags: ['solutions', 'degree', 'formal writing'],
  },
  {
    id: 'vocab-exacerbate',
    category: 'vocabulary',
    topic: 'Problems and solutions',
    level: 'C1',
    title: 'exacerbate',
    meaning: 'to make a problem, bad situation or feeling worse. It is the opposite of alleviate.',
    examples: [
      'Delaying the release exacerbated the cash-flow problem.',
      'Public criticism exacerbated tensions inside the team.',
    ],
    commonError:
      "Exacerbate needs an object (exacerbate the problem, not 'exacerbate' alone), and it is a formal word: in speech people say 'made it worse'.",
    collocations: ['exacerbate the problem', 'exacerbate tensions', 'exacerbated by'],
    register: 'formal',
    variant: 'both',
    czechNote:
      "Czech 'zhoršit' covers it; remember the object is required and that 'exacerbate' is a written register choice.",
    tags: ['problems', 'formal writing', 'cause and effect'],
  },
  {
    id: 'vocab-feasible',
    category: 'vocabulary',
    topic: 'Feasibility',
    level: 'C1',
    title: 'feasible',
    meaning:
      'possible to do in practice, given time, money and effort. A feasibility study tests exactly that.',
    examples: [
      'Running the migration in one night is feasible if we freeze changes.',
      'It is not feasible to interview every user before the deadline.',
    ],
    commonError:
      "Feasible is about practicality, viable is about whether something can survive or succeed commercially. Both are common in project English.",
    collocations: ['technically feasible', 'a feasibility study', 'not feasible within the budget'],
    register: 'neutral',
    variant: 'both',
    tags: ['feasibility', 'projects', 'decisions'],
  },
  {
    id: 'vocab-undermine',
    category: 'vocabulary',
    topic: 'Weakening',
    level: 'C1',
    title: 'undermine',
    meaning:
      'to weaken something gradually, especially confidence, authority, a position or an argument, often indirectly.',
    examples: [
      'Repeated delays undermined confidence in the schedule.',
      'That admission undermines the central argument of the report.',
    ],
    commonError:
      "Undermine suggests indirect and gradual weakening; for a direct attack use 'weaken' or 'damage'. Also note the collocation: undermine confidence, authority, credibility.",
    collocations: ['undermine confidence', 'undermine authority', 'undermine an argument'],
    register: 'neutral',
    variant: 'both',
    tags: ['weakening', 'argument', 'business'],
  },
  {
    id: 'vocab-prudent',
    category: 'vocabulary',
    topic: 'Decisions and judgement',
    level: 'C1',
    title: 'prudent',
    meaning:
      'showing careful judgement about risks and consequences; sensible and cautious, usually in money or planning matters.',
    examples: [
      'It would be prudent to keep a second backup off site.',
      'A prudent approach is to pilot the change with one team.',
    ],
    commonError:
      "Prudent is approving; 'over-cautious' is the critical version. Do not confuse it with 'prudish', which means easily shocked.",
    collocations: ['a prudent approach', 'it would be prudent to', 'prudent financial management'],
    register: 'formal',
    variant: 'both',
    tags: ['approval', 'risk', 'formal writing'],
  },
  {
    id: 'vocab-intricate',
    category: 'vocabulary',
    topic: 'Complexity',
    level: 'C1',
    title: 'intricate',
    meaning:
      'having many small parts or details arranged in a complicated way. Often slightly admiring about design or detail.',
    examples: [
      'The pricing rules are intricate and only two people understand them fully.',
      'She described the intricate relationship between the two supply chains.',
    ],
    commonError:
      "Intricate describes structure and detail; 'complex' is neutral and 'complicated' often hints at difficulty. Choose intricate when the detail is impressive.",
    collocations: ['intricate detail', 'an intricate web of rules', 'intricate mechanisms'],
    register: 'neutral',
    variant: 'both',
    tags: ['complexity', 'nuance', 'design'],
  },
  {
    id: 'vocab-stark',
    category: 'vocabulary',
    topic: 'Degree and contrast',
    level: 'C1',
    title: 'stark',
    meaning:
      'unpleasantly clear and plain, without anything to soften it; also used for very strong contrasts (a stark contrast, a stark warning).',
    examples: [
      'The figures present a stark picture: usage fell by a third.',
      'There is a stark difference between what was promised and what was delivered.',
    ],
    commonError:
      "Stark is not neutral emphasis: it carries a sense of severity. For a simple contrast, 'a clear difference' is enough.",
    collocations: ['a stark contrast', 'a stark warning', 'a stark reminder'],
    register: 'neutral',
    variant: 'both',
    tags: ['degree', 'contrast', 'reports'],
  },
  {
    id: 'vocab-impartial',
    category: 'vocabulary',
    topic: 'Judgement and fairness',
    level: 'C1',
    title: 'impartial',
    meaning:
      'not favouring one side over another; used about advice, reviews, investigations and witnesses.',
    examples: [
      'An impartial review of the incident is under way.',
      'The panel must be seen to be impartial.',
    ],
    commonError:
      "Impartial means without bias; 'partial' means both biased and incomplete, so 'a partial review' can mean either. Context usually disambiguates, but preferably avoid the ambiguity.",
    collocations: ['impartial advice', 'an impartial review', 'seen to be impartial'],
    register: 'formal',
    variant: 'both',
    tags: ['fairness', 'formal writing', 'confusable words'],
  },
  {
    id: 'vocab-tentative',
    category: 'vocabulary',
    topic: 'Certainty and hedging',
    level: 'C1',
    title: 'tentative',
    meaning:
      'not certain or not final: a tentative agreement, a tentative date, tentative steps. It can also describe a careful, hesitant manner.',
    examples: [
      'We reached a tentative agreement, subject to legal review.',
      'There are tentative signs that demand is recovering.',
    ],
    commonError:
      "Tentative means provisional or hesitant, not weak: 'a tentative conclusion' is a conclusion held with appropriate caution.",
    collocations: ['a tentative agreement', 'tentative steps', 'tentative signs'],
    register: 'neutral',
    variant: 'both',
    tags: ['hedging', 'negotiation', 'nuance'],
  },
  {
    id: 'vocab-discrepancy',
    category: 'vocabulary',
    topic: 'Data and evidence',
    level: 'C1',
    title: 'discrepancy',
    meaning:
      'a difference between two things that should match, especially in figures or accounts. Mildly serious in tone.',
    examples: [
      'There is a discrepancy between the invoice total and the purchase order.',
      'The audit found small discrepancies in three records.',
    ],
    commonError:
      "A discrepancy is between two things that ought to agree; for a general difference, use 'difference' or 'variation'.",
    collocations: ['a discrepancy between', 'account for the discrepancy', 'minor discrepancies'],
    register: 'formal',
    variant: 'both',
    tags: ['data', 'audit', 'formal writing'],
  },
  {
    id: 'vocab-stringent',
    category: 'vocabulary',
    topic: 'Rules and requirements',
    level: 'C1',
    title: 'stringent',
    meaning:
      'strict and demanding, used about rules, controls, requirements, tests and deadlines. Neutral to mildly negative.',
    examples: [
      'The sector operates under stringent data-protection rules.',
      'Stringent testing is the reason the release took four weeks.',
    ],
    commonError:
      "Stringent describes rules and conditions, not people: 'a stringent manager' sounds odd, while 'a strict manager' is natural.",
    collocations: ['stringent rules', 'stringent controls', 'stringent requirements'],
    register: 'formal',
    variant: 'both',
    tags: ['rules', 'formal writing', 'collocation'],
  },
  {
    id: 'vocab-obsolete',
    category: 'vocabulary',
    topic: 'Change over time',
    level: 'C1',
    title: 'obsolete',
    meaning:
      "no longer used because something better exists. Stronger than 'outdated': an obsolete system has been replaced, not merely neglected.",
    examples: [
      'The interface became obsolete once the vendor changed its API.',
      'Keeping obsolete hardware running carries a security cost.',
    ],
    commonError:
      "Outdated means old-fashioned but still in use; obsolete means superseded. A team can rely on outdated tools, but an obsolete tool no longer has a purpose.",
    collocations: ['become obsolete', 'obsolete technology', 'render something obsolete'],
    register: 'neutral',
    variant: 'both',
    tags: ['change', 'technology', 'nuance'],
  },
  {
    id: 'vocab-resilient',
    category: 'vocabulary',
    topic: 'Strength and recovery',
    level: 'C1',
    title: 'resilient',
    meaning:
      'able to recover quickly from difficulty, or able to keep working after a shock. Used about people, organisations, systems and materials.',
    examples: [
      'Smaller suppliers proved more resilient during the downturn.',
      'The design is resilient: one failed node does not stop the service.',
    ],
    commonError:
      "Resilient stresses recovery after a shock; 'robust' stresses strength against failure. A resilient team recovers; a robust process resists.",
    collocations: ['remarkably resilient', 'a resilient economy', 'build resilience'],
    register: 'neutral',
    variant: 'both',
    tags: ['strength', 'business', 'nuance'],
  },
];

export const vocabularyNuanceExercises: readonly Exercise[] = [
  {
    id: 'ex-ubiquitous-choice',
    itemId: 'vocab-ubiquitous',
    kind: 'multiple-choice',
    instructions: 'Choose the word that fits the sentence.',
    prompt: 'Smartphones are now ___ in urban offices: virtually everybody has one.',
    options: [
      { id: 'a', text: 'ubiquitous' },
      { id: 'b', text: 'sporadic' },
      { id: 'c', text: 'reluctant' },
      { id: 'd', text: 'obsolete' },
    ],
    correctOptionId: 'a',
    explanation:
      "Ubiquitous means present everywhere. 'Sporadic' means occurring at irregular intervals, and it contradicts 'virtually everybody'. 'Obsolete' describes something superseded.",
  },
  {
    id: 'ex-meticulous-best',
    itemId: 'vocab-meticulous',
    kind: 'best-expression',
    instructions: 'Choose the sentence that praises detailed, careful work.',
    prompt: 'Which sentence is a compliment?',
    options: [
      { id: 'a', text: 'She kept meticulous records of every change request.' },
      { id: 'b', text: 'She kept pedantic records of every change request.' },
      { id: 'c', text: 'She kept fussy records of every change request.' },
      { id: 'd', text: 'She kept sloppy records of every change request.' },
    ],
    correctOptionId: 'a',
    explanation:
      "Meticulous is approving. 'Pedantic' and 'fussy' criticise an excessive concern with detail, and 'sloppy' is the opposite of careful.",
  },
  {
    id: 'ex-ambiguous-choice',
    itemId: 'vocab-ambiguous',
    kind: 'multiple-choice',
    instructions: 'Choose the sentence that describes a clause with two possible readings.',
    prompt: 'The clause does not say who bears the cost, and it can be read in two ways. Which sentence is right?',
    options: [
      { id: 'a', text: 'The clause is ambiguous: it can be read in two ways.' },
      { id: 'b', text: 'The clause is ambivalent: it can be read in two ways.' },
      { id: 'c', text: 'The clause is ambiguous: it gives no details at all.' },
      { id: 'd', text: 'The clause is ambiguous about to be read in two ways.' },
    ],
    correctOptionId: 'a',
    explanation:
      "Ambiguous means more than one meaning is possible. 'Ambivalent' describes mixed feelings, option (c) describes vagueness rather than double meaning, and (d) is ungrammatical.",
  },
  {
    id: 'ex-plausible-gap',
    itemId: 'vocab-plausible',
    kind: 'gap-fill',
    instructions: 'Complete with one word meaning "seeming reasonable, though not proven".',
    sentenceBefore: 'The explanation sounds',
    sentenceAfter: ', but there is no evidence for it.',
    accepted: ['plausible'],
    hint: 'The adjective does not claim that something is true, only that it sounds likely.',
    explanation:
      "Plausible judges how convincing something sounds, not whether it is proven. 'Credible' would lean towards believing it; 'plausible' leaves the question open.",
  },
  {
    id: 'ex-reluctant-error',
    itemId: 'vocab-reluctant',
    kind: 'error-correction',
    instructions: 'Choose the grammatically correct sentence.',
    prompt: 'Which sentence is correct?',
    options: [
      { id: 'a', text: 'The supplier was reluctant to commit to a fixed price.' },
      { id: 'b', text: 'The supplier was reluctant for committing to a fixed price.' },
      { id: 'c', text: 'The supplier was reluctant to committing to a fixed price.' },
      { id: 'd', text: 'The supplier was reluctant commit to a fixed price.' },
    ],
    correctOptionId: 'a',
    explanation:
      "Reluctant takes to + infinitive: reluctant to commit. Options (b) and (c) use the -ing pattern, and (d) omits 'to'.",
  },
  {
    id: 'ex-adverse-choice',
    itemId: 'vocab-adverse',
    kind: 'multiple-choice',
    instructions: 'Choose the word that fits the sentence.',
    prompt: 'The delay had an ___ effect on the launch schedule.',
    options: [
      { id: 'a', text: 'adverse' },
      { id: 'b', text: 'averse' },
      { id: 'c', text: 'adverted' },
      { id: 'd', text: 'advised' },
    ],
    correctOptionId: 'a',
    explanation:
      "Adverse means harmful or unfavourable and collocates with effect, conditions and publicity. 'Averse' means unwilling (risk-averse) and describes people or attitudes.",
  },
  {
    id: 'ex-coherent-best',
    itemId: 'vocab-coherent',
    kind: 'best-expression',
    instructions: 'Choose the sentence that uses coherent with its proper meaning.',
    prompt: 'Which sentence uses coherent correctly?',
    options: [
      { id: 'a', text: 'The strategy is coherent: each project supports the same three goals.' },
      { id: 'b', text: 'The strategy is coherent: it is easy to read.' },
      { id: 'c', text: 'The strategy is coherent: it was written by one author.' },
      { id: 'd', text: 'The strategy is coherent of three goals.' },
    ],
    correctOptionId: 'a',
    explanation:
      "Coherent describes how the parts fit together logically. Option (b) describes clarity, (c) describes authorship, and (d) uses the wrong pattern.",
  },
  {
    id: 'ex-viable-gap',
    itemId: 'vocab-viable',
    kind: 'gap-fill',
    instructions: 'Complete with one adjective meaning "able to work successfully".',
    sentenceBefore: 'Keeping two suppliers may not be commercially',
    sentenceAfter: 'once volumes fall.',
    accepted: ['viable'],
    hint: 'The word is about surviving and working in commercial terms.',
    explanation:
      "Viable means capable of working or surviving, and 'commercially viable' is a fixed collocation. 'Feasible' would ask whether it can be done at all, not whether it can succeed.",
  },
  {
    id: 'ex-inherent-choice',
    itemId: 'vocab-inherent',
    kind: 'multiple-choice',
    instructions: 'Choose the sentence with the correct preposition.',
    prompt: 'Which sentence is correct?',
    options: [
      { id: 'a', text: 'Uncertainty is inherent in long-term forecasting.' },
      { id: 'b', text: 'Uncertainty is inherent on long-term forecasting.' },
      { id: 'c', text: 'Uncertainty is inherent at long-term forecasting.' },
      { id: 'd', text: 'Uncertainty is inherent with long-term forecasting.' },
    ],
    correctOptionId: 'a',
    explanation:
      "The adjective inherent is followed by 'in': 'the risks inherent in the process'. The other prepositions do not collocate with this adjective.",
  },
  {
    id: 'ex-arbitrary-choice',
    itemId: 'vocab-arbitrary',
    kind: 'multiple-choice',
    instructions: 'Choose the word that means "decided without a reason or system".',
    prompt: 'Which word completes the criticism? "The cut-off date feels ___; nothing changed on that day."',
    options: [
      { id: 'a', text: 'arbitrary' },
      { id: 'b', text: 'random' },
      { id: 'c', text: 'chronic' },
      { id: 'd', text: 'tentative' },
    ],
    correctOptionId: 'a',
    explanation:
      "Arbitrary criticises a decision as unjustified. 'Random' describes a selection method, 'chronic' describes a long-lasting problem, and 'tentative' means provisional.",
  },
];

export const vocabularyNuanceExercisesPartTwo: readonly Exercise[] = [
  {
    id: 'ex-candid-best',
    itemId: 'vocab-candid',
    kind: 'best-expression',
    instructions: 'Choose the option that sounds honest without sounding harsh.',
    prompt: 'She admitted the study had limits. Which sentence is the most positive in tone?',
    options: [
      { id: 'a', text: 'She was candid about the limitations of the study.' },
      { id: 'b', text: 'She was blunt about the limitations of the study.' },
      { id: 'c', text: 'She was tactless about the limitations of the study.' },
      { id: 'd', text: 'She was evasive about the limitations of the study.' },
    ],
    correctOptionId: 'a',
    explanation:
      "Candid is approving: honest and direct. 'Blunt' can sound harsh, 'tactless' is clearly critical, and 'evasive' means she avoided the subject, which contradicts the situation.",
  },
  {
    id: 'ex-scrutinise-best',
    itemId: 'vocab-scrutinise',
    kind: 'error-correction',
    instructions: 'Choose the sentence that is correct English.',
    prompt: 'Which sentence is correct?',
    options: [
      { id: 'a', text: 'The regulator scrutinised the accounts before the merger.' },
      { id: 'b', text: 'The regulator scrutinised on the accounts before the merger.' },
      { id: 'c', text: 'The regulator made scrutiny the accounts before the merger.' },
      { id: 'd', text: 'The regulator scrutinised to the accounts before the merger.' },
    ],
    correctOptionId: 'a',
    explanation:
      "Scrutinise is a transitive verb: it takes a direct object with no preposition. Note the related noun: 'the accounts came under scrutiny'.",
  },
  {
    id: 'ex-alleviate-choice',
    itemId: 'vocab-alleviate',
    kind: 'multiple-choice',
    instructions: 'Choose the verb that means the problem became less severe without disappearing.',
    prompt: 'Which sentence reports reduced pressure rather than a full solution?',
    options: [
      { id: 'a', text: 'The measures alleviated the shortage without solving it.' },
      { id: 'b', text: 'The measures eradicated the shortage without solving it.' },
      { id: 'c', text: 'The measures eliminated the shortage without solving it.' },
      { id: 'd', text: 'The measures exacerbated the shortage without solving it.' },
    ],
    correctOptionId: 'a',
    explanation:
      "Alleviate means make less severe. 'Eradicate' and 'eliminate' mean remove completely, which contradicts 'without solving it', and 'exacerbate' means make worse.",
  },
  {
    id: 'ex-exacerbate-gap',
    itemId: 'vocab-exacerbate',
    kind: 'gap-fill',
    instructions: 'Complete with the past simple of a formal verb meaning "made worse".',
    sentenceBefore: 'Delaying the release',
    sentenceAfter: 'the cash-flow problem.',
    accepted: ['exacerbated'],
    hint: 'The verb has five syllables and needs an object.',
    explanation:
      "Exacerbate means make a bad situation worse and takes a direct object: 'exacerbated the cash-flow problem'. In informal speech, 'made it worse' is the natural equivalent.",
  },
  {
    id: 'ex-feasible-choice',
    itemId: 'vocab-feasible',
    kind: 'error-correction',
    instructions: 'Choose the grammatically correct sentence.',
    prompt: 'Which sentence is correct?',
    options: [
      { id: 'a', text: 'It is not feasible to interview every user before the deadline.' },
      { id: 'b', text: 'It is not feasible interviewing every user before the deadline.' },
      { id: 'c', text: 'It is not feasible for interview every user before the deadline.' },
      { id: 'd', text: 'It is not feasible that interview every user before the deadline.' },
    ],
    correctOptionId: 'a',
    explanation:
      "The pattern is 'it is (not) feasible to + infinitive'. Options (b), (c) and (d) use patterns that belong to other adjectives and constructions.",
  },
];

export const vocabularyNuanceExercisesPartThree: readonly Exercise[] = [
  {
    id: 'ex-undermine-best',
    itemId: 'vocab-undermine',
    kind: 'multiple-choice',
    instructions: 'Choose the verb that completes the sentence.',
    prompt: 'Repeated delays ___ confidence in the schedule.',
    options: [
      { id: 'a', text: 'undermined' },
      { id: 'b', text: 'underscored' },
      { id: 'c', text: 'underlaid' },
      { id: 'd', text: 'underestimated' },
    ],
    correctOptionId: 'a',
    explanation:
      "Undermine means weaken gradually, and it collocates with confidence, authority and credibility. 'Underscore' means emphasise, which reverses the meaning; 'underestimate' means assess too low.",
  },
  {
    id: 'ex-prudent-choice',
    itemId: 'vocab-prudent',
    kind: 'multiple-choice',
    instructions: 'Choose the adjective that fits a recommendation about risk.',
    prompt: 'It would be ___ to keep a second backup off site.',
    options: [
      { id: 'a', text: 'prudent' },
      { id: 'b', text: 'prudish' },
      { id: 'c', text: 'prodigal' },
      { id: 'd', text: 'peripheral' },
    ],
    correctOptionId: 'a',
    explanation:
      "Prudent means showing careful judgement about risk. 'Prudish' means easily shocked, 'prodigal' means recklessly wasteful, and 'peripheral' means secondary.",
  },
  {
    id: 'ex-intricate-gap',
    itemId: 'vocab-intricate',
    kind: 'gap-fill',
    instructions: 'Complete with one adjective meaning "having many small details".',
    sentenceBefore: 'The pricing rules are',
    sentenceAfter: 'and only two people understand them fully.',
    accepted: ['intricate'],
    hint: 'The word suggests impressive detail rather than mere difficulty.',
    explanation:
      "Intricate describes something with many interlocking details, often with a hint of admiration. 'Complex' would be neutral, and 'complicated' suggests difficulty instead of detail.",
  },
  {
    id: 'ex-stark-choice',
    itemId: 'vocab-stark',
    kind: 'multiple-choice',
    instructions: 'Choose the adjective that signals a very strong contrast.',
    prompt: 'There is a ___ contrast between what was promised and what was delivered.',
    options: [
      { id: 'a', text: 'stark' },
      { id: 'b', text: 'slight' },
      { id: 'c', text: 'implicit' },
      { id: 'd', text: 'negligible' },
    ],
    correctOptionId: 'a',
    explanation:
      "Stark marks a severe, unsoftened contrast. 'Slight' and 'negligible' would deny the size of the contrast, and 'implicit' means unstated rather than obvious.",
  },
  {
    id: 'ex-impartial-best',
    itemId: 'vocab-impartial',
    kind: 'error-correction',
    instructions: 'Choose the sentence that requires the panel to be unbiased.',
    prompt: 'Which sentence is correct and means "without bias"?',
    options: [
      { id: 'a', text: 'The panel must be seen to be impartial.' },
      { id: 'b', text: 'The panel must be seen to be partial.' },
      { id: 'c', text: 'The panel must be seen to be impartiality.' },
      { id: 'd', text: 'The panel must be seen impartial to be.' },
    ],
    correctOptionId: 'a',
    explanation:
      "Impartial means not favouring a side. 'Partial' means biased (or incomplete), (c) uses a noun where an adjective is needed, and (d) scrambles the word order.",
  },
];

export const vocabularyNuanceExercisesPartFour: readonly Exercise[] = [
  {
    id: 'ex-tentative-choice',
    itemId: 'vocab-tentative',
    kind: 'multiple-choice',
    instructions: 'Choose the adjective that means the agreement is not final.',
    prompt: 'We reached a ___ agreement, subject to legal review.',
    options: [
      { id: 'a', text: 'tentative' },
      { id: 'b', text: 'unanimous' },
      { id: 'c', text: 'binding' },
      { id: 'd', text: 'perpetual' },
    ],
    correctOptionId: 'a',
    explanation:
      "Tentative means provisional, which fits 'subject to legal review'. 'Binding' would mean the opposite, and 'unanimous' and 'perpetual' describe other qualities of agreements.",
  },
  {
    id: 'ex-discrepancy-gap',
    itemId: 'vocab-discrepancy',
    kind: 'gap-fill',
    instructions: 'Complete with one noun meaning "a difference between figures that should match".',
    sentenceBefore: 'There is a',
    sentenceAfter: 'between the invoice total and the purchase order.',
    accepted: ['discrepancy'],
    hint: 'The noun begins with dis- and is followed by between.',
    explanation:
      "A discrepancy is a mismatch between two things that ought to agree, and the pattern is 'a discrepancy between X and Y'. 'Difference' would be too neutral for accounts that should match.",
  },
  {
    id: 'ex-stringent-choice',
    itemId: 'vocab-stringent',
    kind: 'multiple-choice',
    instructions: 'Choose the adjective that describes demanding rules.',
    prompt: 'Which sentence is correct and natural?',
    options: [
      { id: 'a', text: 'The sector operates under stringent data-protection rules.' },
      { id: 'b', text: 'The sector operates under a stringent manager.' },
      { id: 'c', text: 'The sector operates under stringent people.' },
      { id: 'd', text: 'The sector operates under stringent because of the rules.' },
    ],
    correctOptionId: 'a',
    explanation:
      "Stringent describes rules, controls and requirements, not people. For a person, English uses 'strict' or 'demanding'.",
  },
  {
    id: 'ex-obsolete-best',
    itemId: 'vocab-obsolete',
    kind: 'best-expression',
    instructions: 'Choose the sentence that says the system has been replaced by something better.',
    prompt: 'Which sentence uses obsolete correctly?',
    options: [
      { id: 'a', text: 'The interface became obsolete once the vendor changed its API.' },
      { id: 'b', text: 'The interface became obsolete of the vendor API.' },
      { id: 'c', text: 'The interface became obsolete to change the API.' },
      { id: 'd', text: 'The interface obsolete the vendor API.' },
    ],
    correctOptionId: 'a',
    explanation:
      "Obsolete means superseded, and the natural pattern is 'become obsolete'. Options (b), (c) and (d) misuse the word's grammar.",
  },
  {
    id: 'ex-resilient-choice',
    itemId: 'vocab-resilient',
    kind: 'multiple-choice',
    instructions: 'Choose the adjective that stresses recovery after a shock.',
    prompt: 'Smaller suppliers proved more ___ during the downturn: they recovered within a year.',
    options: [
      { id: 'a', text: 'resilient' },
      { id: 'b', text: 'robust' },
      { id: 'c', text: 'redundant' },
      { id: 'd', text: 'reluctant' },
    ],
    correctOptionId: 'a',
    explanation:
      "Resilient highlights recovery after difficulty, which matches 'they recovered within a year'. 'Robust' would highlight resistance to failure, and 'redundant' means no longer needed.",
  },
];



