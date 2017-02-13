import { viewTestFactory } from '../../../utils'

import { View, Props } from '../../../views/stats/statQuizView'

import { QuizType } from '../../../models/class/class'

viewTestFactory<Props>(View, {
    quiz: [
        {
            id: 0,
            type: QuizType.MCQ,
            title: "La question à mille rouble",
            question: "Est ce que je ok?",
            choices: ["peut être", "mr l'arbitre", "oui", "D"],
            explanations: ["peut-être que c'est faux", "aux chiottes l'arbitre", "NON !!!!!!!!!", "Voilà !"],
            answer: 3
        }, {
            id: 1,
            type: QuizType.MCQ,
            title: "La question facile",
            question: "Est ce que je ok?",
            choices: ["peut être", "mr l'arbitre", "oui", "D"],
            explanations: ["peut-être que c'est faux", "aux chiottes l'arbitre", "NON !!!!!!!!!", "Voilà !"],
            answer: 3
        }
    ],
    quizChoices: [
        {
            "peut être": 3,
            "mr l'arbitre": 10    
        }
    ],
    currentQuizId: 0,
    chooseQuiz: (id) => console.log("pick: " + id)
})