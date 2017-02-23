import { IRoom } from '../main/iroom'
import { SocketInfo, RoomInfo, RoomType } from '../models/rooms'

import { SocketOutMsg, SocketInMsg, QuizInstanceState } from '../models/class'

export class ClassRoom extends IRoom {

    type = RoomType.CLASS

    studentSockets: SocketInfo[]
    teacherSockets: SocketInfo[]

    // SESSION CACHED INFO
    sessionId: string = "session0"
    quiz: any = {
        "0": {
            id: "0",
            type: "MCQ",
            title: "La première question",

            question: "Quel est la réelle identité de Simon?",

            choices: ["Saumin", "Saumin", "Saumin"],
            choiceIds: ["0", "1", "2"],

            answer: 0,
            explanations: ["N'est ce pas évident?", "N'est ce pas évident?", "N'est ce pas évident?"],
            justification: "N'est ce pas évident?"
        },
        "1": {
            id: "1",
            type: "MCQ",
            title: "La seconde question",

            question: "2 + 2?",

            choices: ["1", "2", "4"],
            choiceIds: ["0", "1", "2"],

            answer: 2,
            explanations: ["faux", "faux", "2 + 2 = 1 + 1 + 1 + 1 = 4 * 1 = 4"],
            justification: "2 + 2 = 1 + 1 + 1 + 1 = 4 * 1 = 4"
        }
    }

    quizHistory: string[] = []

    currQuizId: string = null
    currQuizState: string = QuizInstanceState.OFF
    
    get maxscore(): number { return this.quizHistory.length }
    average: number = 0
    correctAnswer: number
    totalAnswer: number
    currentStat: any
    idToAnswer: any // student id -> choice

    panic: number = 0
    tooSlow: number = 0
    tooFast: number = 0
    idToState: any // student id -> attention state

    get studentPop(): number { return this.studentSockets.length }
    get teacherPop(): number { return this.teacherSockets.length }

    constructor(server, id) {
        super(server, id)
        this.studentSockets = []
        this.teacherSockets = []
        this.idToState = {}
    }

    receiveSocketMsg(socket: SocketInfo, type: string, msg) {
        switch(type) {
            // TEACHER
            case SocketInMsg.START_QUIZ: {
                let quiz = this.quiz[msg.quizId]

                if(this.currQuizId) {
                    this.quizHistory.push(this.currQuizId)
                    this.average += this.correctAnswer / this.totalAnswer
                }
                this.correctAnswer = 0
                this.totalAnswer = 0
                this.currQuizId = msg.quizId
                this.currQuizState = QuizInstanceState.HEADING
                this.currentStat = {}
                this.idToAnswer = {}

                for(let socket of this.studentSockets) {
                    this.server.send(socket, SocketOutMsg.STUDENT_START_QUIZ, { quiz })
                }
                for(let socket of this.teacherSockets) {
                    this.server.send(socket, SocketOutMsg.TEACHER_START_QUIZ, { quiz })
                }
                break
            }
            case SocketInMsg.SHOW_FEEDBACK: {
                if(QuizInstanceState.HEADING) {
                    this.currQuizState = QuizInstanceState.FEEDBACK
                }

                for(let socket of this.studentSockets) {
                    this.server.send(socket, SocketOutMsg.STUDENT_SHOW_FEEDBACK, { })
                }
                for(let socket of this.teacherSockets) {
                    this.server.send(socket, SocketOutMsg.TEACHER_SHOW_FEEDBACK, { })
                }
                break
            }
            case SocketInMsg.STOP_QUIZ: {
                if(this.currQuizId) {
                    this.quizHistory.push(this.currQuizId)
                    this.average += this.correctAnswer / this.totalAnswer
                    this.currQuizState = QuizInstanceState.OFF
                    this.currQuizId = null

                    for(let socket of this.studentSockets) {
                        this.server.send(socket, SocketOutMsg.STUDENT_STOP_QUIZ, { quizId: msg.quizId })
                    }
                    for(let socket of this.teacherSockets) {
                        this.server.send(socket, SocketOutMsg.TEACHER_STOP_QUIZ, { quizId: msg.quizId })
                    }
                }
                break
            }
            // STUDENT
            case SocketInMsg.ANSWER: {
                if(this.currQuizId && msg.questionId == this.currQuizId) {
                    if(this.quiz[this.currQuizId].answer == msg.choice) {
                        this.correctAnswer++
                    }
                    this.totalAnswer++
                    this.idToAnswer[socket.id] = msg.choice
                    if(this.currentStat[msg.choice]) {
                        this.currentStat[msg.choice]++
                    } else {
                        this.currentStat[msg.choice] = 1
                    }

                    for(let socket of this.teacherSockets) {
                        this.server.send(socket, SocketOutMsg.ANSWER, msg)
                    }
                }
                break
            }
            case SocketInMsg.SIGNAL_STATE: {
                let oldState = this.idToState[socket.id]

                this.panic += (msg.state == "PANIC" ? 1 : 0) - (oldState == "PANIC" ? 1 : 0)
                this.tooFast += (msg.state == "TOO_FAST" ? 1 : 0) - (oldState == "TOO_FAST" ? 1 : 0)
                this.tooSlow += (msg.state == "TOO_SLOW" ? 1 : 0) - (oldState == "TOO_SLOW" ? 1 : 0)

                this.idToState[socket.id] = msg.state

                for(let socket of this.teacherSockets) {
                    this.server.send(socket, SocketOutMsg.SIGNAL_STATE, msg)
                }
                break
            }
        }
    }

