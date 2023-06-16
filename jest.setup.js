const { getDefaultConfig } = require('metro-config');
const Constants = require('expo-constants');

module.exports = async () => {
  const defaultConfig = await getDefaultConfig();
  return {
    ...defaultConfig,
    preset: 'jest-expo',
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native-community|@expo|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*|@babel/core)'
    ],
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-expo/src/mocks/Image.js',
      '\\.(ttf|woff|woff2|otf)$': 'jest-expo/src/mocks/Font.js',
    },
    setupFilesAfterEnv: [
      '@testing-library/jest-native/extend-expect',
      './jest.setup.js',
    ],
    resolver: {
      ...defaultConfig.resolver,
      assetExts: defaultConfig.resolver.assetExts.filter(
        ext => ext !== 'svg'
      ),
      sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
    },
    globals: {
      ...defaultConfig.globals,
      Constants: Constants,
    },
  };
};
