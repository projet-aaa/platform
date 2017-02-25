import { handleActions } from "redux-actions"

import { Action } from "../../../utils"
import { ActionTypes, RetrieveThreadInfosAction, ReceiveThreadInfosAction } from "../actions/actionTypes"
import { Thread } from "../../../models/faq"

interface ThreadContent {
    threadList: Thread[]
}

let initialState: ThreadContent = {
    threadList: [{
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
    },{
        text: "Une deuxieme question",
        author: "Vincent Hachar",
        id: 121,
        date: new Date(2017,0,20),
        answers: [{
            text: "<div>" +
                "<p>Test de rendu en html avec une deuxieme question</p>" + 

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
            votes: 1
        },
        {
            text: "Oui",
            author: "Vincent",
            date: new Date(2017,0,2),
            id: 156464,
            votes: -8
        }
        ]
    }]
}

const name = "threadContent"
const reducer = handleActions({
    [ActionTypes.RETRIEVETHREADINFOS]: function(state: ThreadContent, action: Action<RetrieveThreadInfosAction>): ThreadContent {
            return state;
    },
    [ActionTypes.RECEIVETHREADINFOS]: function(state: ThreadContent, action: Action<ReceiveThreadInfosAction>): ThreadContent {
            return {...state, threadList: action.payload.retrievedInfos}
    },
}, initialState);

export default { [name]: reducer }