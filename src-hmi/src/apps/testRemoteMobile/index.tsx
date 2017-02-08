import { viewTestFactory } from '../../utils'

import { View, Props } from '../../views/quiz/remoteViewMobile'

import { QuizType } from '../../models/quiz'

viewTestFactory<Props>(View, {
    quiz: {
        id: 0,
        type: QuizType.MCQ,
        question: "Est ce que je ok?",
        choices: ["peut être", "mr l'arbitre", "oui", "D"],
        explanations: ["peut-être que c'est faux", "aux chiottes l'arbitre", "NON !!!!!!!!!", "Voilà !"],
        answer: 3,
        choice: -1,
        isValidated: false
    },
    question: false,
    score: 40,
    choose: (quizId, i) => console.log("Test : " + i),
    validateAnswer: (quizId) => console.log("Je valide!"),
    sendComment: (comment) => console.log(comment),
    signalPanic: () => {}, // bullshit
    signalSlow: () => {}, // idem
    signalFast: () => {} // idem
})