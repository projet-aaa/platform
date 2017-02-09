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
        title: "Question compilation",
        question: "Parmi les langages suivants, lequel est compilé ?",
        choices: ["javascript", "C++", "python"],
        explanations: ["langage transformé en bytecode", "en effet", "interprété"],
        answer: 1 // index of the right answer (begins at 0)
    },
    quizStats: {
        "javascript": 14,
        "C++": 58,
        "python": 28
    },
    quizLaunchers: [
        {
                quizId: 1,
                title: "Question compilation",
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