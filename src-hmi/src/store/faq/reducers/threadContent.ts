import { handleActions } from "redux-actions"
import { ActionTypes, APIActionTypes } from "../actions/actionTypes"
import { Action } from "../../../utils"

import { Thread } from "../../../models/faq"

interface ThreadContent {
    threadList: Thread[]
}

let initialState: ThreadContent = {
    threadList: []
    // threadList: [{
    //     text: "Quel est le sens de la vie ?",
    //     author: "Jean Dupont",
    //     id: "154",
    //     date: new Date(2017,0,1),
    //     answers: [{
    //         text: "<div>" +
    //             "<p>Test de rendu en html</p>" + 

    //             "<blockquote>" +
    //                 "<p>Ceci est une citation</p>" + 
    //             "</blockquote>" +

    //             "<pre><code>Ceci est du code" +
    //             "</code></pre>"+ 

    //             "<p>Puis à nouveau du texte normal</p>" +          
    //         "</div>",
    //         author: "GibsS",
    //         date: new Date(2017,0,1),
    //         id: "1654",
    //         votes: 2
    //     },
    //     {
    //         text: "Non c'est par là ->",
    //         author: "Vincent",
    //         date: new Date(2017,0,2),
    //         id: "156464",
    //         votes: -3
    //     }
    // ],
    // },{
    //     text: "Une deuxieme question",
    //     author: "Vincent Hachar",
    //     id: "121",
    //     date: new Date(2017,0,20),
    //     answers: [{
    //         text: "<div>" +
    //             "<p>Test de rendu en html avec une deuxieme question</p>" + 

    //             "<blockquote>" +
    //                 "<p>Ceci est une citation</p>" + 
    //             "</blockquote>" +

    //             "<pre><code>Ceci est du code" +
    //             "</code></pre>"+ 

    //             "<p>Puis à nouveau du texte normal</p>" +          
    //         "</div>",
    //         author: "GibsS",
    //         date: new Date(2017,0,1),
    //         id: "1654",
    //         votes: 1
    //     },
    //     {
    //         text: "Oui",
    //         author: "Vincent",
    //         date: new Date(2017,0,2),
    //         id: "156464",
    //         votes: -8
    //     }
    //     ]
    // }]
}

const name = "threadContent"
const reducer = handleActions({
    [APIActionTypes.FETCH_THREADS]: function(state: ThreadContent, action:any) {
            return state;
    },
    [APIActionTypes.FETCH_THREADS_SUCCESS]: function(state: ThreadContent, action: any) {

            let threadList = Object.assign([], action.payload);
            console.log(threadList)
            threadList.map((item) => {

                item.text = item.title;
                delete item.title;

                item.date = new Date();

                item.author = item.author.firstname + " " + item.author.lastname;

                item.answers = Object.assign([],item.threadMessages);
                delete item.threadMessages;

                item.answers.map((childItem) => {
                    childItem.date = new Date(childItem.createdAt);
                    delete childItem.createdAt;

                    childItem.author = childItem.author.firstname + " " + childItem.author.lastname;

                    childItem.votes = childItem.plusVoters.length - childItem.downVoters.length;
                });
            });


            return {...state, threadList: threadList}
    },
    [APIActionTypes.FETCH_THREADS_FAILURE]: function(state: ThreadContent, action: any) {
            return state
    },
}, initialState);

export default { [name]: reducer }