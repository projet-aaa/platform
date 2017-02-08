import { viewTestFactory } from '../../utils'

import { View, Props } from '../../views/dashboard/presentationView'

import { QuizType } from '../../models/class/class'

viewTestFactory<Props>(View, {
    quiz: {
        id: 0,
        type: QuizType.MCQ,
        title: "Une question de Jules",
        question: "Est ce que je ok?",
        choices: ["peut êtresfdkj vzliv szdjl hzdhj zDLJC DLJ ZD KHGAD HGKQDLG QD JBqskhjch alugkc jqdk,jackhgzeADNG HKQSDG KHCG QDK HGNQA C", "mr l'arbitre", "oui", "D"],
        explanations: ["peut-être que c'est fauxs jksdil sdliksd lish qdmsil ;hzELV H;SDLUJS DLISD LDUSJK KDZSJ SD<K ,HJSGDKJSD<G KJDWVH KS<DJ HSDL;VJH S<GLKV ", "aux chiottes l'arbitre", "NON !!!!!!!!!", "Voilà !"],
        answer: 3
    },
    stats: 1 // something not null
})