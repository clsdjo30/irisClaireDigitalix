// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
violet: "#2F2A5A",
violetClair: "#dcdaee",
violetBg: "#eeedf6",
orange: "#FF7648",
golden: "#bc9531",

  
  //GRAYSCALE
  neutral100: "#e4e4e7",
  neutral200: "#eeeeec",
  neutral300: "#A9A99E",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#2072af",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  // GHOST WHITE
  white: "#F8F8FF",

  //BLACK
  black: "#000000",
  outterSpace: '#414A4C',
  raisin: '#242124',


  //PRIMARY Purple
  purple100: "#C6C6E7",
  purple200: "#B7B7E1",
  purple300: "#4F5075",
  purple400: "#4c669f",
  purple500: "#7E80C8",
  purple600: "#2F2A5A",
  

  //SECONDARY Gold
  darkgold: "#CBA135",
  lightgold: "#FFE033",

  ivory: "#EEEDF6",
  //ACCENT Pink
  pink200: "#FF70BF",
  pink500: "#D50075",

  gold: "#BC9531",
  darkyellow: "#eedc82",
  blue: "#2072af",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const;

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.violet,

  subText: palette.golden,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.violetBg,
  /**
   * The default border color.
   */
  border: palette.violet,
  /**
   * The main tinting color.
   */
  tint: palette.purple100,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.violetBg,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.orange,
  /**
   * The icon color in `TabBar`.
   */

  gold: palette.gold,
  accent: palette.lightgold,
  darkgold: palette.darkgold,
  darkYellow: palette.darkyellow,
  blue: palette.blue,
};
