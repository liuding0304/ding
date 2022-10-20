class MyPlugin {
  constructor() {

  }
  apply(compiler) {
    compiler.hooks.break.tap('MyPlugin')
  }
}