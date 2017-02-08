import { viewTestFactory } from '../../utils'

import {View as Dashboardview, Props} from '../../views/dashboard/dashboardView'

import { QuizType } from '../../models/class/class'

viewTestFactory<Props>(Dashboardview, {
    tooFast: 0,
    tooSlow: 1,
    panic: 1,
    currentQuiz: {
        id: 0,
        type: QuizType.MCQ,
        title: 'Une question à la con',
        question: 'Pouvez vous répondre à cette question?',
        choices: ['Oui', 'Non', 'Peut-être'],
        answer: 1,
        explanations: "C'est évident!"
    },
    quizz: [{
       id: 2,
       title: 'Une question passé',
       state: 2,
       successRate: 90 
    }, {
        id: 0,
        title: 'Une question à la con',
        state: 1, // 0: not done; 1: being run; 2: already ran 
        successRate: 50
    }, {
        id: 1,
        title: 'Une question à venir',
        state: 0, // 0: not done; 1: being run; 2: already ran 
        successRate: 0
    }],
    quizStats: [
       {
           choices: [
               {
                   id: 1,
                   text: "choix 1",
                   percentChosen: 64
               },
               {
                   id: 2,
                   text: "choix 2",
                   percentChosen: 36
               }
           ],
           title:"mon premier quiz",
           correctAnswer: 2,
           state: 0
       },
       {
           choices: [
               {
                   id: 1,
                   text: "choix 1 q2",
                   percentChosen: undefined
               },
               {
                   id: 2,
                   text: "choix 2 q2",
                   percentChosen: undefined
               }
           ],
           title:"mon quiz n2",
           correctAnswer: 1,
           state: 2
       }
   ],
   launchQuiz: (i) => console.log("launch " + i),
})