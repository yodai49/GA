var eq = {
  freq:0,
  coefs:[]
}
$("#generateButton").on("click",function(){ //generatebutton is clicked
  eq.freq=Math.floor(Math.random()*10)+1;
  for(var i = 0;i < eq.freq;i++){
    eq.coefs[i] = Math.floor(Math.random()*10-5);
  }
  eq.coefs[eq.freq]=1;
  let resTxt="";
  for(var i = eq.freq;i >=0;i--){
    if (eq.coefs[i]) {
      if(i-eq.freq) {
        if (eq.coefs[i]>0) resTxt+="+";
        if (eq.coefs[i]<0) resTxt+="-";
      }  
      if (Math.abs(eq.coefs[i])!=1 || i == 1) resTxt+=Math.abs(eq.coefs[i]);
      if(i) resTxt+="x^"+i;
    }
  }
  document.getElementById("generatedEq").textContent=resTxt;
});

$("gaButton").on("click",function(){ //calbuttion is clicked

});