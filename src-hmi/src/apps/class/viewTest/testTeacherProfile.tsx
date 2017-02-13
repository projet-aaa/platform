import { viewTestFactory } from '../../../utils'

import { View, Props } from '../../../views/profile/teacherProfileView'

viewTestFactory<Props>(View, {
    lastName: "Pantel",
    firstName: "Marc",
    mail: "marc.pantel@enseeiht.fr",
    lessons: ["TOB", "PIM", "PF"],
    groups: ["1INA", "1INC"]
})