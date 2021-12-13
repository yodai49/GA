function caldis(r1,g1,b1,r2,g2,b2,mode){
  var dis;
  if (mode == 1){
      dis = (r1-r2) * (r1-r2) + (g1-g2)*(g1-g2)+(b1-b2)*(b1-b2);
      dis = Math.sqrt(dis);
      return dis;
  } else if(mode == 2){
      dis = 0;
      dis += Math.abs(r1-r2);
      dis += Math.abs(g1-g2);
      dis += Math.abs(b1-b2);
      return dis;
  }
}
function sigdash(x){
  var a = 0.6;
  return (a*Math.exp(-a*x) / ((1+Math.exp(-a*x))*(1+Math.exp(-a*x))));
}
function sig(x){
  var a  = 0.6;
  return (1/(1+Math.exp(-a*x)));
}

function col(colnum){
  if (colnum == 0){
    return "白";
  } else if(colnum == 1){
    return "灰色";
  } else if(colnum == 2){
    return "黒";
  } else if(colnum == 3){
    return "赤";
  } else if(colnum == 4){
    return "黄赤";
  } else if(colnum == 5){
    return "黄"
  } else if(colnum == 6){
    return "黄緑";
  } else if(colnum == 7){
    return "緑";
  } else if(colnum == 8){
    return "青緑";
  } else if(colnum == 9){
    return "青";
  } else if(colnum == 10){
    return "青紫";
  } else if(colnum == 11){
    return "紫";
  } else if(colnum == 12){
    return "赤紫";
  } else{
    return "???";
  }
}
function neural(techh) {
  //ニューラルネットワークの更新処理

  var r2=Number(document.getElementById("learnr").value);
  var g2=Number(document.getElementById("learng").value);
  var b2=Number(document.getElementById("learnb").value);

  var w11=localStorage.getItem("w11");
  var w12=localStorage.getItem("w12");
  var w13=localStorage.getItem("w13");
  var w21=localStorage.getItem("w21");
  var w22=localStorage.getItem("w22");
  var w23=localStorage.getItem("w23");
  var w31=localStorage.getItem("w31");
  var w32=localStorage.getItem("w32");
  var w33=localStorage.getItem("w33");
  var ww = [];
  for (var i = 0; i < 3;i++) {
    ww[i] = [];
    for (var j = 0; j < 13;j++){
      ww[i][j] = localStorage.getItem("ww" + (i+1) + (j+1));
    }
  }
  
  var rho = 3;

  var out11 = sig(r2/10);
  var out12 = sig(g2/10);
  var out13 = sig(b2/10);
  var input21 = w11*out11+w21*out12+w31*out13;
  var input22 = w12*out11+w22*out12+w32*out13;
  var input23 = w13*out11+w23*out12+w33*out13;
  var out21 = sig(input21);
  var out22 = sig(input22);
  var out23 = sig(input23);
  var output=[];
  var outputsig=[];
  var tempmax=-99;
  var tempcol=-1;
  for (var i = 0;i < 13;i++){
    output[i] = ww[0][i] * out21 +  ww[1][i] * out22 +  ww[2][i] * out23;
    outputsig[i] = sig(output[i]);
    if (tempmax < output[i]){
      tempmax=output[i];
      tempcol = i;
    }
  }
  var txt="";
  for(var i = 0; i < 13;i++) txt+=output[i] + " ";
  window.alert(txt);

  var tech=[];
  for(var i = 0;i < 13;i++){
    tech[i] = 0;
    if (i == techh) tech[i] = 1;
  }
  var ips=[];
  for(var i = 0;i < 13;i++) ips[i] = outputsig[i] - tech[i];
  for(var i = 0; i < 3;i++){
    for(var j = 0; j < 13;j++){
      ww[i][j] = ww[i][j] - rho * out21*sigdash(output[i])*ips[i];
    }
  }

  var sum=0;
  for (var i = 0; i < 13;i++) sum+= ww[0][i]*ips[i];
  w11=w11-rho*out11*sigdash(input21)*sum;
  var sum=0;
  for (var i = 0; i < 13;i++) sum+= ww[1][i]*ips[i];
  w12=w12-rho*out11*sigdash(input22)*sum;
  var sum=0;
  for (var i = 0; i < 13;i++) sum+= ww[2][i]*ips[i];
  w13=w13-rho*out11*sigdash(input23)*sum;
  var sum=0;
  for (var i = 0; i < 13;i++) sum+= ww[0][i]*ips[i];
  w21=w21-rho*out12*sigdash(input21)*sum;
  var sum=0;
  for (var i = 0; i < 13;i++) sum+= ww[1][i]*ips[i];
  w22=w22-rho*out12*sigdash(input22)*sum;
  var sum=0;
  for (var i = 0; i < 13;i++) sum+= ww[2][i]*ips[i];
  w23=w23-rho*out12*sigdash(input23)*sum;  
  var sum=0;
  for (var i = 0; i < 13;i++) sum+= ww[0][i]*ips[i];
  w31=w31-rho*out13*sigdash(input21)*sum;
  var sum=0;
  for (var i = 0; i < 13;i++) sum+= ww[1][i]*ips[i];
  w32=w32-rho*out13*sigdash(input22)*sum;
  var sum=0;
  for (var i = 0; i < 13;i++) sum+= ww[2][i]*ips[i];
  w33=w33-rho*out13*sigdash(input23)*sum;

  localStorage.setItem("w11",w11);
  localStorage.setItem("w12",w12);
  localStorage.setItem("w13",w13);
  localStorage.setItem("w21",w21);
  localStorage.setItem("w22",w22);
  localStorage.setItem("w23",w23);
  localStorage.setItem("w31",w31);
  localStorage.setItem("w32",w32);
  localStorage.setItem("w33",w33);
  for(var i = 0; i < 3;i++){
    for (var j = 0; j < 13 ;j++){
      localStorage.setItem("ww" + (i+1)+(j+1),ww[i][j]);
    }
  }

  var n = localStorage.getItem("n");
  document.getElementById("inputanswer").textContent=n + "\n";
  for(var i = 0;i < n;i++){
    for (var j = 0;j < 4;j++){
      document.getElementById("inputanswer").textContent+=localStorage.getItem("data" + (i+1) + "," + (j+1)) +" ";
    }
    document.getElementById("inputanswer").textContent+="\n";
  }
  for(var i = 0;i < 3;i++){
    for (var j = 0;j < 3;j++){
      document.getElementById("inputanswer").textContent+=localStorage.getItem("w" + (i+1)+(j+1)) + " ";
    }
    document.getElementById("inputanswer").textContent+= "\n";
  }
  for(var i = 0;i < 3;i++){
    for (var j = 0;j < 13;j++){
      document.getElementById("inputanswer").textContent+=localStorage.getItem("ww" + (i+1)+(j+1)) + " ";
    }
    document.getElementById("inputanswer").textContent+= "\n";
  }
  

}
function learn(num){
  neural(num);
  var n = Number(localStorage.getItem("n"));
  n++;
  localStorage.setItem("n",n);
  localStorage.setItem("data"+n + ",1",Number(document.getElementById("learnr").value));
  localStorage.setItem("data"+n + ",2",Number(document.getElementById("learng").value));
  localStorage.setItem("data"+n + ",3",Number(document.getElementById("learnb").value));
  localStorage.setItem("data"+n + ",4",num);

  var r = Math.round(Math.random() * 255);
  var g = Math.round(Math.random() * 255);
  var b = Math.round(Math.random() * 255);
  document.getElementById("learnr").value = r;
  document.getElementById("learng").value = g;
  document.getElementById("learnb").value = b;
  document.getElementById("learnsample").style.backgroundColor="rgba(" + r + "," + g + "," + b + ",1)";
};

