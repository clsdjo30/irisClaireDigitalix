import { GlobalStore, isNumber } from "react-native-global-state-hooks";

const CrossQuestionStore = new GlobalStore({
  domain: "",
  question: "",
  createdAt: 0,
  choosecardnumber: 0 ,
  choosecardtwonumber: 0 ,
  choosecardthreenumber: 0 ,
  choosecardfournumber: 0 ,
  choosecardfivenumber: 0 ,
  choosecardname: "",
  choosecardtwoname: "",
  choosecardthreename: "",
  choosecardfourname: "",
  choosecardfivename: "",
  choosecardpseudo: "",
  choosecardtwopseudo: "",
  choosecardthreepseudo: "",
  choosecardfourpseudo: "",
  choosecardfivepseudo: "",
  answer: "",
  isanswered: false,
});

export const useCrossQuestionStore = CrossQuestionStore.getHook();
