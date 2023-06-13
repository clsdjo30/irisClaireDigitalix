import { GlobalStore, isNumber } from "react-native-global-state-hooks";

const CrossQuestionStore = new GlobalStore({
  domain: "",
  question: "",
  choosecardnumber: 0 ,
  choosecardtwonumber: 0 ,
  choosecardthreenumber: 0 ,
  choosecardfournumber: 0 ,
  choosecardname: "",
  choosecardtwoname: "",
  choosecardthreename: "",
  choosecardfourname: "",
  choosecardpseudo: "",
  choosecardtwopseudo: "",
  choosecardthreepseudo: "",
  choosecardfourpseudo: "",
  answer: "",
  isanswered: false,
});

export const useCrossQuestionStore = CrossQuestionStore.getHook();
