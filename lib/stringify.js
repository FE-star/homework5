module.exports = function (ast, indent) {
  // deafult to 2
  indent = indent || 2
  // TODO
  //取出规则 
  var rules = ast.stylesheet.rules;
  var rule = "";
  //遍历规则
  rules.forEach((e)=>{
      //拿到selector
      //组装规则  
      if(e.type == 'rule'){
          rule += makeRule(e.selectors, e.declarations, e.position); 
      }else if(e.type == 'charset'){
          rule += "@"+e.type+" "+e.charset+";\r\n";
          rule +="\r\n";
      } 
  }); 
     
  function makeRule(selectors, declarations, position){
     var space = "";
     for(var i=0;i<indent;i++){
        space +=" ";  
     } 
     var str = selectors+" {\r\n";
     declarations.forEach((e)=>{
          str += space+e.property+": "+e.value+";\r\n";
     }); 
     str+="}";
     return str; 
  }

  return rule;
}