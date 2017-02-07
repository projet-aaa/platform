import { viewTestFactory } from '../../utils'

import { View, Props } from '../../views/dashboard/presentationView'

import { QuizType } from '../../models/quiz'

viewTestFactory<Props>(View, {
    quiz: {
        id: 0,
        type: QuizType.MCQ,
        question: "Est ce que je ok?",
        choices: ["peut êtresfdkj vzliv szdjl hzdhj zDLJC DLJ ZD KHGAD HGKQDLG QD JBqskhjch alugkc jqdk,jackhgzeADNG HKQSDG KHCG QDK HGNQA C", "mr l'arbitre", "oui", "D"],
        explanations: ["peut-être que c'est fauxs jksdil sdliksd lish qdmsil ;hzELV H;SDLUJS DLISD LDUSJK KDZSJ SD<K ,HJSGDKJSD<G KJDWVH KS<DJ HSDL;VJH S<GLKV ", "aux chiottes l'arbitre", "NON !!!!!!!!!", "Voilà !"],
        answer: 3,
        choice: -1,
        isValidated: false
    },
    stats: 1 // something not null
})