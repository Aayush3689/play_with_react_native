module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // module resolver for easy imports
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@app': './src/app',
          '@navigations': './src/navigations',
          '@assets': './src/assets',
          '@component': './src/component',
        },
      },
    ],
  ],
};
