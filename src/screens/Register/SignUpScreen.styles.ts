import { StyleSheet} from "react-native";
import { colors } from "../../theme";
import { SCREEN_WIDTH } from "../../utils/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.palette.purple600,
    alignItems: "center",
    justifyContent: "center",
  },
  controls: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  input: {
    width: SCREEN_WIDTH / 0.3,
    height: 40,
    backgroundColor: colors.palette.violet,
    borderRadius: 16,
    paddingLeft: 20,
    fontFamily: "mulishExtraLight",
    fontSize: 18,
    color: colors.palette.white,
  },
  validationButton: {
    position: "relative",
    top: 150,
  },
  contentTitle: {
    fontFamily: "mulishSemiBold",
    fontSize: 20,
    color: colors.palette.violetClair,
    marginBottom: 20,
  },
  //ERROR
  errorContainer: {
    position: "absolute",
    top: 0,
    width: "80%",
    backgroundColor: colors.palette.orange,
    marginTop: 10,
    borderRadius: 16,
  },
  errorText: {
    textAlign: "center",
    fontFamily: "mulishBold",
    fontSize: 12,
    color: colors.palette.violetClair,
    paddingVertical: 6,
  },
});