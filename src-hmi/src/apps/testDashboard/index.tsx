import { viewTestFactory } from '../../utils'

import {View as Dashboardview, Props} from '../../views/dashboard/dashboardView'

viewTestFactory<Props>(Dashboardview, {
   studentFeedback: {
       panicAlert: true,
       slowerAlert: false,
       quickerAlert: true
   },
   quizStatsArray: [
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
           id: 0,
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
           id: 1,
           correctAnswer: 1,
           state: 2
       }
   ],
   launchQuiz: (i) => console.log("launch " + i),
})