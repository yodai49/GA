var eq = {
  freq:0,
  coefs:[]
}
var creatures=[];
const genMax=100; //maximum number of generations
const creMax=100; //maximum number of creatures in a generation
const param=1;//evaluation parameter    IS NOT USED
const eliteRatio=0.1;

function evalCreatures(gen){
  for(var i = 0; i < creMax;i++){
    let tempVal=0;
    for(var j = 0;j <= eq.freq;j++){
      tempVal+=Math.pow(creatures[gen][i].genes[0],j)*eq.coefs[j];
    }
    creatures[gen][i].val=Math.abs(param/tempVal);
  }
  creatures[gen].sort((a,b)=>b.val-a.val);
}
function printRes(gen){
  let tempResTxt="";
  for(var i = 0;i < creMax;i++){
    tempResTxt+=Number(creatures[gen][i].genes[0]).toFixed(2) + 
      " eq_val:" + Number(1/creatures[gen][i].val).toFixed(2) 
      // + " ancs:" + creatures[gen][i].ancestors
       + "\n";
  }
  document.getElementById("result").textContent=tempResTxt;
}

function procCreatures(nextGen){
  let ancs=[0,0];
  let eliteNum=Math.floor(creMax*eliteRatio);
  for(var i  = 0;i < creMax-eliteNum;i++){
    for(var j = 0;j < 2;j++){
      let diceMax=0;
      for(var k = 0;k < creMax;k++){
        if(!j){
          diceMax+=creatures[nextGen-1][k].val;
        } else{
          if (ancs[0] != k)  diceMax+=creatures[nextGen-1][k].val/Math.abs(creatures[nextGen-1][ancs[0]].genes[0]-creatures[nextGen-1][k].val);
        }
      }    
      let dice=diceMax*Math.random();
      let tempDice=0;
      for(var k = 0;k < creMax;k++){ //randomly choose
        if(!j){
          tempDice+=creatures[nextGen-1][k].val;
        } else{
          if(ancs[0] != i)  tempDice+=creatures[nextGen-1][k].val/Math.abs(creatures[nextGen-1][ancs[0]].genes[0]-creatures[nextGen-1][k].val);
        }
        //tempDice+=creatures[nextGen-1][k].val;
        if(dice<tempDice) {
          ancs[j]=k;
          break;
        }
      }
    }
    creatures[nextGen][i].genes[0] = (creatures[nextGen-1][ancs[0]].genes[0]+creatures[nextGen-1][ancs[1]].genes[0])/2;
    creatures[nextGen][i].ancestors=creatures[nextGen-1][i].ancestors+"G" + nextGen + "("+ancs[0] + "," + ancs[1] + ") ";
  }
  for(var i = 0;i < eliteNum;i++){
    creatures[nextGen][genMax-eliteNum+i]=creatures[nextGen-1][i];
  }
}
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
      if (Math.abs(eq.coefs[i])!=1 || i == 0) resTxt+=Math.abs(eq.coefs[i]);
      if(i) resTxt+="x^"+i;
    }
  }
  document.getElementById("generatedEq").textContent=resTxt; //show equation text
});

$("#gaButton").on("click",function(){ //calbuttion is clicked
  for(var i = 0;i < genMax;i++){
    creatures[i]=[];
    for(var j = 0;j < creMax;j++){
      creatures[i][j]={ //initialize creatures
        genes:[0],
        val:0,
        ancestors:""
      }
    }
  }
  for(var i = 0;i < creMax;i++){ //randamly set into 0 generation
    creatures[0][i].genes[0]=Math.floor(Math.random()*100-50);
  }
  for(var i = 0; i < genMax-1;i++){
    evalCreatures(i);
    procCreatures(i+1);
  }
  evalCreatures(genMax-1);
  printRes(genMax-1);
});

$("#checkButton").on("click",function(){
  let checkGen=window.prompt("Which generations do you want to check? (0-" + (genMax-1)+")",0);
  printRes(checkGen);
});