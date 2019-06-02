<<<<<<< HEAD
window.onload = function(){
    var areanum = GetURLParameter('areanum');
	document.title = areanum+'지역'	;
	$("#area_title").html(areanum+'지역 철충 지도');
	
	DrawPage(areanum);
}

function DrawPage(areanum)
{
	var areadata=AreaParse(areanum);
	for(var i=0;i<areadata.mainstage.length;i++)
	{
	  var index=Number(areadata.mainstage[i].title.split('-')[1]);
	  $(".mainstage-list").append("<div class=\"stage mainstage\" id=\"mainstage"+index+"\"><a href=\"./stage.html?stage_name="+areanum+"-"+index+"\">"+areanum+"-"+index+"</a></div>");
	}
	for(var i=0;i<areadata.bstage.length;i++)
	{
	  var index=areadata.bstage[i].title.split('-')[1].slice(0,-1);
	  $(".bstage-list").append("<div class=\"stage bstage\" id=\"bstage"+index+"\"><a href=\"./stage.html?stage_name="+areanum+"-"+index+"B\">"+areanum+"-"+index+"B</a></div>");
	}
	for(var i=0;i<areadata.exstage.length;i++)
	{
	  var index=areadata.exstage[i].title.split('-')[1].slice(0,-2);
	  $(".exstage-list").append("<div class=\"stage exstage\" id=\"exstage"+index+"\"><a href=\"./stage.html?stage_name="+areanum+"-"+index+"Ex\">"+areanum+"-"+index+"Ex</a></div>");
	}
}




=======
window.onload  =  function(){
    var areaNum  =  getURLParameter('areanum');
	document.title  =  areaNum+'지역'	;
	$("#area_title").html(areaNum+'지역 철충 지도');
	
	drawArea(areaNum);
	drawCanvas(areaNum);
}

function drawArea(areaNum)
{
	var areaData = areaParse(areaNum);
    var gridSize = [8,3];
	if(typeof(areaData.gridsize)!= "undefined")
	{
		gridSize = areaData.gridsize;
	}
	var unit = Math.max($(".areamap").width(), 540)/gridSize[0];
	var stageType = ["b", "main", "ex"];
	var stageTypeTitle = ["B", "", "Ex"];
	for(var j = 0;j<stageType.length;j++)
	{
	for(var i = 0;i<areaData[stageType[j]+"stage"].length;i++)
	{
		var index = getIndexByStageTitle(areaData[stageType[j]+"stage"][i].title);
		var grid = getGridByStageData(areaData[stageType[j]+"stage"][i]);
		$("#"+stageType[j]+"stage-list").append("<a href=\"./stage.html?stage_title="+areaNum+"-"+index+stageTypeTitle[j]+"\"><div class=\"stage "+stageType[j]+"stage\" id=\""+stageType[j]+"stage"+index+"\"></div><div class=\"title-container\">"+areaNum+"-"+index+stageTypeTitle[j]+"</div></a>");
		alert(stageTypeTitle[j]);
		var stageBox = $("#"+stageType[j]+"stage"+index)[0];
		var titleBox = $("#"+stageType[j]+"stage"+index+"+.title-container")[0];
		stageBox.style.left = (0.75-(grid[1]%2)*0.5+grid[0])*unit-2+"px";
		stageBox.style.top = ((grid[1]+0.75)*0.55-1/4)*unit-1+"px";
		stageBox.style.width = 0.5*unit+3+"px";
		stageBox.style.height = 3/8*unit+2+"px";
		titleBox.style.left = stageBox.style.left;
		titleBox.style.top = ((grid[1]+0.75)*0.55+1/8)*unit-1+"px";
		titleBox.style.width = stageBox.style.width;
		//titleBox.style.height = 3/8*unit+height+2+"px";
	}
	}
}

