var eq = {
  freq:0,
  coefs:[]
}
var creatures=[];
$("#generateButton").on("click",function(){ //generatebutton is clicked
  eq.freq=Math.floor(Math.random()*10)+1;
  for(var i = 0;i < eq.freq;i++){ //-5 <= coef < 5
    eq.coefs[i] = Math.floor(Math.random()*10-5);
  }
  eq.coefs[eq.freq]=1;
  let resTxt="";
  for(var i = eq.freq;i >=0;i--){ //generate equation text
    if (eq.coefs[i]) {
      if(i-eq.freq) {
        if (eq.coefs[i]>0) resTxt+="+";
        if (eq.coefs[i]<0) resTxt+="-";
      }  
      if (Math.abs(eq.coefs[i])!=1 || i == 1) resTxt+=Math.abs(eq.coefs[i]);
      if(i) resTxt+="x^"+i;
    }
  }
  document.getElementById("generatedEq").textContent=resTxt; //show equation text
});

$("gaButton").on("click",function(){ //calbuttion is clicked
  const genMax=100; //maximum number of generations
  const creMax=100; //maximum number of creatures in a generation
  for(var i = 0;i < genMax;i++){
    creatures[i]=[];
    for(var j = 0;j < creMax;j++){
      creatures[i][j]={ //initialize creatures
        genes:0,
        val:0,
        ancestors:""
      }
    }
  }
});