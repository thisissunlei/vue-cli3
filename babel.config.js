const plugins = [];
module.exports = {
  presets: [
    [
      '@vue/app',
      {'useBuiltIns': 'entry'} // polyfill
    ]
  ],
  plugins: plugins
};
