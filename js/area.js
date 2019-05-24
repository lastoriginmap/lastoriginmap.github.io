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




