import { viewTestFactory } from '../../../utils'

import { View, Props } from '../../../views/navigation/emptyContentView'

viewTestFactory<Props>(View, {
    appName: "AAA",
    userFullName: "Somin Maurel",
    path: ["TOB", "CM1"],
    disciplines: ["PIM", "PF", "TOB"],
    discipline: "TOB"
})