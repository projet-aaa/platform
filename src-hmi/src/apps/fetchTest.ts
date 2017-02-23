import * as fetch from "isomorphic-fetch"

let id = "0818591d-f85b-11e6-9825-0242ac110004",
    token = "eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIiwiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiZWdpYnNvbiIsImV4cCI6MTQ4Nzg1NTgzNSwiaWF0IjoxNDg3ODUyMjM1fQ.ZQuYANe_l7AevSp_1wvOmN53SOm6ufd9J63mUppFXIGA-5jz3phF08ZhF5mLXA9TzFAbyPB3H4Gh9Sny5FpM6AKMTnl945iwA8efwunkN5waSOTDjyuTEn84YHuq3B-JL7TKVl_3Yg0VEa4oJBqfW61DoQNXnF87gF_Ohtdj_GrTJtdCyA5DM7WVnQABR30KdRN0S9ZiasT3z5S8wgg_gFu4T1A26OhMa_FZm8C5HvRvm3CHWltQqiBwWFB34j7v_eXIq7CEolNHHu_Duw5pFYDX7n7j-Z697P_1IWPvok-tV5JnzhEW2n1eiiRz0pSNTu0ItPup88L6q-suZna44a89eTIUzvJZk3mdvhea6nuLlLDG9VFqwKUQBD_CiezbhPbVJQ4YePoWGYyYX_eSNeyWvDfAI-51mb9YNWeel3LK4Y_akKNmz6OtTPxTX8v1SqLWIrzRaw3QvPixzh3VoNqEx0EX2SPvjH00rW5c4d2AdGs3D3BiHOaQ9CQr4JZzAfqlEWYs4QyCrU1BKaGU3syCb0-BMRGfMZ8km9NHDsAEuAODWtj__P3tbdbX9n7iV7WGqVKXXbglAPHXwR3JRQqCiD6PQVJiCnYccJhhhcL_xoXbUukfZMm9iij8FzuBEYixj77-MhCbFU55KpPd59MoqOdrXGs5dRL4FMfhrqw"

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
        res.body = JSON.stringify(obj)
    }
    return fetch(url, res).then(res => res.json())
}

fetcher('http://localhost/app_dev.php/api/sessions/' + id)
.then((res: any) => res.tests.map(test => {
    let list = test.split('/')
    return list[list.length - 1]
}))
.then(tests => {
    let resQuestions = [],
        choicesMissing = 0
    tests.forEach(test => {
        fetcher('http://localhost/app_dev.php/api/tests/' + test)
        .then((res: any) => res.questions.map(test => {
            let list = test.split('/')
            return list[list.length - 1]
        }))
        .then(questions => {
            questions.forEach(question => {
                fetcher('http://localhost/app_dev.php/api/questions/' + question)
                .then((question: any) => {
                    resQuestions.push(question)
                    question.choices = []

                    choicesMissing += question.mcqChoice.length
                    
                    question.mcqChoice.forEach(choice => {
                        let list = choice.split('/'),
                            choiceId = list[list.length - 1]

                        fetcher('http://localhost/app_dev.php/api/mcq_choices/' + choiceId)
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
                                        answer: question.choices && question.choices.findIndex(choice => choice.correct),
                                        explanations: question.choices && question.choices.map(choice => "NONE"),
                                        justification: question.explication
                                    }
                                })
                                //console.log(util.inspect(res, {showHidden: false, depth: null}))
                            }
                        })
                    })    
                })
            })
        })
    })
})
.catch(error => console.log(error))