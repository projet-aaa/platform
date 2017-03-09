export const SocketInMsg = {
    // STUDENT
    /* ANSWER
     * questionId: string
     * choices: any (depends on the type of question)
     */
    ANSWER: "SERVER/ANSWER",
    /* SIGNAL STATE
     * state: string
     */
    SIGNAL_STATE: "SERVER/SIGNAL_STATE",

    // TEACHER
    /* START QUIZ
     * quizId: string
     */
    START_QUIZ: "SERVER/LAUNCH_QUIZ",
    SHOW_FEEDBACK: "SERVER/SHOW_FEEDBACK",
    STOP_QUIZ: "SERVER/FINISH_QUIZ"
}

export const SocketOutMsg = {
    // See classRoom.ts to find out what is sent
    STUDENT_CLASS_JOINED: "STUDENT/CLASS/CLASS_JOINED",
    TEACHER_CLASS_JOINED: "TEACHER/CLASS/CLASS_JOINED",

    STUDENT_START_QUIZ: "STUDENT/CLASS/START_QUIZ",
    TEACHER_START_QUIZ: "TEACHER/CLASS/START_QUIZ",

    STUDENT_STOP_QUIZ: "STUDENT/CLASS/STOP_QUIZ",
    TEACHER_STOP_QUIZ: "TEACHER/CLASS/STOP_QUIZ",

    STUDENT_SHOW_FEEDBACK: "STUDENT/CLASS/SHOW_FEEDBACK",
    TEACHER_SHOW_FEEDBACK: "TEACHER/CLASS/SHOW_FEEDBACK",

    ANSWER: "TEACHER/CLASS/ANSWER",
    SIGNAL_STATE: "TEACHER/CLASS/SIGNAL_STATE",

    TEACHER_STUDENT_COUNT: "TEACHER/CLASS/STUDENT_COUNT",
    STUDENT_STUDENT_COUNT: "STUDENT/CLASS/STUDENT_COUNT",

    /* STUDENT_DISCONNECT
     * state: string (to update on the teacher side)
     * choice: string (to update on the teacher side)
     */
    STUDENT_DISCONNECT: "TEACHER/CLASS/DISCONNECT"
}

export const QuizInstanceState = {
    OFF: 'OFF',
    HEADING: 'HEADING',
    FEEDBACK: 'FEEDBACK'
}