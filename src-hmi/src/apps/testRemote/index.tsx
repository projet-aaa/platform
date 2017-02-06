import { viewTestFactory } from '../../utils'

import { View, Props } from '../../views/quiz/remoteView'

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
    consultation: true,
    validateAnswer: (quizId) => console.log("Je valide!"),
    sendComment: (comment) => console.log("Je commente")
})