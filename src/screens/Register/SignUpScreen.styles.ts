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
  logoContainer: {
    position: "absolute",
    top: 50,
    left: "30%",
    width: "100%",
  },
  logo: {
    width: 120,
    height: 120,
  },
  controls: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    width: "90%",
  },
  input: {
    backgroundColor: colors.palette.ivory,
    padding: 3,
    borderRadius: 6,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderLeftColor: colors.palette.darkgold,
    borderBottomColor: colors.palette.darkgold,
  },
  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#FFF8E7",
  },
  validationButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    width: "100%",
    backgroundColor: "#CBA135",
    marginTop: 10,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    paddingVertical: 5,
    fontFamily: "oswaldMedium",
    fontSize: 14,
    color: colors.palette.ivory,
  },
  policy: {
    width: 350,
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "mulishRegularItalic",
    fontSize: 11,
    color: colors.palette.violetBg,
    marginLeft: -6,
  },
  genderTitle: {
    width: 300,
    flexDirection: "row",
    marginLeft: 10,
  },
  icon: {
    marginLeft: 10,
    color: "#FFD700",
  },
  contentTitle: {
    fontFamily: "mulishRegular",
    fontSize: 18,
    color: colors.palette.violetBg,
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