$("#calbutton").on("click",function(){
  var txt= String(document.getElementById("inputanswer").value);
  var txtslc = txt.split(/\n/);
  var n=Number(txtslc[0]);
  var txtslc2=[];
  var data=[];
  var w=[];
  var ww=[];
  var r2=Number(document.getElementById("inputR").value);
  var g2=Number(document.getElementById("inputG").value);
  var b2=Number(document.getElementById("inputB").value);
  for (var i = 0;i < n;i++){
    txtslc2[i+1] = String(txtslc[i+1]).split(/\s+/);
    data[i+1]=[];
    for(var j = 0;j < 4;j++){
      data[i+1][j+1] = txtslc2[i+1][j];
    }
  }
  for(var i = 0;i < 3;i++){
    txtslc[i+n+1] = String(txtslc[i+n+1]).split(/\s+/);
    w[i+1] = [];
    for (var j = 0; j < 3;j++){
      w[i+1][j+1] = txtslc[i+n+1][j];
    }
  }
  txtslc[n+4]=String(txtslc[n+4]).split(/\s+/);
  for(var i= 0;i < 3;i++){
    ww[i+1] = txtslc[n+4][i];
  }
  //ニューラルネットワーク
  var w11=localStorage.getItem("w11");
  var w12=localStorage.getItem("w12");
  var w13=localStorage.getItem("w13");
  var w21=localStorage.getItem("w21");
  var w22=localStorage.getItem("w22");
  var w23=localStorage.getItem("w23");
  var w31=localStorage.getItem("w31");
  var w32=localStorage.getItem("w32");
  var w33=localStorage.getItem("w33");
  var ww = [];
  for (var i = 0; i < 3;i++){
    ww[i] = [];
    for (var j = 0;j < 13;j++){
      ww[i][j] = localStorage.getItem("ww" + (i+1) + (j+1));
    }
  }

  var out11 = sig(r2/10);
  var out12 = sig(g2/10);
  var out13 = sig(b2/10);
  var input21 = w11*out11+w21*out12+w31*out13+1;
  var input22 = w12*out11+w22*out12+w32*out13+2;
  var input23 = w13*out11+w23*out12+w33*out13+3;
  var out21 = sig(input21);
  var out22 = sig(input22);
  var out23 = sig(input23);
  var output=[];
  var tempmax=-99;
  var tempcol=-1;
  for (var i = 0;i < 13;i++){
    output[i] = ww[0][i] * out21 +  ww[1][i] * out22 +  ww[2][i] * out23;
    if (tempmax < output[i]){
      tempmax=output[i];
      tempcol = i;
    }
  }
  document.getElementById("res1").textContent = col(tempcol);

  //k近傍法（ユークリッド)
  var k = 3;
  var dis=[];
  var vote=[];
  for (var i = 0;i < n;i++){
    dis[i] = [];
    dis[i][0] = data[i+1][4];
    vote[i] = [];
    vote[i][0] = i;
    vote[i][1]=0;  
    dis[i][1] =  caldis(data[i+1][1],data[i+1][2],data[i+1][3],r2,g2,b2,1);
  }
  dis.sort((a, b) => {
    return a[a.length - 1] - b[b.length -1]
  })
  for(var i = 0;i < k;i++){
    vote[dis[i][0]][1]++;
  }
  vote.sort((a, b) => {
    return (-a[a.length - 1] + b[b.length -1])
  })
  document.getElementById("res2").textContent = col(vote[0][0]);

  //k近傍法（市街地）
  var k = 3;
  var dis=[];
  var vote=[];
  for (var i = 0;i < n;i++){
    dis[i] = [];
    dis[i][0] = data[i+1][4];
    vote[i] = [];
    vote[i][0] = i;
    vote[i][1]=0;  
    dis[i][1] =  caldis(data[i+1][1],data[i+1][2],data[i+1][3],r2,g2,b2,2);
  }
  dis.sort((a, b) => {
    return a[a.length - 1] - b[b.length -1]
  })
  for(var i = 0;i < k;i++){
    vote[dis[i][0]][1]++;
  }
  vote.sort((a, b) => {
    return (-a[a.length - 1] + b[b.length -1])
  })
  document.getElementById("res3").textContent = col(vote[0][0]);
})

