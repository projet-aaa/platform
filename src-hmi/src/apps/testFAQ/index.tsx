import { viewTestFactory } from '../../utils'

import { View, Props } from '../../views/navigation/faqQuestionView'

viewTestFactory<Props>(View, {
    text: "Quel est le sens de la vie ?",
    author: "Somin Maurel",
    date: new Date(2017,0,1),
    answers: [{
            text: "C'est par là ->",
            author: "GibsS",
            date: new Date(2017,0,1),
            votes: 2
        },
        {
            text: "Non c'est par là ->",
            author: "Vincent",
            date: new Date(2017,0,2),
            votes: -3
        }
    ]
})