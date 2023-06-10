import { GlobalStore, isNumber } from "react-native-global-state-hooks";

const CrossQuestionStore = new GlobalStore({
  domain: "",
  question: "",
  choosecard: "",
  choosecardname: "",
  choosecardpseuso: "",
  choosecardnumber: 0 ,
  choosecardtwo: "",
  choosecardtwoname: "",
  choosecardtwopseuso: "",
  choosecardtwonumber: 0 ,
  choosecardthree: "",
  choosecardthreename: "",
  choosecardthreepseuso: "",
  choosecardthreenumber: 0 ,
  choosecardfour: "",
  choosecardtfour: "",
  choosecardfourpseuso: "",
  choosecardtfournumber: 0 ,
  answer: "",
  isanswered: false,
});

export const useCrossQuestionStore = CrossQuestionStore.getHook();
