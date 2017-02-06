import { IRoom, SocketInfo } from './iroom'
import { 
    ClassInMsg, ClassOutMsg ,
    AnswerAction, CommentAction, SignalStateAction, 
    FeedbackQuizAction, LaunchQuizAction, FinishQuizAction
} from '../comm/actionTypes'

import { 
    AttentionEventType, QuizRoomChoices, ClassEvent, ClassState, QuizInstanceState
} from '../../../src-hmi/src/models/class'

import { RoomType } from '../../../src-hmi/src/models/server'

export class ClassRoom extends IRoom {

    type: RoomType = RoomType.CLASS

    state: ClassState

    trainers: SocketInfo[]
    learners: SocketInfo[]

    receive(socket: SocketInfo, type: string, msg) {
        switch(type) {
            case ClassInMsg.ANSWER: {
                let m = <AnswerAction>msg,
                    quiz = this.state.currentQuiz
               
                if(quiz.quizId == m.quizId) {
                    if(!quiz.choices[socket.id]) {
                        quiz.choices[socket.id] = m.choice
                        for(let t of this.trainers) {
                            this.server.send(
                                t, 
                                ClassOutMsg.ANSWER, 
                                <AnswerAction>{ 
                                    id: socket.id,
                                    quizId: m.quizId,
                                    choice: m.choice
                                }
                            )
                        }
                    }
                }
                break
            }
            case ClassInMsg.COMMENT: {
                let m = <CommentAction>msg,
                    comment = {
                    time: Date.now(),
                    text: m.text
                }

                this.state.timeline.push(comment)

                for(let t of this.trainers) {
                    this.server.send(
                        t,
                        ClassOutMsg.COMMENT,
                        <CommentAction>{
                            id: socket.id,
                            time: comment.time,
                            text: comment.text
                        }
                    )
                }
                break
            }
            case ClassInMsg.FEEDBACK_QUIZ: {
                let m = <FeedbackQuizAction>msg

                if(this.state.quizState == QuizInstanceState.HEADING) {
                    this.state.quizState = QuizInstanceState.FEEDBACK

                    for(let s of this.sockets) {
                        this.server.send(
                            s,
                            ClassOutMsg.FEEDBACK_QUIZ,
                            { id: socket.id }
                        )
                    }
                }
                break
            }
            case ClassInMsg.FINISH_QUIZ: {
                let m = <FinishQuizAction>msg

                if(this.state.quizState != QuizInstanceState.OFF) {
                    this.state.quizState = QuizInstanceState.OFF

                    for(let s of this.sockets) {
                        this.server.send(
                            s,
                            ClassOutMsg.FINISH_QUIZ,
                            { id: socket.id }
                        )
                    }
                }
                break
            }
            case ClassInMsg.LAUNCH_QUIZ: {
                let m = <LaunchQuizAction>msg,
                    quiz = this.state.currentQuiz,
                    state = this.state.quizState

                if((state == QuizInstanceState.FEEDBACK || state == QuizInstanceState.HEADING) && quiz.quizId != m.quizId) {
                    this.state.quizRan.push(quiz)
                    this.state.quizState = null
                }

                if(quiz.quizId != m.quizId) {
                    this.state.currentQuiz = {
                        quizId: m.quizId,
                        choices: []
                    }

                    for(let s of this.sockets) {
                        this.server.send(
                            s,
                            ClassOutMsg.FINISH_QUIZ,
                            { id: socket.id }
                        )

                        this.server.send(
                            s,
                            ClassOutMsg.LAUNCH_QUIZ,
                            <LaunchQuizAction>{
                                id: socket.id,
                                quizId: m.quizId
                            }
                        )
                    }
                }

                break
            }
            case ClassInMsg.SIGNAL_STATE: {
                let m = <SignalStateAction>msg,
                    signal: ClassEvent = {
                        time: Date.now(),
                        state: m.state
                    }

                this.state.timeline.push(signal)

                for(let t of this.trainers) {
                    this.server.send(
                        t,
                        ClassOutMsg.COMMENT,
                        <SignalStateAction>{
                            id: socket.id,
                            time: signal.time,
                            state: signal.state
                        }
                    )
                }
                break
            }
        }
    }

    socketEnter(socket: SocketInfo) {
        this.server.send(socket, ClassOutMsg.STATE, this.state)
    }
    socketLeave(socket: SocketInfo) {

    }
}