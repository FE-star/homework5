module.exports = function (ast, indent) {
  // deafult to 2
  indent = indent || 2
  // TODO
  let spaces ='';
  for(let k=0;k<indent;k++){
 		spaces+=' ';
  }
  let formatStyle ='';
  let rules = ast.stylesheet.rules;
  for(let i=0;i<rules.length;i++){
  	let str = '';
  	if(rules[i].type=='rule'){
  		  str = rules[i].selectors[0] +' {\n'
		  	for(let j=0;j<rules[i].declarations.length;j++){
		  		 let temp = rules[i].declarations[j];
		  		 str+= spaces+temp.property+': '+temp.value+';\n'
		  	}
		  	str+='}'
  	}else{
  		str = '@'+rules[i].type+' '+rules[i][rules[i].type]+';\n\n'
  	}
  	formatStyle +=str;
  }

  return formatStyle;
}