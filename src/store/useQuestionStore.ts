import { GlobalStore, isNumber } from "react-native-global-state-hooks";

const QuestionStore = new GlobalStore({
  question: "",
  domain: "",
  answer: "",
  isanswered: false,
  choosecard: "",
  choosecardname: "",
  choosecardpseudo: "",
  choosecardnumber: 0 
});

export const useQuestionStore = QuestionStore.getHook();
