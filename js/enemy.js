window.onload = function(){
    var stageTitle = getURLParameter('stage');
    var waveNum = getURLParameter('wave');
    var enemyNum = getURLParameter('enemy');
	
	var enemyStatData=stageParse(stageTitle).wave[waveNum].enemy[enemyNum];	
	var enemyDescData=enemyParse(enemyStatData.name);
	drawEnemyPage(enemyStatData, enemyDescData);
}

function drawEnemyPage(enemyStatData, enemyDescData)
{
	document.title = enemyStatData.name+' 정보';
	$('#name').append(enemyStatData.name);
	$('.image').append("<img src=\"https://raw.githubusercontent.com/ImpMK/lastorigin_helper/canvas/images/"+enemyDescData.img+"\" style=\"width: 100%\" />");
	writeData('LVL', enemyStatData.LVL);
	writeData('HP', enemyStatData.HP);
	writeData('ATK', enemyStatData.ATK);
	writeData('DEF', enemyStatData.DEF);
	writeData('AGI', enemyStatData.AGI);
	writeData('CRT', enemyStatData.CRT);
	writeData('HIT', enemyStatData.HIT);
	writeData('DOD', enemyStatData.DOD);
	
	for(var i=0;i<enemyDescData.skills.length;i++)
	{
		$('.carousel-indicators').append('<li></li>');
		$('li:last').attr({
			"data-target": "#skill-carousel",
			"data-slide-to": String(i)
		});
		if(enemyDescData.skills[i].type=="active") { $('li:last').attr("class","skill-active") }
		else if(enemyDescData.skills[i].type=="passive") { $('li:last').attr("class","skill-passive") }
		
		$('.carousel-inner').append('<div id="inner'+String(i)+'"></div>\n');
		$('#inner'+String(i)).attr({
			"class": "item",
		});
		$('#inner'+String(i)).append('<div class=\"row\"><div class=\"skill-container\"><div class=\"col-xs-8 col-sm-8 skill-name-wrap\"></div><div class=\"col-xs-4 col-sm-2 col-sm-push-2 skill-area-wrap\"><table><tr class=\"row\"><td></td><td></td><td></td></tr><tr class=\"row\"><td></td><td></td><td></td></tr><tr class=\"row\"><td></td><td></td><td></td></tr></table></div><div class=\"col-xs-8 col-sm-2 col-sm-pull-2 skill-range-wrap\"></div><div class=\"col-xs-12 skill-description-wrap\"></div></div></div>');
		$('.skill-name-wrap:last').append("<h4> Lv. "+enemyStatData.skillLVL[i]+" "+enemyDescData.skills[i].name+"</h4>");
		$('.skill-range-wrap:last').append("사정거리 "+enemyDescData.skills[i].range);
		//$('div.col-xs-5:last > div.skill-area-wrap').append('<table><tr class=\"row\"><td></td><td></td><td></td></tr><tr class=\"row\"><td></td><td></td><td></td></tr><tr class=\"row\"><td></td><td></td><td></td></tr></table>');
		if(typeof enemyDescData.skills[i].areadata!="undefined") { drawSkillArea($('.skill-area-wrap:last'), enemyDescData.skills[i].areadata); }
		$('.skill-description-wrap:last').append('<p>'+enemyDescData.skills[i].description+'</p>');
		$('#'+enemyDescData.skills[i].title.substr(0,6)+'power'+enemyDescData.skills[i].title.substr(6)).append(enemyStatData.skillpower[i]+' ');
    }
	$('.carousel-indicators>li').first().attr("class", "active skill-active");
	$('#inner0').attr("class", "item active");
	
	$("#myCarousel").carousel();
	$("body").append(document.documentElement.clientWidth+" "+window.innerWidth);
}

function drawSkillArea(json, data)
{ 
	for(var i=0;i<data.length;i++)
	{
		var row=3-parseInt((data[i]-1)/3);
		var column=data[i]-parseInt((data[i]-1)/3)*3;
		json.children().children().children(":nth-child("+row+")").children(":nth-child("+column+")").css({"background-color": "yellow"});
	}
}

function writeData(str1, str2)
{
	if(str2==-1)
	{
		$('#'+str1).append('???');
	}
	else
	{
		$('#'+str1).append(str2);
	}
	if(str1.endsWith('HIT')||str1.endsWith('CRT')||str1.endsWith('DOD'))
	{
		$('#'+str1).append(' %');
	}
}
