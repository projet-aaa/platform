import { viewTestFactory } from '../../../utils'

import { View, Props } from '../../../views/profile/teacherProfileView'

viewTestFactory<Props>(View, {
    lastName: "Pantel",
    firstName: "Marc",
    email: "marc.pantel@enseeiht.fr",
    disciplines: ["TOB", "PIM", "PF"],
    groups: ["1INA", "1INC"]
})