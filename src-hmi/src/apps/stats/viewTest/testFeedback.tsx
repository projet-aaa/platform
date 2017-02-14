import { viewTestFactory } from '../../../utils'

import { View, Props } from '../../../views/stats/statFeedbackView'

viewTestFactory<Props>(View, {
    panic: [10, 20, 20, 20, 30, 20],
    tooSlow: [5, 10, 20, 30, 10, 2],
    tooFast: [ 2, 2, 2, 2, 2, 3],
    date: [0, 5, 10, 15, 20, 25],
    comments: [
        {
            date: new Date(),
            comment: "J'ai pas compris",
            commenter: "Jules"
        },
        {
            date: new Date(2017, 1, 25, 24, 3),
            comment: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.',
            commenter: "Jules"
        }
    ],

    goToQuiz: () => console.log("got to quiz"),
    goToSessions: () => console.log("go to sessions")
})