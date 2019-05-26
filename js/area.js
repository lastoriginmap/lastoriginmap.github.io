window.onload = function(){
    var areanum = GetURLParameter('areanum');
	document.title = areanum+'지역'	;
	$("#area_title").html(areanum+'지역 철충 지도');
	
	DrawArea(areanum);
	DrawCanvas(areanum);
}

function DrawArea(areanum)
{
	var areadata=AreaParse(areanum);
    var gridsize=[8,3];
	if(typeof(areadata.gridsize)!="undefined")
	{
		gridsize=areadata.gridsize;
	}
	var unit=$(".areamap").width()/gridsize[0];
	for(var i=0;i<areadata.mainstage.length;i++)
	{
	  var index=Number(areadata.mainstage[i].title.split('-')[1]);
	  $("#mainstage-list").append("<div class=\"stage mainstage\" id=\"mainstage"+index+"\"><div class=\"title-container\"><a href=\"./stage.html?stage_name="+areanum+"-"+index+"\"></a>"+areanum+"-"+index+"</div></div>");
      document.getElementById("mainstage"+index).style.left=(-0.75+index)*unit-2+"px";
      document.getElementById("mainstage"+index).style.top=(1.5*0.55-1/8)*unit-1+"px";
      document.getElementById("mainstage"+index).style.width=0.5*unit+3+"px";
      document.getElementById("mainstage"+index).style.height=0.5*unit+2+"px";
	}
	for(var i=0;i<areadata.bstage.length;i++)
	{
	  var index=Number(areadata.bstage[i].title.split('-')[1].slice(0,-1));
	  $("#bstage-list").append("<div class=\"stage bstage\" id=\"bstage"+index+"\"><div class=\"title-container\"><a href=\"./stage.html?stage_name="+areanum+"-"+index+"B\"></a>"+areanum+"-"+index+"B</div>");
	  document.getElementById("bstage"+index).style.left=(-0.25+index)*unit-2+"px";
      document.getElementById("bstage"+index).style.top=(0.5*0.55-1/8)*unit-1+"px";
      document.getElementById("bstage"+index).style.width=0.5*unit+3+"px";
      document.getElementById("bstage"+index).style.height=0.5*unit+2+"px";
	}
	for(var i=0;i<areadata.exstage.length;i++)
	{
	  var index=Number(areadata.exstage[i].title.split('-')[1].slice(0,-2));
	  $("#exstage-list").append("<div class=\"stage exstage\" id=\"exstage"+index+"\"><div class=\"title-container\"><a href=\"./stage.html?stage_name="+areanum+"-"+index+"Ex\"></a>"+areanum+"-"+index+"Ex</div>");
	  document.getElementById("exstage"+index).style.left=(-0.25+index)*unit-2+"px";
      document.getElementById("exstage"+index).style.top=(2.5*0.55-1/8)*unit-1+"px";
      document.getElementById("exstage"+index).style.width=0.5*unit+3+"px";
      document.getElementById("exstage"+index).style.height=0.5*unit+2+"px";
	}
}

function DrawCanvas(areanum)
{
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width=$("#canvas").parent().width();
	canvas.height=(0.55*3+0.25)/8*canvas.width;
	document.getElementById("canvas-container").style.height=canvas.height+"px";
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	var areadata=AreaParse(areanum);
	var gridsize=[8,3];
	if(typeof(areadata.gridsize)!="undefined")
	{
		gridsize=areadata.gridsize;
	}
	var unit=canvas.width/gridsize[0];
	ctx.lineWidth=2;
	
	for(var i=0;i<areadata.mainstage.length;i++)
	{
		if(typeof(areadata.mainstage[i].grid)!="undefined")
		{
			var index=areadata.mainstage[i].grid[0];
		}
		else
		{
			var index=Number(areadata.mainstage[i].title.split('-')[1])-1;
		}
		ctx.strokeStyle="rgb(230, 230, 92)";
		ctx.beginPath();
		ctx.ellipse(Math.round((0.5+index)*unit), Math.round(1.5*0.55*unit), Math.round(unit/4), Math.round(unit/8), 0, 0, 2*Math.PI);
		ctx.stroke();
	}
	for(var i=0;i<areadata.bstage.length;i++)
	{
		if(typeof(areadata.bstage[i].grid)!="undefined")
		{
			var index=areadata.bstage[i].grid[0];
		}
		else
		{
			var index=Number(areadata.bstage[i].title.split('-')[1].slice(0,-1))-1;
		}
		ctx.strokeStyle="rgb(50, 163, 50)";
		ctx.beginPath();
		ctx.ellipse(Math.round((1+index)*unit), Math.round(0.5*0.55*unit), Math.round(unit/4), Math.round(unit/8), 0, 0, 2*Math.PI);
		ctx.stroke();
	 }
	for(var i=0;i<areadata.exstage.length;i++)
	{
		if(typeof(areadata.exstage[i].grid)!="undefined")
		{
			var index=areadata.exstage[i].grid[0];
		}
		else
		{
			var index=Number(areadata.exstage[i].title.split('-')[1].slice(0,-2))-1;
		}
		ctx.strokeStyle="rgb(235, 60, 60)";
		ctx.beginPath();
		ctx.ellipse(Math.round((1+index)*unit), Math.round(2.5*0.55*unit), Math.round(unit/4), Math.round(unit/8), 0, 0, 2*Math.PI);
		ctx.stroke();
	}
}














