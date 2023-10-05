import { StyleSheet} from "react-native";
import { colors } from "../../theme";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.palette.stepViolet,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  controls: {
    flex: 1,
    alignItems: "center",
    width: "90%",
    marginTop: SCREEN_HEIGHT / 6,
  },
  input: {
    width: SCREEN_WIDTH / 0.3,
    height: 50,
    backgroundColor: colors.palette.stepViolet,
    borderRadius: 16,
    paddingLeft: 20,
    fontFamily: "mulishLight",
    fontSize: 18,
    color: colors.palette.white,
  },
  validationButton: {},
  contentTitle: {
    fontFamily: "mulishSemiBold",
    fontSize: 20,
    color: colors.palette.violetClair,
    marginBottom: 20,
  },
  iconBox: {
    width: 50,
    height: 50,
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
  //Provider
  providerContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: SCREEN_HEIGHT / 15,
  },
  providerText: {
    fontFamily: "mulishRegular",
    fontSize: 14,
    color: colors.palette.violet,
  },
  providerButtonContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  providerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: SCREEN_WIDTH / 1.2,
    height: SCREEN_HEIGHT / 18,
    borderRadius: 16,
    backgroundColor: colors.palette.white,
  },
  headerUnderlineTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SCREEN_WIDTH / 1.2,
    paddingVertical: SCREEN_HEIGHT / 100,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.palette.white,
    marginBottom: SCREEN_HEIGHT / 20,
  },
  headerText: {
    fontFamily: "mulishSemiBold",
    fontSize: 14,
    color: colors.palette.white,
  },
  headerUnderlineBottom: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.005,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.palette.stepViolet,
    width: SCREEN_WIDTH / 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: SCREEN_HEIGHT / 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: colors.palette.stepViolet,
    justifyContent: "center",
    alignItems: "center",
    color: colors.palette.white,
  },
  checkboxWrapper: {
    color: colors.palette.white,
  },
  
});