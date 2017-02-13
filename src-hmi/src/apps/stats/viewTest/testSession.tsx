import { viewTestFactory } from '../../../utils'

import { View, Props } from '../../../views/stats/statSessionView'

viewTestFactory<Props>(View, {
    sessions: [{
        profName: "Somin Maurel",
        sessionName: "Etre un saumon",
        profId: "lqjdsmf",
        live: true
    }, {
        profName: "Somon Maquereau",
        sessionName: "J'y suis presque",
        profId: "lqjdsmf",
        live: true
    }],
    choose: () => console.log("Select")
})