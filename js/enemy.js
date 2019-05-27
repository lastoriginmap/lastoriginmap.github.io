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
	document.title = enemyStatData.name+' 정보'		;
	$('#enemy_name').append(enemyStatData.name);
	writeData('enemy_LVL', enemyStatData.LVL);
	writeData('enemy_HP', enemyStatData.HP);
	writeData('enemy_ATK', enemyStatData.ATK);
	writeData('enemy_DEF', enemyStatData.DEF);
	writeData('enemy_AGI', enemyStatData.AGI);
	writeData('enemy_CRT', enemyStatData.CRT);
	writeData('enemy_HIT', enemyStatData.HIT);
	writeData('enemy_DOD', enemyStatData.DOD);
	
	for(var i=0;i<enemyDescData.skills.length;i++)
	{
		$('.carousel-indicators').append('<li></li>');
		$('li:last').attr({
			"data-target": "#skill_carousel",
			"data-slide-to": String(i)
		});
		if(enemyDescData.skills[i].type=="active") { $('li:last').attr("class","skill_active") }
		else if(enemyDescData.skills[i].type=="passive") { $('li:last').attr("class","skill_passive") }
		
		$('.carousel-inner').append('<div id="inner'+String(i)+'"></div>\n');
		$('#inner'+String(i)).attr({
			"class": "item",
		});
		$('#inner'+String(i)).append('<div class=\"skill_wrap\"><div class=\"row\"><div class=\"col-xs-4\"><div class=\"skill_name_wrap\"></div></div><div class=\"col-xs-3\"><div class=\"skill_range_wrap\"></div></div><div class=\"col-xs-5\"><div class=\"skill_area_wrap\"><table><tr class=\"row\"><td></td><td></td><td></td></tr><tr class=\"row\"><td></td><td></td><td></td></tr><tr class=\"row\"><td></td><td></td><td></td></tr></table></div></div></div><div class=\"row\"><div class=\"col-xs-12\"><div class=\"skill_description_wrap\"></div></div></div></div>');
		$('div.col-xs-4:last > div.skill_name_wrap').append(enemyDescData.skills[i].name);
		$('div.col-xs-3:last > div.skill_range_wrap').append(enemyDescData.skills[i].range);
		//$('div.col-xs-5:last > div.skill_area_wrap').append('<table><tr class=\"row\"><td></td><td></td><td></td></tr><tr class=\"row\"><td></td><td></td><td></td></tr><tr class=\"row\"><td></td><td></td><td></td></tr></table>');
		if(typeof enemyDescData.skills[i].areadata!="undefined") { drawSkillArea($('div.col-xs-5:last > div.skill_area_wrap'), enemyDescData.skills[i].areadata); }
		$('div.col-xs-12:last > div.skill_description_wrap').append('<p>'+enemyDescData.skills[i].description+'</p>');
		$('#'+enemyDescData.skills[i].title.substr(0,6)+'power'+enemyDescData.skills[i].title.substr(6)).append(enemyStatData.skillpower[i]+' ');
    }
	$('.carousel-indicators>li').first().attr("class", "active skill_active");
	$('#inner0').attr("class", "item active");
	
	$("#myCarousel").carousel();
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