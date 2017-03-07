import { IRoom } from '../main/iroom'
import { SocketInfo, RoomInfo, RoomType } from '../models/rooms'

import { SocketOutMsg, SocketInMsg, QuizInstanceState } from '../models/class'
import { log } from '../models/consts'

/* CLASS ROOM
 * The class room in which students can answer to quiz and signal their attention state
 */
export class ClassRoom extends IRoom {

    type = RoomType.CLASS

    studentSockets: SocketInfo[]
    teacherSockets: SocketInfo[]

    // SESSION CACHED INFO
    quiz: any

    quizHistory: string[] = []

    currQuizId: string = null
    currQuizState: string = QuizInstanceState.OFF
    
    get maxscore(): number { return this.quizHistory.length }
    average: number

    correctAnswer: number // correct answer count to the current question
    totalAnswer: number // total answer count
    currentStat: any // choice -> count
    idToAnswer: any // student id -> choice

    panic: number
    tooSlow: number
    tooFast: number
    idToState: any // student id -> attention state

    timeout

    get studentPop(): number { return this.studentSockets.length }
    get teacherPop(): number { return this.teacherSockets.length }

    constructor(server, id) {
        super(server, id)
        this.studentSockets = []
        this.teacherSockets = []
        this.idToState = {}
        this.average = 0

        this.panic = 0
        this.tooSlow = 0
        this.tooFast = 0
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

                    for(let socket of this.studentSockets) {
                        this.server.send(socket, SocketOutMsg.STUDENT_SHOW_FEEDBACK, { })
                    }
                    for(let socket of this.teacherSockets) {
                        this.server.send(socket, SocketOutMsg.TEACHER_SHOW_FEEDBACK, { })
                    }
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
                    let quiz = this.quiz[this.currQuizId]

                    if(quiz.type == "MMCQ") {
                        let contained = true

                        for(let answer of msg.choice) {
                            if(quiz.answer.indexOf(answer) < 0) {
                                contained = false
                                break
                            }
                        }

                        if(contained) { this.correctAnswer++ }

                        this.totalAnswer += msg.choice.length

                        for(let choice of msg.choice) {
                            if(this.currentStat[choice]) {
                                this.currentStat[choice]++
                            } else {
                                this.currentStat[choice] = 1
                            }
                        }
                    } else if(quiz.answer == msg.choice) {
                        this.correctAnswer++
                        this.totalAnswer++

                        if(this.currentStat[msg.choice]) {
                            this.currentStat[msg.choice]++
                        } else {
                            this.currentStat[msg.choice] = 1
                        }
                    }

                    this.idToAnswer[socket.id] = msg.choice

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

    socketEnter(socket: SocketInfo) {
        if(socket.isTeacher) {
            if(socket.username == this.teacher) {
                clearTimeout(this.timeout)
            }
            this.server.send(socket, SocketOutMsg.TEACHER_CLASS_JOINED, {
                quiz: this.quiz,
                sessionId: this.sessionId,
                iriSessionId: this.iriSessionId,

                currQuizId: this.currQuizId,
                currQuizState: this.currQuizState,
                currQuizStat: this.currentStat,

                quizHistory: this.quizHistory,

                studentPop: this.studentSockets.length,

                panic: this.panic,
                tooSlow: this.tooSlow,
                tooFast: this.tooFast,

                sent: this.idToAnswer && this.idToAnswer[socket.id] != null
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
                iriSessionId: this.iriSessionId,

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
            if(log) console.log("[teacher disconnect]", socket)
            this.teacherSockets.splice(this.teacherSockets.indexOf(socket), 1)

            // if their is no more teachers in the room, close the room after a time out (cleared if a teacher joins)
            if(this.teacherSockets.filter(s => this.teacher == s.username).length == 0) {
                this.timeout = setTimeout(() => {
                    this.server.closeRoom(this.id)
                }, 120 * 1000)
            }
        } else {
            if(log) console.log("[student disconnect]", socket)
            this.studentSockets.splice(this.studentSockets.indexOf(socket), 1)

            let choice = (this.idToAnswer ? this.idToAnswer[socket.id] : null),
                state = this.idToState[socket.id]
            for(let socket of this.teacherSockets) {
                this.server.send(socket, SocketOutMsg.STUDENT_DISCONNECT, {
                    choice, state
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

    receiveRedisMsg(type: string, msg) { }
}