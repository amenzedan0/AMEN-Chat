const QUESTIONS = [

  {
    question: "پایتەختی عێراق چییە؟",
    options: ["هەولێر", "بەغدا", "سلێمانی", "دهۆک"],
    answer: 1
  },
  {
    question: "گەورەترین هەسارەی سیستەمی خۆر چییە؟",
    options: ["زەوی", "مەریخ", "جوپیتر", "زوحەل"],
    answer: 2
  },
  {
    question: "H2O چییە؟",
    options: ["ئاو", "هەوا", "خوێ", "ئاسن"],
    answer: 0
  },
  {
    question: "CPU لە کۆمپیوتەر چییە؟",
    options: ["جۆری مۆنیتەر", "پرۆسێسەر", "کیبۆرد", "ماوس"],
    answer: 1
  },
  {
    question: "یەکەم مانگی ساڵ چییە؟",
    options: ["نیسان", "شوبات", "کانوونی دووەم", "تشرینی یەکەم"],
    answer: 2
  },

  {
    question: "ڕۆژەکە چەند کاتژمێرە؟",
    options: ["12", "18", "24", "30"],
    answer: 2
  },
  {
    question: "کامەیان سیارەیە؟",
    options: ["خۆر", "مانگ", "زەوی", "ئەستێرە"],
    answer: 2
  },
  {
    question: "کام ئاژەڵ بە پاشای ئاژەڵان ناسراوە؟",
    options: ["پڵنگ", "شێر", "ئەسپ", "فیلی"],
    answer: 1
  },
  {
    question: "چەند ڕۆژ لە هەفتەیە؟",
    options: ["5", "6", "7", "8"],
    answer: 2
  },
  {
    question: "5 × 5 چەندە؟",
    options: ["15", "20", "25", "30"],
    answer: 2
  },

  {
    question: "پایتەختی فەرەنسا چییە؟",
    options: ["لۆندەن", "پاریس", "بەرلین", "ڕۆما"],
    answer: 1
  },
  {
    question: "زەوی دەوری چی دەسوڕێتەوە؟",
    options: ["مانگ", "خۆر", "مەریخ", "جوپیتر"],
    answer: 1
  },
  {
    question: "کامەیان زمانێکی پرۆگرامسازییە؟",
    options: ["Python", "Chrome", "Windows", "Google"],
    answer: 0
  },
  {
    question: "HTML بۆ چی بەکاردێت؟",
    options: ["دروستکردنی بنەمای وێب", "یاری", "مۆسیقا", "ڤیدیۆ"],
    answer: 0
  },
  {
    question: "RAM چییە؟",
    options: ["بیرگەی کاتی", "مۆنیتەر", "کیبۆرد", "پرینتەر"],
    answer: 0
  },

  {
    question: "کامەیان گەورەترین ئۆقیانۆسە؟",
    options: ["ئەتلەسی", "هندی", "ئارام", "ئارکتیک"],
    answer: 2
  },
  {
    question: "کۆدی 101 لە سیستەمی binary چی دەبێت؟",
    options: ["3", "4", "5", "6"],
    answer: 2
  },
  {
    question: "کامەیان پێکهاتەی سەرەکی هەوا نییە؟",
    options: ["نایتڕۆجین", "ئۆکسجین", "ئاسن", "ئارگۆن"],
    answer: 2
  },
  {
    question: "لە بیرکاریدا 10 + 15 چەندە؟",
    options: ["20", "25", "30", "35"],
    answer: 1
  },
  {
    question: "کامەیان گۆڵێکی تۆپی پێیە؟",
    options: ["Basketball", "Football", "Tennis", "Golf"],
    answer: 1
  },

  {
    question: "کێ یەکێکە لە هونەرمەندانی بەناوبانگی مۆنالیزا؟",
    options: ["Leonardo da Vinci", "Newton", "Einstein", "Darwin"],
    answer: 0
  },
  {
    question: "چەند هەڵبژاردە لەم یارییەدا هەیە؟",
    options: ["2", "3", "4", "5"],
    answer: 2
  },
  {
    question: "ئۆتۆمبێل بۆ چی بەکاردێت؟",
    options: ["گەشتکردن", "خوێندن", "خواردن", "نووسین"],
    answer: 0
  },
  {
    question: "لە زانستدا DNA چییە؟",
    options: ["ماددەی ژینگەیی", "ئاوی خوێن", "هەوا", "خوێ"],
    answer: 0
  },
  {
    question: "کامەیان ئاژەڵێکی ئاویە؟",
    options: ["ماسی", "شێر", "ئەسپ", "کەر"],
    answer: 0
  },

  {
    question: "مانگ چەند ڕووی سەرەکی هەیە بۆ زەوی؟",
    options: ["1", "2", "3", "4"],
    answer: 0
  },
  {
    question: "ئاو لە چ پلەیەکدا دەکوڵێت لە فشاری ئاسایی؟",
    options: ["50°C", "75°C", "100°C", "150°C"],
    answer: 2
  },
  {
    question: "کامەیان پێوانەی درێژییە؟",
    options: ["مەتەر", "کیلۆگرام", "چرکە", "کێلوین"],
    answer: 0
  },
  {
    question: "کێ جاذبیەتی گشتی پەرەپێدا؟",
    options: ["Newton", "Darwin", "Tesla", "Edison"],
    answer: 0
  },
  {
    question: "کامەیان ڕووەکە؟",
    options: ["دار", "شێر", "ماسی", "مرۆڤ"],
    answer: 0
  }

];

// زیادکردنی پرسیارەکان بۆ دروستکردنی 100 پرسیار
const extra = [
  ["کامەیان سیستەمی کارپێکردنە؟", ["Windows", "Chrome", "YouTube", "Google"], 0],
  ["2 + 8 چەندە؟", ["8", "10", "12", "14"], 1],
  ["کامەیان سیارەیە؟", ["زەوی", "خۆر", "مانگ", "ئەستێرە"], 0],
  ["کامەیان ئاژەڵە؟", ["گۆڵ", "پەپوولە", "دار", "بەرد"], 1],
  ["کامەیان بۆ گەڕان لە وێبە؟", ["Google", "Word", "Paint", "Calculator"], 0]
];

while (QUESTIONS.length < 100) {
  for (const item of extra) {
    if (QUESTIONS.length >= 100) break;

    QUESTIONS.push({
      question: item[0] + " #" + (QUESTIONS.length + 1),
      options: [...item[1]],
      answer: item[2]
    });
  }
}


/* Shuffle answers */
function shuffleAnswers(question) {

  const correctText = question.options[question.answer];

  const answers = question.options.map(text => ({
    text,
    correct: text === correctText
  }));

  for (let i = answers.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [answers[i], answers[j]] =
    [answers[j], answers[i]];
  }

  question.options = answers.map(x => x.text);

  question.answer =
    answers.findIndex(x => x.correct);
}

QUESTIONS.forEach(shuffleAnswers);