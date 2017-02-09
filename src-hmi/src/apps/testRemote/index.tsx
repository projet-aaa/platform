import { viewTestFactory } from '../../utils'

import { View, Props } from '../../views/quiz/remoteView'

import { QuizType } from '../../models/class/class'

viewTestFactory<Props>(View, {
    quiz: {
        id: 0,
        type: QuizType.MCQ,
        title: "Question compilation",
        question: "Parmi les langages suivants, lequel est compilé",
        choices: ["javascript", "C++", "python"],
        explanations: ["langage transformé en bytecode", "en effet", "interprété"],
        answer: 1 // index of the right answer (begins at 0)
    },
    answerConsultation: false, // to show explanations of answers
    displayMode: false, // to only display the question and the choices (for the teacher)
    score: 40,
    rank: 10,
    population: 25,
    highScore: 55,
    average: 33,
    choose: (quizId, i) => console.log("Test : " + i),
    validateAnswer: (quizId) => console.log("Je valide!"),
    sendComment: (comment) => console.log(comment),
    nextQuiz: () => {}, // null => no button, everything else => button
    prevQuiz: () => {}, // idem
    signalPanic: () => {}, // bullshit
    signalSlow: () => {}, // idem
    signalFast: () => {} // idem
})