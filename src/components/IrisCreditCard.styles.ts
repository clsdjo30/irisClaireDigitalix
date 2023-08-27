import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../theme";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = SCREEN_WIDTH * 1.5;

export const styles = StyleSheet.create({
  // Domain Container

  domainCard: {
    margin: 10,
    height: SCREEN_HEIGHT * 0.15,
    borderWidth: 1,
    borderColor: colors.palette.ivory,
    borderRadius: 10,
    backgroundColor: colors.palette.violetClair,
  },
  pressableCard: {
    flexDirection: "row",
    alignItems: "center",
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

