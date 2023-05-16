import { GlobalStore } from 'react-native-global-state-hooks';

const QuestionStore = new GlobalStore({question:'',domain: '', answer:'', isanswered: false, choosecard:'', choosecardname:'', choosecardpseuso:''});

export const useQuestionStore = QuestionStore.getHook();