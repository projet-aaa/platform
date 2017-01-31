import { viewTestFactory } from '../../utils'

import { View, Props } from '../../views/quiz/quizView'

import { QuizType } from '../../models/quiz'

viewTestFactory<Props>(View, {
    quiz: {
        id: 0,
        type: QuizType.TEXT,
        question: "Est ce que je ok?",
        choices: ["peut être", "mr l'arbitre", "oui", "D"],
        choice: -1,
        isValidated: true
    },
    choose: (quizId, i) => console.log("Test : " + i),
    validate: (quizId) => console.log("Je valide!"),
})