    receiveRedisMsg(type: string, msg) {
        
    }

    socketEnter(socket: SocketInfo) {
        if(socket.isTeacher) {
            this.server.send(socket, SocketOutMsg.TEACHER_CLASS_JOINED, {
                quiz: this.quiz,
                sessionId: this.sessionId,

                currQuizId: this.currQuizId,
                currQuizState: this.currQuizState,
                currQuizStat: this.currentStat,

                quizHistory: this.quizHistory,

                studentPop: this.studentSockets.length,

                panic: this.panic,
                tooSlow: this.tooSlow,
                tooFast: this.tooFast
            })
            this.teacherSockets.push(socket)
        } else {
            this.studentSockets.push(socket)
            let quiz = this.quizHistory.map((hist) => {
                return this.quiz[hist]
            })
            if(this.currQuizState != QuizInstanceState.OFF) {
                quiz.push(this.quiz[this.currQuizId])
            }
            this.server.send(socket, SocketOutMsg.STUDENT_CLASS_JOINED, {
                quiz,
                quizHistory: this.quizHistory,
                sessionId: this.sessionId,

                currQuizId: this.currQuizId,
                currQuizState: this.currQuizState,

                studentPop: this.studentSockets.length,
                highscore: null,
                maxscore: this.maxscore,
                average: this.average
            })

            for(let socket of this.studentSockets) {
                this.server.send(socket, SocketOutMsg.STUDENT_STUDENT_COUNT, {
                    studentPop: this.studentPop
                })
            }
            for(let socket of this.teacherSockets) {
                this.server.send(socket, SocketOutMsg.TEACHER_STUDENT_COUNT, {
                    studentPop: this.studentPop
                })
            }
        }
    }
    socketLeave(socket: SocketInfo) {
        if(socket.isTeacher) {
            console.log("[teacher disconnect]")
            this.teacherSockets.splice(this.teacherSockets.indexOf(socket), 1)
        } else {
            console.log("[student disconnect]")
            this.studentSockets.splice(this.studentSockets.indexOf(socket), 1)

            for(let socket of this.teacherSockets) {
                this.server.send(socket, SocketOutMsg.STUDENT_DISCONNECT, {
                    choice: this.idToAnswer ? this.idToAnswer[socket.id] : null,
                    state: this.idToState[socket.id]
                })
            }

            if(this.idToAnswer) {
                this.idToAnswer[socket.id] = null
            }
            this.idToState[socket.id] = null

            for(let socket of this.studentSockets) {
                this.server.send(socket, SocketOutMsg.STUDENT_STUDENT_COUNT, {
                    studentPop: this.studentPop
                })
            }
            for(let socket of this.teacherSockets) {
                this.server.send(socket, SocketOutMsg.TEACHER_STUDENT_COUNT, {
                    studentPop: this.studentPop
                })
            }
        }
    }
}