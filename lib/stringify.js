module.exports = function (ast, indent) {
  // deafult to 2
  indent = indent || 2
  // TODO
  //取出规则 
  var rules = ast.stylesheet.rules;
  var rule = [];
  //遍历规则
  rules.forEach((e)=>{
      //拿到selector
      //组装规则  
      if(e.type == 'rule'){
          rule.push(makeRule(e.selectors, e.declarations, e.position)); 
      }else if(e.type == 'charset'){
          rule.push("@"+e.type+" "+e.charset);
      } 
  }); 
     
  function makeRule(selectors, declarations, position){
     //notice 数组跟字符串运算的时候会自动转为 字符串 
     var obj = {}; 
     
     var space = "";
     
     for(var i=0;i<indent;i++){
        space +=" ";  
     } 
     
     declarations.forEach((e)=>{
          obj[space+e.property] = e.value;  
     }); 
     
     return selectors + JSON.stringify(obj); 
  }

  return rule;
}