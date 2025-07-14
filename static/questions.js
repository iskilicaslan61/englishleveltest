const questions = [
  {
    question: "Peter ___ at seven o'clock.",
    options: ["goes up", "gets", "gets up"],
    correctAnswer: "gets up",
    level: "A1" // Basic phrasal verb, beginner level
  },
  {
    question: "We don't have ___ butter.",
    options: ["a", "any", "got"],
    correctAnswer: "any",
    level: "A1" // Basic quantifier, beginner level
  },
  {
    question: "He didn't ___ glasses.",
    options: ["put", "wear", "take"],
    correctAnswer: "wear",
    level: "A1" // Simple past tense, basic verb choice
  },
  {
    question: "They ___ from Spain.",
    options: ["is", "are", "do"],
    correctAnswer: "are",
    level: "A1" // Basic verb 'to be', subject-verb agreement
  },
  {
    question: "___ he play tennis?",
    options: ["Where", "Does", "Do"],
    correctAnswer: "Does",
    level: "A1" // Basic question formation with 'does'
  },
  {
    question: "We ___ live in a flat.",
    options: ["don't", "hasn't", "doesn't"],
    correctAnswer: "don't",
    level: "A1" // Negative form of present simple
  },
  {
    question: "What do you do? I'm ___ student.",
    options: ["the", "a", "the"],
    correctAnswer: "a",
    level: "A1" // Article usage, beginner level
  },
  {
    question: "Have you got a pen? Yes, I ___.",
    options: ["am", "have", "got"],
    correctAnswer: "have",
    level: "A1" // Present perfect with 'have got'
  },
  {
    question: "I ___ there for a long time.",
    options: ["lived", "living", "live"],
    correctAnswer: "lived",
    level: "A2" // Past simple, slightly more complex
  },
  {
    question: "Those shoes are very ___.",
    options: ["expensive", "a lot", "cost"],
    correctAnswer: "expensive",
    level: "A1" // Basic adjective usage
  },
  {
    question: "___ are you from?",
    options: ["What", "Who", "Where"],
    correctAnswer: "Where",
    level: "A1" // Basic question word
  },
  {
    question: "We ___ got a garage.",
    options: ["haven't", "hasn't", "don't"],
    correctAnswer: "haven't",
    level: "A1" // Negative form of 'have got'
  },
  {
    question: "The restaurant was ___ busy.",
    options: ["very", "a lot", "many"],
    correctAnswer: "very",
    level: "A1" // Intensifier with adjective
  },
  {
    question: "___ name is Robert.",
    options: ["Me", "I", "My"],
    correctAnswer: "My",
    level: "A1" // Possessive pronoun
  },
  {
    question: "___ you like this DVD?",
    options: ["Are", "Have", "Do"],
    correctAnswer: "Do",
    level: "A1" // Present simple question with 'like'
  },
  {
    question: "Daniel's hair is getting far too long; he should ___ soon.",
    options: ["cut it", "have cut it", "have it cut"],
    correctAnswer: "have it cut",
    level: "B1" // Causative 'have' structure
  },
  {
    question: "I usually ___ swimming at least once a week.",
    options: ["go", "do", "play"],
    correctAnswer: "go",
    level: "A2" // Collocation with 'go swimming'
  },
  {
    question: "The global financial crisis is forcing lots of small businesses to close, ___ does not look set to end soon.",
    options: ["it", "that", "which"],
    correctAnswer: "which",
    level: "B2" // Relative pronoun in non-restrictive clause
  },
  {
    question: "___ feeling OK? You don't look very well.",
    options: ["Do you", "You are", "Are you"],
    correctAnswer: "Are you",
    level: "A2" // Question with 'feel', inversion
  },
  {
    question: "I can't hear you ___ it's noisy in here.",
    options: ["too", "too much", "too many"],
    correctAnswer: "too",
    level: "A2" // Use of 'too' as an intensifier
  },
  {
    question: "We stayed in a lovely villa ___ the sea.",
    options: ["it overlooks", "overlooked", "overlooking"],
    correctAnswer: "overlooking",
    level: "B1" // Participle clause for description
  },
  {
    question: "What are the weather conditions? It's pouring down, and it's freezing.",
    options: ["high winds and snow", "heavy rain and cold temperatures", "thick cloud but quite warm"],
    correctAnswer: "heavy rain and cold temperatures",
    level: "A2" // Weather vocabulary and description
  },
  {
    question: "Photographers and designers need to be very ___.",
    options: ["creative", "If", "annoying"],
    correctAnswer: "creative",
    level: "A2" // Specific vocabulary for professions
  },
  {
    question: "Not until the 1980s ___ for the average person to own a computer.",
    options: ["It was possible", "was it possible", "was possible"],
    correctAnswer: "was it possible",
    level: "B2" // Inversion with 'not until'
  },
  {
    question: "Mandy works for a computer software company. She got ___ recently, and so now she's an area manager.",
    options: ["made redundant", "promoted", "a raise"],
    correctAnswer: "promoted",
    level: "B1" // Work-related vocabulary and context
  },
  {
    question: "Carl's very ___. He never late, and he never forgets to do things.",
    options: ["reliable", "patient", "strict"],
    correctAnswer: "reliable",
    level: "A2" // Adjective for character traits
  },
  {
    question: "I'm 18 and my brother is 20, so he's ___ me.",
    options: ["the oldest of", "older than", "as old as"],
    correctAnswer: "older than",
    level: "A2" // Comparative structure
  },
  {
    question: "Tomorrow's a holiday, so we ___ go to work.",
    options: ["have to", "mustn't", "don't have to"],
    correctAnswer: "don't have to",
    level: "A2" // Modal verb for obligation
  },
  {
    question: "This is ___ area, with a lot of factories and warehouses.",
    options: ["an agricultural", "an industrial", "a residential"],
    correctAnswer: "an industrial",
    level: "B1" // Specific vocabulary for areas
  },
  {
    question: "If I ___ well in my exams, I ___ to university.",
    options: ["will do; will go", "will do; go", "do; will go"],
    correctAnswer: "do; will go",
    level: "B1" // First conditional
  },
  {
    question: "I'm surprised you didn't get upset. If someone said that to me, ___ really angry.",
    options: ["I'm", "I was", "I'd be"],
    correctAnswer: "I'd be",
    level: "B1" // Second conditional for hypothetical situations
  },
  {
    question: "Cats and dogs are usually kept as ___.",
    options: ["farm animals", "wild animals", "pets"],
    correctAnswer: "pets",
    level: "A1" // Basic vocabulary
  },
  {
    question: "I went to a lovely ___ last Saturday. The bride was my best friend when we were at school.",
    options: ["anniversary", "marriage", "wedding"],
    correctAnswer: "wedding",
    level: "A2" // Event-related vocabulary
  },
  {
    question: "There ___ a terrible accident if the pilot hadn't reacted so quickly.",
    options: ["had been", "was", "would have been"],
    correctAnswer: "would have been",
    level: "B2" // Third conditional
  },
  {
    question: "It leaves from Platform 2 at 4.15. The speaker is talking about ___.",
    options: ["an airline flight", "a train", "a taxi"],
    correctAnswer: "a train",
    level: "A2" // Context-based vocabulary
  },
  {
    question: "I've been working here ___ about the last two years.",
    options: ["during", "for", "since"],
    correctAnswer: "for",
    level: "A2" // Prepositions of time
  },
  {
    question: "My job is never boring. The speaker's job is always ___.",
    options: ["interesting", "popular", "difficult"],
    correctAnswer: "interesting",
    level: "A1" // Basic adjective antonym
  },
  {
    question: "She won a seat in parliament at the last ___.",
    options: ["general election", "opinion poll", "referendum"],
    correctAnswer: "general election",
    level: "B1" // Political vocabulary
  },
  {
    question: "The patient had an ___ to insert metal pins in his broken leg.",
    options: ["injection", "operation", "X-ray"],
    correctAnswer: "operation",
    level: "A2" // Medical vocabulary
  },
  {
    question: "Are you ready to order? - Not yet, I'm still looking at the ___.",
    options: ["bill", "menu", "service"],
    correctAnswer: "menu",
    level: "A1" // Everyday vocabulary
  }
];

export default questions;