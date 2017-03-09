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
            threadList.map((item) => {

                item.text = item.title;
                delete item.title;

                item.date = new Date(item.createdAt);
                delete item.createdAt;

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

    [APIActionTypes.POST_NEW_THREAD_SUCCESS]: function(state: ThreadContent, action: any) {
            let createdThread = {
                id: action.payload.newThread.id,
                text: action.payload.newThread.text,
                author: action.payload.author,
                date: new Date(action.payload.newThread.createdAt),
                answers: []
            }

            let newList = [];
            state.threadList.map((item) => {
                newList.push(Object.assign({},item));   
            });
            newList.push(createdThread)

            return {...state, threadList: newList}
    },

    [APIActionTypes.POST_THREAD_ANSWER_SUCCESS]: function(state: ThreadContent, action: any) {
            //Find the index of the thread the answer was added to
            let threadIndex = 0;
            while (threadIndex < state.threadList.length) {
                if (state.threadList[threadIndex].id == action.payload.threadId) {
                    break;
                }
                threadIndex++;
            }

            let createdThreadMessage = {
                id: action.payload.newThreadMessage.id,
                text: action.payload.newThreadMessage.text,
                author: action.payload.author,
                date: new Date(action.payload.newThreadMessage.createdAt),
                votes: 0
            }

            let retThreads = [];
            for (var i=0; i< state.threadList.length; i++) {
                let retThreadAnswers = [];
                let currThread = Object.assign({}, state.threadList[i]);
                for (var j=0; j< state.threadList[i].answers.length; j++) {
                    let currAnswer = Object.assign({}, state.threadList[i].answers[j]);
                    retThreadAnswers.push(currAnswer)
                }
                if (state.threadList[i].id == action.payload.threadId) {
                    retThreadAnswers.push(createdThreadMessage);
                }
                currThread.answers = retThreadAnswers;
                retThreads.push(currThread);
            }
            return {...state, threadList: retThreads}
    }

}, initialState);

export default { [name]: reducer }