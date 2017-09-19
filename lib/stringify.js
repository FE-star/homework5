module.exports = function (ast, indent) {
  // deafult to 2
  // let str="";
  indent = indent || 2
  // //如果有多个选择器和样式
  // while(ast.stylesheet.rules&&ast.stylesheet.rules.length){
  //     let rule = ast.stylesheet.rules.reverse().pop();
  //     str+=rule.selectors;
  //     str+=" {/n";
  //     for(let i=0;i<indent;i++){
  //         str+=" ";
  //     }
  //     //如果有多个属性和值
  //     while(rule.declarations&&rule.declarations.length){
  //         let declaration=rule.declarations.reverse().pop();
  //         str+=declaration.property;
  //         str+=": ";
  //         str+=declaration.value;
  //         str+=";/n";
  //         for(let i=0;i<indent;i++){
  //             str+=" ";
  //         }
  //         console.log(str);
  //     }
  //     console.log(str);
  //     str+="}/n"
  // }
  // return str
//'a {\n  color: red;\n  font-size: 15px;\n  }
  let str = "";
  function stringify(){
      while(ast.stylesheet.rules&&ast.stylesheet.rules.length){
          let rule = ast.stylesheet.rules.reverse().pop();
          setRules(rule)//拆分rules(选择器和样式)
      }
    //   console.log(str);
      return str
  }
  function setRules(rule){
      if(rule.type=="rule"){
          setSelector(rule);
          addStart();
          changeRow();
          while(rule.declarations&&rule.declarations.length){
              let declaration=rule.declarations.reverse().pop();
              setDeclarations(declaration)
          }
          addEnd()
      }else{
          setType(rule)
      }

  }
  function setType(rule){
      str+="@";
      str+=rule.type;
      str+=" ";
      str+=rule[rule.type];
      addSplitor();
      changeRow();
      changeRow();
  }
  function setSelector(rule){
      str+=rule.selectors;
  }
  function setDeclarations(declaration){
      setIndent()
      str+=declaration.property;
      str+=": ";
      str+=declaration.value;
      addSplitor()
      changeRow()
  }
  function addStart(){
      str+=" {"
  }
  function addSplitor(){
      str+=";"
  }
  function setIndent(){
      for(let i=0;i<indent;i++){
          console.log(i);
          str+="\ ";
      }
  }
  function changeRow(){
      str+="\n";
  }
  function addEnd(){
      str+="}"
  }
  return stringify()
}
