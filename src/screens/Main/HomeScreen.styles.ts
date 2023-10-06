import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../theme";

const SCREEN_WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    position: "absolute",
    top: 0,
    width: SCREEN_WIDTH - 5,
    height: SCREEN_WIDTH * 0.6,
    borderBottomLeftRadius: SCREEN_WIDTH * 0.1,
    borderBottomRightRadius: SCREEN_WIDTH * 0.1,
    backgroundColor: colors.palette.violet,
  },
  headerTitle: {
    position: "absolute",
    top: 0,
    color: colors.palette.golden,
    fontSize: 30,
    fontFamily: "mulishBold",
    textTransform: "capitalize",
    textAlign: "center",
    marginTop: 20,
  },

  // Domain Container
  domainsContainer: {
    position: "absolute",
    alignItems: "center",
  },
  domainCard: {
    width: "90%",
    height: "35%",
    marginBottom: 35,
    flexDirection: "row",
    borderRadius: 15,
    elevation: 5,
  },
  innerContainer: {
    borderRadius: 15,
    flexDirection: "row",
    width: "100%",
    height: "100%",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  // taille image domain Card
  icon: {
    width: "30%",
    height: "70%",
    marginLeft: 10,
  },
  //container text domain card
  direction: {
    width: "70%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  domainText: {
    width: "90%",
    fontFamily: "mulishBold",
    fontSize: 20,
    color: colors.palette.violet,
    textAlign: "center",
    marginBottom: 10,
  },
  domainText2: {
    width: "90%",
    fontFamily: "mulishBold",
    fontSize: 20,
    color: colors.palette.golden,
    textAlign: "center",
    marginBottom: 10,
  },
  domainTextExplain: {
    width: "90%",
    fontFamily: "mulishLight",
    fontSize: 12,
    color: colors.palette.violet,
    textAlign: "center",
  },
  domainTextGoldExplain: {
    width: "90%",
    fontFamily: "mulishLight",
    fontSize: 12,
    color: colors.palette.violet,
    textAlign: "center",
  },
  domainGoldText: {
    width: "90%",
    fontFamily: "mulishRegular",
    fontSize: 20,
    color: colors.palette.violet,
    textAlign: "center",
    marginTop: 20,
  },
  iconImage: {
    width: 30,
    height: 30,
  },

  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: colors.palette.orange,
  },
  iconContainerCheck: {
    position: "absolute",
    left: 0,
    top: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: "green",
  },
  dayDrawAlert: {
    position: "absolute",
    left: 105,
    top: 38,
  },
  tendanceContainer: {
    position: "absolute",
    alignItems: "center",
    top: -40,
    width: "90%",
    height: "35%",
  },
  tendanceTextContainer: {
    width: "90%",
    height: "100%",
    marginTop: 30,
    justifyContent: "center",
  },
  tendanceText: {
    color: colors.palette.violetBg,
    fontSize: 16,
    fontFamily: "mulishRegular",
    textAlign: "center",
  },
  displayTextTendance: {
    color: colors.palette.violetBg,
    fontSize: 16,
    fontFamily: "mulishRegular",
    textAlign: "center",
  },
  cardContainer: {
    width: 60,
    height: 110,
    borderRadius: 5,
  },
  daydrawCard: {
    width: 60,
    height: 110,
    borderRadius: 5,
  },
  // Modal de connexion
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: SCREEN_WIDTH - 50,
    alignItems: "center",
    padding: 15,
    margin: 30,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  modalTitle: {
    fontFamily: "mulishExtraBold",
    textAlign: "center",
    fontSize: 20,
    color: colors.palette.violet,
  },
  modalsubTitle: {
    fontFamily: "mulishRegular",
    textAlign: "center",
    fontSize: 16,
    color: colors.palette.orange,
    marginTop: 20,
    marginBottom: 10,
  },
  modalText: {
    fontFamily: "mulishRegular",
    textAlign: "center",
    fontSize: 16,
    color: colors.palette.violet,
  
  },
});
