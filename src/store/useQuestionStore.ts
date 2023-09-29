import { GlobalStore } from "react-native-global-state-hooks";

const QuestionStore = new GlobalStore({
  question: "",
  domain: "",
  answer: "",
  createdAt: 0,
  isanswered: false,
  choosecard: "",
  choosecardname: "",
  choosecardpseudo: "",
  choosecardnumber: 0 
});

export const useQuestionStore = QuestionStore.getHook();
