import { viewTestFactory } from '../../../utils'

import { View, Props } from '../../../views/faq/faqQuestionView'

viewTestFactory<Props>(View, {
    text: "Quel est le sens de la vie ?",
    author: "Jean Dupont",
    id: 154,
    date: new Date(2017,0,1),
    answers: [{
            text: "<div>" +
                "<p>Test de rendu en html</p>" + 

                "<blockquote>" +
                    "<p>Ceci est une citation</p>" + 
                "</blockquote>" +

                "<pre><code>Ceci est du code" +
                "</code></pre>"+ 

                "<p>Puis à nouveau du texte normal</p>" +          
            "</div>",
            author: "GibsS",
            date: new Date(2017,0,1),
            id: 1654,
            votes: 2
        },
        {
            text: "Non c'est par là ->",
            author: "Vincent",
            date: new Date(2017,0,2),
            id: 156464,
            votes: -3
        }
    ],
    sendAnswer: (content, threadId, userId ) => console.log("answer sent : " + content)
})