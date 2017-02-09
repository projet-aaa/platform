import { viewTestFactory } from '../../utils'

import { View, Props } from '../../views/quiz/remoteViewMobile'

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
    question: true,
    score: 40,
    choose: (quizId, i) => console.log("Test : " + i),
    validateAnswer: (quizId) => console.log("Je valide!"),
    sendComment: (comment) => console.log(comment),
    signalPanic: () => {}, // bullshit
    signalSlow: () => {}, // idem
    signalFast: () => {} // idem
})