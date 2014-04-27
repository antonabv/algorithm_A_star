//создание матрицы смежности
var M=new Array(100);
	for(var i=0;i<=99;i++){
		M[i]=new Array(100);
	}
	for(var i=0;i<=99;i++){
		for(var j=0;j<=99;j++){
			if((Math.abs(Math.floor (j/10)-Math.floor (i/10))<=1)&&(Math.abs(j%10-i%10)<=1)){
				M[i][j]=1;
			}
			else{
				M[i][j]=0;
			}
		M[i][i]=0;
		}
	}
function gen(){ //функция генерации поля: стена-ячейка становится чёрной и удаляются все связи в матрице смежности
	for(var i=1;i<=q.value;i++){
		var rand=Math.floor(Math.random() * 99 );
			for(var j=0;j<=99;j++){
				M[rand][j]=0;
			}
			for(var j=0;j<=99;j++){
				M[j][rand]=0;
			}
		document.getElementById("p"+Math.floor (rand/10)+""+rand%10).style.backgroundColor="black";
	}
}
var sset=0;
var start=0;  //откуда
var finish=99;//куда

function set(x){ //функция установки начала/конца
	if(sset==0){
		start=x;
		document.getElementById("p"+Math.floor (x/10)+""+x%10).style.backgroundColor="green";
		sset=1;
	}
	else{
		if(sset==1){
			finish=x;
			document.getElementById("p"+Math.floor (x/10)+""+x%10).style.backgroundColor="red";
			document.getElementById("k").disabled=0;
			sset=2;
		}
	}
}

function go(){ //функция поиска кратчайшего пути алгоритмом A*
var dlina=new Array(100);
	for(var i=0;i<=99;i++){
		dlina[i]=10000;
	}
var predok=new Array(100);
	for(var i=0;i<=99;i++){
		predok[i]=undefined;
	}
var access=new Array(100);
	for(var i=0;i<=99;i++){
		access[i]=1;
	}
dlina[start]=0;
var now=0;
var H=0;
	for(var x=0;x<=98;x++){ //проход по всем вершинам графа
		var min=10000;
		//ищем минимальную вершину
		for(var z=0;z<=99;z++){
			if(access[z]!=1) continue;
			if(min>dlina[z]){
					min=dlina[z];
					now=z;
			}
		}
			//минимальная вершина в переменной now
		for(var i=0;i<=99;i++){  //проверяем соседние вершины
			if(M[now][i]==0) continue;
			if(access[i]!=1) continue;
			if((Math.abs(Math.floor(i/10)-Math.floor(now/10))+Math.abs(i%10-now%10))==2){ //если по диагонали
				H=14;
			}
			else{
				H=10;
			}
			if(dlina[now]+(Math.abs(Math.floor(i/10)-Math.floor(finish/10))+Math.abs(i%10-finish%10))*10+H<dlina[i]){  //если нашли более быстрый путь в другую вершину
				dlina[i]=dlina[now]+(Math.abs(Math.floor(i/10)-Math.floor(finish/10))+Math.abs(i%10-finish%10))*10+H;
				predok[i]=now;
				document.getElementById("p"+Math.floor (i/10)+""+i%10).innerHTML=dlina[i];
			}
		}
		access[now]=0;
		if(now==finish) break;
	}
var end=finish;
	while(predok[end]!=undefined){
		document.getElementById("p"+Math.floor (end/10)+""+end%10).style.backgroundColor="yellow";
		end=predok[end];
	}
	if(end!=start) alert("Пути нету");
	document.getElementById("p"+Math.floor (start/10)+""+start%10).style.backgroundColor="green";
	document.getElementById("p"+Math.floor (finish/10)+""+finish%10).style.backgroundColor="red";
}