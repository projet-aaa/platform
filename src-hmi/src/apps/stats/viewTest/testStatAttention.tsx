import { viewTestFactory } from '../../../utils'

import { View, Props } from '../../../views/stats/feedback/statAttentionView'

viewTestFactory<Props>(View, {
    panic: [10, 20, 20, 20, 30, 20],
    tooSlow: [5, 10, 20, 30, 10, 2],
    tooFast: [ 2, 2, 2, 2, 2, 3],
    date: [0, 5, 10, 15, 20, 25],

    goToQuiz: () => console.log("got to quiz"),
    goToSessions: () => console.log("go to sessions")
})