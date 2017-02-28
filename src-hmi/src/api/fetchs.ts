import { listFetcher, fetcher, findAllIndex } from "../utils"

import { Test, Quiz, QuizType } from "../models/class/class"
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
                    title: question.text,
                    question: question.text,
                    type,
                    choices: question.mcqChoices && question.mcqChoices.map(choice => choice.text),
                    choiceIds: question.mcqChoices && question.mcqChoices.map(choice => choice.id),
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