$("#inputbutton").on("click",function(){ 
  var txt= String(document.getElementById("inputanswer").value);
  var txtslc = txt.split(/\n/);
  var n=Number(txtslc[0]);
  var txtslc2=[];
  localStorage.setItem("n",n);
  for (var i = 0;i < n;i++){
    txtslc2[i+1] = String(txtslc[i+1]).split(/\s+/);
    for(var j = 0;j < 4;j++){
      localStorage.setItem("data" + (i+1) + "," + (j+1), txtslc2[i+1][j]);
    }
  }
  for(var i = 0;i < 3;i++){
    txtslc[i+n+1] = String(txtslc[i+n+1]).split(/\s+/);
    for (var j = 0; j < 3;j++){
      localStorage.setItem("w" + (i+1) + (j+1),txtslc[i+n+1][j]);
    }
  }
  txtslc[n+4]=String(txtslc[n+4]).split(/\s+/);
/*  for(var i= 0;i < 3;i++){
    localStorage.setItem("ww" + (i+1) + (j+1),txtslc[n+4][i]);
  }*/
})

$("#learn0").on("click",function(){
  learn(0);
})
$("#learn1").on("click",function(){
  learn(1);
})
$("#learn2").on("click",function(){
  learn(2);
})
$("#learn3").on("click",function(){
  learn(3);
})
$("#learn4").on("click",function(){
  learn(4);
})
$("#learn5").on("click",function(){
  learn(5);
})
$("#learn6").on("click",function(){
  learn(6);
})
$("#learn7").on("click",function(){
  learn(7);
})
$("#learn8").on("click",function(){
  learn(8);
})
$("#learn9").on("click",function(){
  learn(9);
})
$("#learn10").on("click",function(){
  learn(10);
})
$("#learn11").on("click",function(){
  learn(11);
})
$("#learn12").on("click",function(){
  learn(12);
})
$("#redraw").on("click",function(){
  var r = document.getElementById("inputR").value;
  var g = document.getElementById("inputG").value;
  var b = document.getElementById("inputB").value;
  document.getElementById("sample").style.backgroundColor="rgba(" + r +"," +  g + "," +  b + ",1)";
})

