class MyPlugins  {
  constructor() {
    // console.log('This is my plugins two')
  }

  apply(compiler){
    console.log(compiler,'hello')
    compiler.hooks.emit.tap('myPlugins',(compilation,callback)=>{
      //  console.log(compilation,'--compilation')
    })

  }
}
module.exports = MyPlugins;
