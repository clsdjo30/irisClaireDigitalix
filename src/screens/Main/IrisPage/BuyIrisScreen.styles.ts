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
  // Explain Credit
  titleCredit: {
    width: "100%",
    height: "30%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 100,
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
    marginBottom: 10,
  },
  textCredit: {
    fontFamily: "mulishMedium",
    fontSize: 22,
    color: colors.palette.ivory,
    paddingVertical: 5,
  },
  // Domain Container
  domainsContainer: {
    position: "relative",
    top: -40,
    width: "100%",
    height: "80%",
    flexDirection: "column",
    alignItems: "center",
  },
  domainCard: {
    width: "90%",
    height: "15%",
    alignItems: "center",
    borderWidth: 1,
    marginBottom: 20,
    borderColor: colors.palette.ivory,
    borderRadius: 10,
    backgroundColor: colors.palette.violetClair,
  },
  innerContainer: {
    borderRadius: 15,
    flexDirection: "row",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  icon: {
    width: SCREEN_WIDTH * 0.17,
    height: SCREEN_WIDTH * 0.17,
  },
  priceBlock: {
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
  },
  domainTextBlock: {
    width: "80%",

    marginLeft: 40,
  },
  price: {
    fontFamily: "mulishExtraBold",
    fontSize: 34,
    color: colors.palette.violet,
    marginTop: 20,
  },
  priceText: {
    fontFamily: "mulishBold",
    fontSize: 20,
    color: colors.palette.violet,
  },
  priceSubText: {
    fontFamily: "mulishBold",
    fontSize: 20,
    color: colors.palette.violet,
  },
  // Promo Block
  promoBlock: {
    position: "absolute",
    width: 90,
    top: 0,
    left: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bestOffer: {
    width: 50,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.palette.orange,
  },
  pricePromo: {
    fontFamily: "mulishLight",
    fontSize: 10,
    textDecorationLine: "line-through",
  },
  bestOfferText: {
    fontFamily: "mulishMedium",
    fontSize: 10,
    color: colors.palette.violetBg,
  },
  bestDeal: {
    position: "absolute",
    top: -12,
    left: 120,
    backgroundColor: colors.palette.golden,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
  },
  bestDealText: {
    fontFamily: "mulishMedium",
    fontSize: 14,
    color: colors.palette.violetBg,
  },
});