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
    
    maxscore: number = 0
    average: number = 0

    get studentPop(): number { return this.studentSockets.length }
    get teacherPop(): number { return this.teacherSockets.length }

    constructor(server, id) {
        super(server, id)
        this.studentSockets = []
        this.teacherSockets = []
    }

    receiveSocketMsg(socket: SocketInfo, type: string, msg) {
        switch(type) {
            // TEACHER
            case SocketInMsg.START_QUIZ: {
                let quiz = this.quiz[msg.quizId]
                for(let socket of this.studentSockets) {
                    this.server.send(socket, SocketOutMsg.STUDENT_START_QUIZ, { quiz })
                }
                for(let socket of this.teacherSockets) {
                    this.server.send(socket, SocketOutMsg.TEACHER_START_QUIZ, { quiz })
                }
                break
            }
            case SocketInMsg.SHOW_FEEDBACK: {
                for(let socket of this.studentSockets) {
                    this.server.send(socket, SocketOutMsg.STUDENT_SHOW_FEEDBACK, { })
                }
                for(let socket of this.teacherSockets) {
                    this.server.send(socket, SocketOutMsg.TEACHER_SHOW_FEEDBACK, { })
                }
                break
            }
            case SocketInMsg.STOP_QUIZ: {
                for(let socket of this.studentSockets) {
                    this.server.send(socket, SocketOutMsg.STUDENT_STOP_QUIZ, { quizId: msg.quizId })
                }
                for(let socket of this.teacherSockets) {
                    this.server.send(socket, SocketOutMsg.TEACHER_STOP_QUIZ, { quizId: msg.quizId })
                }
                break
            }
            // STUDENT
            case SocketInMsg.ANSWER: {
                for(let socket of this.teacherSockets) {
                    this.server.send(socket, SocketOutMsg.ANSWER, msg)
                }
                break
            }
            case SocketInMsg.SIGNAL_STATE: {
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
                quiz: this.quiz
            })
            this.teacherSockets.push(socket)
        } else {
            this.studentSockets.push(socket)
            this.server.send(socket, SocketOutMsg.STUDENT_CLASS_JOINED, {
                quiz: this.quizHistory.map((hist) => {
                    return this.quiz[hist]
                }),
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
                this.server.send(socket, SocketOutMsg.STUDENT_STUDENT_COUNT, {
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

            for(let socket of this.studentSockets) {
                this.server.send(socket, SocketOutMsg.STUDENT_STUDENT_COUNT, {
                    studentPop: this.studentPop
                })
            }
            for(let socket of this.teacherSockets) {
                this.server.send(socket, SocketOutMsg.STUDENT_STUDENT_COUNT, {
                    studentPop: this.studentPop
                })
            }
        }
    }
}