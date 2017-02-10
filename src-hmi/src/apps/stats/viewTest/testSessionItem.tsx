import { viewTestFactory } from '../../../utils'

import { View, Props } from '../../../views/sessions/sessionItemView'

viewTestFactory<Props>(View, {
    session: {
        profName: "Somin Maurel",
        sessionName: "Etre un saumon",
        profId: "lqjdsmf",
        live: true
    },
    choose: () => console.log("Select")
})