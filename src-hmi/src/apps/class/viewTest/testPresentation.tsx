import { viewTestFactory } from '../../../utils'

import { View, Props } from '../../../views/dashboard/presentationView'

import { QuizType } from '../../../models/class/class'

viewTestFactory<Props>(View, {
    quiz: {
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
    showCorrection: true
})