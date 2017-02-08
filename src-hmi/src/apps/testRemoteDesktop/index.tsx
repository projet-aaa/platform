import { viewTestFactory } from '../../utils'

import { View, Props } from '../../views/quiz/remoteViewDesktop'

import { QuizType } from '../../models/class/class'

viewTestFactory<Props>(View, {
    quiz: {
        id: 0,
        type: QuizType.MCQ,
        title: "Ceci est une question",
        question: "Est ce que je ok?",
        choices: ["peut être", "mr l'arbitre", "oui", "D"],
        explanations: ["peut-être que c'est faux", "aux chiottes l'arbitre", "NON !!!!!!!!!", "Voilà !"],
        answer: 3
    },
    quizChoice: { quizId: 0, choice: 0 },
    showCorrection: true, // to show explanations of answers
    forceUnfold: true, // to only display the question and the choices (for the teacher)
    question: true,
    score: 40,
    rank: 10,
    population: 25,
    highscore: 55,
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