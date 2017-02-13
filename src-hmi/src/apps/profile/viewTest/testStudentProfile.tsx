import { viewTestFactory } from '../../../utils'

import { View, Props } from '../../../views/profile/studentProfileView'

viewTestFactory<Props>(View, {
    lastName: "Maurel",
    firstName: "Somin",
    email: "somin.maurel@etu.enseeiht.fr",
    group: "3INB",
    disciplines: ["TOB", "PIM", "PF"]
})