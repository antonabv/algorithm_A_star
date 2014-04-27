//создание таблицы 10х10
var a="";
a+="<tr>";
	for(var i=0;i<=9;i++){
		for(var j=0;j<=9;j++){
			a+="<td><div onclick='set("+(i*10+j)+");' class='styleTd' id=p"+i+""+j+"></div></td>";
		}
		a+="</tr><tr>";
	}
a+="</tr>";
document.getElementById("o").innerHTML=a;