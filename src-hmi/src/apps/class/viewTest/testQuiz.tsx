import { viewTestFactory } from '../../../utils'

import { View, Props } from '../../../views/quiz/quizView'

import { QuizType } from '../../../models/class/class'

viewTestFactory<Props>(View, {
    quiz: {
        id: 0,
        type: QuizType.MCQ,
        title: "La question à mille rouble",
        question: "Est ce que je ok?",
        choices: ["peut être", "mr l'arbitre", "oui", "D"],
        explanations: ["peut-être que c'est faux", "aux chiottes l'arbitre", "NON !!!!!!!!!", "Voilà !"],
        answer: 3
    },
    quizChoice: {
        quizId: 0,
        choice: 0
    },
    showCorrection: true, // to show explanations of answers
    forceUnfold: true, // to only display the question and the choices (for the teacher)
    choose: (quizId, i) => console.log("Test : " + i),
    validate: (quizId) => console.log("Je valide!"),
    nextQuiz: () => {}, // null => no button, everything else => button
    prevQuiz: () => {} // idem
})