module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "@babel/preset-typescript"],
    plugins: [
      ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
      "@babel/plugin-transform-modules-commonjs", // Ajout du plugin
      [
        "babel-plugin-module-resolver",
        {
          alias: {
            "^react-native$": "react-native-web",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};

