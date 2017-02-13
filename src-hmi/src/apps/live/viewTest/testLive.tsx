import { viewTestFactory } from '../../../utils'

import { View, Props } from '../../../views/live/liveSessionView'

import { Session } from '../../../models/session'

viewTestFactory<Props>(View, {
    sessions: [
        {
            profId: "0",
            profName: "Somin Maurel",
            sessionName: "Comment être un Saumon",
            live: false
        },
        {
            profId: "1",
            profName: "Dupont",
            sessionName: "Comment être un Saumon",
            live: true
        },
        {
            profId: "2",
            profName: "Dupond",
            sessionName: "Comment être un Saumon",
            live: true
        }
    ],
    choose: (id) => console.log(id)
})