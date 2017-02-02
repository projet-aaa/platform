import { viewTestFactory } from '../../utils'

import { View, Props } from '../../views/navigation/topBandView'

viewTestFactory<Props>(View, {
    appName: "AAA",
    userFullName: "Somin Maurel"
})

    //sessionBoxView
    //name: "CM1"
    //date: new Date(2017,0,1)

    //topBandView
    //appname: "AAA"
    //userFullName: "Somin Maurel"

    //pathBandView
    //path: ["TOB", "CM1"]
    //discipline: "TOB"

    //leftMenuView
    //disciplines: ["PIM", "PF", "TOB"]

    //faqAnswerView
    //text: "C'est par là ->",
    //author: "GibsS",
    //date: new Date(2017,0,1),
    //votes: -3