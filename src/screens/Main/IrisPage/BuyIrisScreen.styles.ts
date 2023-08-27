import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../theme";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: colors.background,
  },
  header: {
    position: "absolute",
    top: 0,
    width: SCREEN_WIDTH - 5,
    height: SCREEN_HEIGHT * 0.3,
    borderBottomLeftRadius: SCREEN_WIDTH * 0.1,
    borderBottomRightRadius: SCREEN_WIDTH * 0.1,
    backgroundColor: colors.palette.violet,
  },
  // Explain Credit
  titleCredit: {
    width: "100%",
    height: "25%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  explainCredit: {
    width: "90%",
    height: "30%",
    flexDirection: "column",
    alignItems: "center",
  },
  contentTitle: {
    fontFamily: "oswaldBold",
    fontSize: 34,
    color: colors.palette.ivory,
  },
  textCredit: {
    fontFamily: "mulishMedium",
    fontSize: 22,
    color: colors.palette.ivory,
    paddingVertical: 8,
  },
  
  //FLATLIST
  flatList: {
    position: "relative",
    height: SCREEN_HEIGHT * 0.93,
  },
  contentContainer: {
    paddingTop  : 10,
  },
});