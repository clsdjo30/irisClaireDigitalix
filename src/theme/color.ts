// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  //GRAYSCALE
  neutral100: "#FFF8E7",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
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
  purple600: "#3C3E8D",

  //SECONDARY Gold
  darkgold: "#CBA135",
  lightgold: "#FFE033",

  ivory: "#FFF8E7",
  //ACCENT Pink
  pink200: "#FF70BF",
  pink500: "#D50075",

  gold: "#cba135",
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
  text: palette.ivory,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral200,
  /**
   * The default border color.
   */
  border: palette.neutral400,
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
  error: palette.pink500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.purple500,
  /**
   * The icon color in `TabBar`.
   */

  gold: palette.gold,
  accent: palette.lightgold,
  darkgold: palette.darkgold,
  darkYellow: palette.darkyellow,
  blue: palette.blue,
};
