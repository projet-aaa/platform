import * as fetch from 'isomorphic-fetch'

import { apiRootURL, token } from '../models/consts'

export function fetcher(url, method?, obj?) {
    let res: any = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
    if(method) {
        res.method = method
    }
    if(obj) {
        res.headers['Content-type'] = 'application/ld+json'
        res.body = JSON.stringify(obj)
    }
    
    return fetch(apiRootURL + url, res).then(res => res.json())
}


export function openClassRoom(sessionName: string, callback) {
    return dispatch => {
        let sessionId
        fetcher('/sessions?name=' + sessionName)
        .then((res: any) => res["hydra:member"][0])
        .then(res => {
            sessionId = res.id
            return res.tests.map(test => {
            let list = test.split('/')
            return list[list.length - 1]
        })})
        .then(tests => {
            let resQuestions = [],
                choicesMissing = 0
            tests.forEach(test => {
                fetcher('/tests/' + test)
                .then((res: any) => res.questions.map(test => {
                    let list = test.split('/')
                    return list[list.length - 1]
                }))
                .then(questions => {
                    questions.forEach(question => {
                        fetcher('/questions/' + question)
                        .then((question: any) => {
                            resQuestions.push(question)
                            question.choices = []

                            choicesMissing += question.mcqChoices.length
                            
                            question.mcqChoices.forEach(choice => {
                                let list = choice.split('/'),
                                    choiceId = list[list.length - 1]

                                fetcher('/mcq_choices/' + choiceId)
                                .then((choice: any) => {
                                    question.choices.push(choice)
                                    choicesMissing--
                                    if(!choicesMissing) {
                                        let res = resQuestions.map(question => {
                                            return {
                                                id: question.id,
                                                type: question.typeAnswer == "multiple" || question.typeAnswer == "unique" 
                                                    ? "MCQ" : "TEXT",
                                                title: question.text,
                                                question: question.text,
                                                choices: question.choices && question.choices.map(choice => choice.text),
                                                choiceIds: question.choices && question.choices.map(choice => choice.id),
                                                answer: question.typeAnswer == "multiple" || question.typeAnswer == "unique" 
                                                    ? question.choices && question.choices.findIndex(choice => choice.correct)
                                                    : question.textAnswers && question.textAnswers.length && question.textAnswers[0],
                                                explanations: question.choices && question.choices.map(choice => ""),
                                                justification: question.explication
                                            }
                                        })
                                        callback(res)
                                    }
                                })
                            })    
                        })
                    })
                })
            })
        })
        .catch(error => console.log(error))
    }
}