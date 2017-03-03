import { listFetcher, fetcher, findAllIndex, parseAPIDate } from "../utils"

import { Test, Quiz, QuizType, AttentionStateType } from "../models/class/class"
import { Discipline } from '../models/discipline'
import { Session } from '../models/session'

export function fetchTest(testId: string, success?: (obj) => void, failure?: (obj) => void) {
    fetcher('/tests/' + testId + '/tree', 'GET')
    .then((res: any) => {
        let test: Test = {
            id: res.id,
            title: res.title,
            quizs: res.questions.map(question => {
                let type = question.typeAnswer == "unique" ? QuizType.MCQ :
                          question.typeAnswer == "multiple" ? QuizType.MMCQ 
                          : QuizType.TEXT
                          
                let q: Quiz = {
                    id: question.id,
                    iriId: question["@id"],
                    title: question.text,
                    question: question.text,
                    type,
                    choices: question.mcqChoices && question.mcqChoices.map(choice => choice.text),
                    choiceIds: question.mcqChoices && question.mcqChoices.map(choice => choice["@id"]),
                    explanations: question.mcqChoices && question.mcqChoices.map(choice => ""),
                    justification: question.explication,
                    answer: type == "MMCQ" ? findAllIndex(question.mcqChoices, (choice: any) => choice.correct) :
                            type == "MCQ" ? question.mcqChoices && question.mcqChoices.findIndex(choice => choice.correct) :
                            question.textAnswers && question.textAnswers.length && question.textAnswers[0],
                }
                return q
            }),
        }
        success(test)
    })
    .catch(error => {
        failure(error)
    })
}

export function fetchSessionTests(sessionId: string, success?: (quizs: Quiz[]) => void, failure?) {
    fetcher('/sessions/' + sessionId, 'GET')
    .then((res: any) => {
        let todo = res.tests.length,
            resList = []

        res.tests.forEach(t => {
            let split = t.split('/')
            let id = split[split.length-1]

            fetchTest(id, obj => {
                    todo--
                    resList.push(obj)
                    if(!todo) {
                        success(resList)
                    }
                }, 
                obj => failure(obj)
            )
        })
    })
    .catch(error => failure(error))
}

export function fetchSessionQuiz(sessionId: string, success?: (quizs: Quiz[]) => void, failure?) {
    fetcher('/sessions/' + sessionId, 'GET')
    .then((res: any) => {
        let todo = res.tests.length,
            resList = []

        res.tests.forEach(t => {
            let split = t.split('/')
            let id = split[split.length-1]

            fetchTest(id, obj => {
                    todo--
                    resList.push.apply(resList, obj.quizs)
                    if(!todo) {
                        success(resList)
                    }
                }, 
                obj => failure(obj)
            )
        })
    })
    .catch(error => failure(error))
}

export function fetchSessionByName(sessionName: string, success?, failure?) {
    fetcher('/sessions?name=' + sessionName)
    .then((res: any) => {
        success(res)
    })
    .catch(error => failure(error))
}

export function fetchDisciplineSessions(disciplineName: string, disciplineId: string, success?, failure?) {
    fetchDisciplinesSessions([disciplineName], [disciplineId], success, failure)
}

export function fetchDisciplinesSessions(disciplineNames: string[], disciplineIds: string[], success?, failure?) {
    fetcher('/sessions?' + disciplineIds.map(d => 'discipline[]=' + d).join('&'), 'GET')
    .then((res: any) => {
        success(res["hydra:member"].map(s => {
            let split = s.discipline.split('/')
            let id = split[split.length - 1]
            
            return {
                id: s.id,
                sessionName: s.name,
                teacherName: null,
                sessionType: s.type,
                date: null,
                discipline: disciplineNames[disciplineIds.indexOf(id)],
                live: false
            }
        }))
    })
    .catch(error => failure)
}

export function fetchSessionStats(sessionId: string, success?, failure?) {
    let alerts = null,
        comments = null,
        quiz = null,
        quizChoices = {},
        quizChoicesDone = false,
        tryEnd = () => {
            if(alerts && comments && quiz && quizChoicesDone) {
                success({ alerts, comments, quiz, quizChoices })
            }
        }

    fetcher('/alerts?session=' + sessionId, 'GET')
    .then((res: any) => res['hydra:member'])
    .then(res => {
        return res.map(a => {
            return {
                type: a.alertType == "tooSlow" ? AttentionStateType.TOO_SLOW :
                    a.alertType == "tooFast" ? AttentionStateType.TOO_FAST :
                    a.alertType == "good" ? AttentionStateType.OK :
                    AttentionStateType.PANIC,
                date: parseAPIDate(a.createdAt),
                author: a.author
            }
        })
    })
    .then(res => res.sort((e1, e2) => e1.date >= e2.date))
    .then(res => {
        let states = {},
            tooSlow = 0,
            tooFast = 0,
            panic = 0,
            tooSlowCurve = [],
            tooFastCurve = [],
            panicCurve = [],
            dates = [],
            oldState,
            newState

        res.forEach(a => {
            if(a.date) {
                oldState = states[a.author]
                newState = a.type
                tooSlow += newState == AttentionStateType.TOO_SLOW ? 1 : 0 
                    - ((oldState && oldState == AttentionStateType.TOO_SLOW) ? 1 : 0)
                tooFast += newState == AttentionStateType.TOO_FAST ? 1 : 0 
                    - ((oldState && oldState == AttentionStateType.TOO_FAST) ? 1 : 0)
                panic += newState == AttentionStateType.PANIC ? 1 : 0 
                    - ((oldState && oldState == AttentionStateType.PANIC) ? 1 : 0)
                states[a.author] = newState    

                tooSlowCurve.push(tooSlow)
                tooFastCurve.push(tooFast)
                panicCurve.push(panic)
                dates.push(a.date)
            }
        })

        alerts = ({
            tooSlowCurve,
            tooFastCurve,
            panicCurve,
            dates
        })
        console.log("alerts", alerts)
        tryEnd()
    })
    .catch(error => { if(failure) {
        failure(error)
    } else {
        console.log(error)
    }})

    fetcher('/feedbacks?session=' + sessionId, 'GET')
    .then((res: any) => res['hydra:member'])
    .then(res => res.map(c => {
        return {
            date: parseAPIDate(c.createdAt),
            comment: c.text,
            commenter: "anonyme"
        }  
    }))
    .then(res => {
        comments = res
        console.log("comments", comments)
        tryEnd()
    })
    .catch(error => { if(failure) {
        failure(error)
    } else {
        console.log(error)
    }})

    fetchSessionQuiz(sessionId, 
        obj => {
            quiz = obj
            // obj.forEach(q => {
            //     quiz[q.id] = q
            // })
            tryEnd()
        }
    )

    fetcher('/mcq_answers?question.test.session=' + sessionId)
    .then((res: any) => res['hydra:member'])
    .then(res => {
        let answerCount = res.length

        res.forEach(answer => {
            let splitChoice = answer.mcqChoice.split('/'),
                choiceId = splitChoice[splitChoice.length - 1],
                splitQuiz = answer.question.split('/'),
                quizId = splitQuiz[splitQuiz.length - 1]

            fetcher('/mcq_choices/' + choiceId)
            .then((res: any) => {
                if(!quizChoices[quizId]) {
                    quizChoices[quizId] = {}
                }
                
                if(quizChoices[quizId][res.text]) {
                    quizChoices[quizId][res.text] += 1
                } else {
                    quizChoices[quizId][res.text] = 1
                }

                answerCount--
                if(!answerCount) {
                    quizChoicesDone = true
                    tryEnd()
                }
            })
        })
    })
}