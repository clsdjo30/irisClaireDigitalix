import { GlobalStore } from 'react-native-global-state-hooks';

const QuestionStore = new GlobalStore({question:'',domain: '', answer:'', isanswered: false, choosecard:'', choosecardname:'', choosecardpseuso:'', choosecardnumber:''});

export const useQuestionStore = QuestionStore.getHook();