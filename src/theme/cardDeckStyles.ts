// styles.ts
import { StyleSheet } from "react-native";
import { colors } from "./color";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../utils/constants";

export const cardDeckStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: colors.palette.violetBg,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    width: SCREEN_WIDTH - 5,
    height: SCREEN_HEIGHT * 0.4,
    borderBottomLeftRadius: SCREEN_WIDTH * 0.1,
    borderBottomRightRadius: SCREEN_WIDTH * 0.1,
    backgroundColor: colors.palette.violet,
  },
  titleText: {
    width: "90%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    marginTop: 10,
    textAlign: "center",
    fontFamily: "MulishRegular",
    fontSize: 18,
    color: colors.palette.violetBg,
  },
  deckContainer: {
    height: "80%",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});