function drawCanvas(areaNum)
{
	var stageType = ["b", "main", "ex"];
	var stageTypeTitle = ["B", "", "Ex"];
	var mainColor = "rgb(230, 230, 92)";
	var bColor = "rgb(50, 163, 50)";
	var exColor = "rgb(235, 60, 60)";
	var mainImg = "data:image/png;base64,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";
	var bImg = "data:image/png;base64,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";
	var exImg = "data:image/png;base64,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";
	var colorArr = [bColor, mainColor, exColor];
	var imgSrcArr = [bImg, mainImg, exImg];
	
	var canvas  =  document.getElementById("canvas");
	var ctx  =  canvas.getContext("2d");
	
	var areaData = areaParse(areaNum);
	var gridSize = [8,3];
	if(typeof(areaData.gridSize)!= "undefined")
	{
		gridSize = areaData.gridSize;
	}
	canvas.width = Math.max($("#canvas").parent().width(), 540);
	var unit = canvas.width/gridSize[0];
	canvas.height = (0.55*(3+0.5))*unit;
	document.getElementById("canvas-container").style.height = canvas.height+"px";
	ctx.fillStyle  =  "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	ctx.lineWidth = 2;
	
	for(var j = 0;j<3;j++)
	{
	for(var i = 0;i<areaData[stageType[j]+"stage"].length;i++)
	{
		ctx.strokeStyle = colorArr[j];
		var stageData = areaData[stageType[j]+"stage"][i];
		if(typeof(stageData.prevstage)!= "undefined")
		{
			var index = stageTypeTitle.indexOf(getTypeByStageTitle(stageData.prevstage))
			var prevStageData = areaData[stageType[index]+"stage"].filter(function(data){ return data.title == stageData.prevstage; })[0];
			var prevGrid = getGridByStageData(prevStageData);
			var grid = getGridByStageData(stageData);
			
			var startpoint = [Math.round((1+grid[0]-0.5*(grid[1]%2))*unit), Math.round((0.75+grid[1])*0.55*unit)];
			var endpoint = [Math.round((1+prevGrid[0]-0.5*(prevGrid[1]%2))*unit), Math.round((0.75+prevGrid[1])*0.55*unit)];
			
			var lingrad  =  ctx.createLinearGradient(startpoint[0], startpoint[1], endpoint[0], endpoint[1]);
			lingrad.addColorStop(0, colorArr[grid[1]]);
			lingrad.addColorStop(1, colorArr[prevGrid[1]]);
			
			ctx.strokeStyle = lingrad;
			ctx.beginPath();
			ctx.moveTo(startpoint[0], startpoint[1]);
			ctx.lineTo(endpoint[0], endpoint[1]);
			ctx.closePath();
			ctx.stroke();
		}
	}
	}
	
	for(var j = 0;j<stageType.length;j++)
	{
	for(var i = 0;i<areaData[stageType[j]+"stage"].length;i++)
	{
		var grid = getGridByStageData(areaData[stageType[j]+"stage"][i]);
		ctx.strokeStyle = colorArr[j];
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.ellipse(Math.round((0.5*(2-grid[1]%2)+grid[0])*unit), Math.round((grid[1]+0.75)*0.55*unit), Math.round(unit/4), Math.round(unit/8), 0, 0, 2*Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}
	}
	
	var imgarr = [];
	for(var j = 0;j<stageType.length;j++)
	{
		imgarr[j] = new Image();
		imgarr[j].j = j;
		imgarr[j].addEventListener("load", function() {
			var j = this.j;
			for(var i = 0;i<areaData[stageType[j]+"stage"].length;i++)
			{
				var grid = getGridByStageData(areaData[stageType[j]+"stage"][i]);
				ctx.drawImage(this, Math.round((0.5*(2-grid[1]%2)+grid[0]-1/6)*unit), Math.round(((grid[1]+0.75)*0.55-7/24)*unit), Math.round((1/3)*unit), Math.round((1/3)*unit));
			}
		});
		imgarr[j].src = imgSrcArr[j];
	}
}

function getGridByStageData(stageData)
{
	var grid = [];
	if(typeof(stageData.grid)!= "undefined")
	{
		return stageData.grid;
	}
	else
	{
		var stageType = ["B", "", "Ex"];
		stageType.forEach(function(element, index) {
			if(getTypeByStageTitle(stageData.title) == element)
			{
				grid = [getIndexByStageTitle(stageData.title)-1, index];
			}
		});
	}
	return grid;
}














>>>>>>> canvas
