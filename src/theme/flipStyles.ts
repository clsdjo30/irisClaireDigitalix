// styles.ts
import { StyleSheet } from "react-native";
import { colors } from "./color";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../utils/constants";

export const cardImageStyle = StyleSheet.create({
  cardImage: {
    width: SCREEN_WIDTH / 6,
    height: SCREEN_HEIGHT / 6.5,
    margin: 5,
    justifyContent: "center",
    zIndex: 0,
    borderRadius: 10,
    shadowColor: colors.palette.violetClair,
  },
  image: {
    width: SCREEN_WIDTH / 6,
    height: SCREEN_HEIGHT / 6.5,
    resizeMode: "cover",
    borderRadius: 6,

  },
});
