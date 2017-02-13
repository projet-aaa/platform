import { viewTestFactory } from '../../../utils'

import { View, Props } from '../../../views/profile/studentProfileView'

viewTestFactory<Props>(View, {
    lastName: "Maurel",
    firstName: "Somin",
    mail: "somin.maurel@etu.enseeiht.fr",
    group: "3INB",
    lessons: ["TOB", "PIM", "PF"]
})