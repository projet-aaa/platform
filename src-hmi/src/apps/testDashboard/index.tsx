import { viewTestFactory } from '../../utils'

import {View as Dashboardview, Props} from '../../views/dashboard/dashboardView'

import { QuizType } from '../../models/class/class'

viewTestFactory<Props>(Dashboardview, {
    tooFast: 50,
    tooSlow: 10,
    panic: 95,
    currentQuiz: {
        id: 0,
        type: QuizType.MCQ,
        title: 'Une question à la con',
        question: 'Pouvez vous répondre à cette question?',
        choices: ['Oui', 'Non', 'Peut-être'],
        answer: 1,
        explanations: ["C'est évident!","de même", "mais non"]
    },
    quizStats: {
        Oui: 36,
        Non: 64,
        'Peut-être': 0
    },
    quizLaunchers: [
        {
                quizId: 1,
                title: "mon premier quiz",
                state: 2, // 0: not done; 1: being run; 2: already ran 
                successRate: 36
        },
        {
                quizId: 1,
                title: "mon quiz n2",
                state: 0, // 0: not done; 1: being run; 2: already ran 
                successRate: 0
        }
    ],
    launchQuiz: (i) => console.log("launch " + i),
})