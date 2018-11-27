const plugins = [
  [
    "import",
    {
      "libraryName": "iview",
      "libraryDirectory": "src/components"
    }
  ]
];
module.exports = {
  presets: [
    [
      '@vue/app',
      {'useBuiltIns': 'entry'} // polyfill
    ]
  ],
  plugins: plugins
};