window.onload=function(){
/*  for(var i = 0; i < 3;i++){
    for(var j = 0; j < 13;j++){
      localStorage.setItem("ww" + (i+1) + (j+1), Math.random());
    }
  }
  for(var i = 0; i < 3;i++){
    for(var j = 0; j < 3;j++){
      localStorage.setItem("w" + (i+1) + (j+1),Math.random());
    }
  }*/
  var n = localStorage.getItem("n");
  document.getElementById("inputanswer").textContent=n + "\n";
  for(var i = 0;i < n;i++){
    for (var j = 0;j < 4;j++){
      document.getElementById("inputanswer").textContent+=localStorage.getItem("data" + (i+1) + "," + (j+1)) +" ";
    }
    document.getElementById("inputanswer").textContent+="\n";
  }
  for(var i = 0;i < 3;i++){
    for (var j = 0;j < 3;j++){
      document.getElementById("inputanswer").textContent+=localStorage.getItem("w" + (i+1)+(j+1)) + " ";
    }
    document.getElementById("inputanswer").textContent+= "\n";
  }
  for(var i = 0;i < 3;i++){
    for(var j = 0 ; j < 13;j++){
      document.getElementById("inputanswer").textContent+=localStorage.getItem("ww" + (i+1) + (j+1)) + " ";
    }
    document.getElementById("inputanswer").textContent+="\n";
  }
  var r = Math.round(Math.random() * 255);
  var g = Math.round(Math.random() * 255);
  var b = Math.round(Math.random() * 255);
  document.getElementById("learnr").value = r;
  document.getElementById("learng").value = g;
  document.getElementById("learnb").value = b;
  document.getElementById("learnsample").style.backgroundColor="rgba(" + r + "," + g + "," + b + ",1)";
}

/*学習形式
N
255 255 255 3
255 255 255 4
|
255 255 255 0
w_11 w_12 w_13
w_21 w_22 w_23
w_31 w_32 w_33
w'1 w'2 w'3
*/