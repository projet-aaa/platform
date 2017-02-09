import { viewTestFactory } from '../../utils'

import { View, Props } from '../../views/quiz/remoteViewDesktop'

import { QuizType } from '../../models/class/class'

viewTestFactory<Props>(View, {
    quiz: {
        id: 0,
        type: QuizType.MCQ,
        title: "Question compilation",
        question: "Parmi les langages suivants, lequel est compilé ?",
        choices: ["javascript", "C++", "python"],
        explanations: ["langage transformé en bytecode", "en effet", "interprété"],
        answer: 1 // index of the right answer (begins at 0)
    },
    quizChoice: { quizId: 0, choice: -1 },
    showCorrection: false, // to show explanations of answers
    forceUnfold: false, // to only display the question and the choices (for the teacher)
    question: true,
    score: 40,
    rank: 10,
    population: 25,
    highscore: 55,
    average: 33,
    choose: (id, choice) => console.log("Je choisis!"), // null => no validate button
    validateAnswer: (quizId) => console.log("Je valide!"),
    sendComment: (comment) => console.log(comment),
    nextQuiz: () => {}, // null => no button, everything else => button
    prevQuiz: () => {}, // idem
    signalPanic: () => {}, // bullshit
    signalSlow: () => {}, // idem
    signalFast: () => {} // idem
})