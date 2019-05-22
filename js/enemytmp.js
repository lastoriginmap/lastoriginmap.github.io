window.onload = function(){
    var stage = GetURLParameter('stage');
    var wavenum = GetURLParameter('wave');
    var enemynum = GetURLParameter('enemy');
	
	var enemydata=StageParse(stage).wave[wavenum].enemy[enemynum];	
	var enemydscrdata=EnemyParse(enemydata.name);
	DrawEnemyPage(enemydata, enemydscrdata);
}

function DrawEnemyPage(enemydata, enemydscrdata)
{
	document.title = enemydata.name+' 정보'		;
	$('#enemy_name').append(enemydata.name);
	WriteData('enemy_LVL', enemydata.LVL);
	WriteData('enemy_HP', enemydata.HP);
	WriteData('enemy_ATK', enemydata.ATK);
	WriteData('enemy_DEF', enemydata.DEF);
	WriteData('enemy_AGI', enemydata.AGI);
	WriteData('enemy_CRT', enemydata.CRT);
	WriteData('enemy_HIT', enemydata.HIT);
	WriteData('enemy_DOD', enemydata.DOD);
	
	for(var i=0;i<enemydscrdata.skills.length;i++)
	{
		$('.carousel-indicators').append('<li></li>');
		$('li:last').attr({
			"data-target": "#skill_carousel",
			"data-slide-to": String(i)
		});
		if(enemydscrdata.skills[i].type=="active") { $('li:last').attr("class","skill_active") }
		else if(enemydscrdata.skills[i].type=="passive") { $('li:last').attr("class","skill_passive") }
		
		$('.carousel-inner').append('<div id="inner'+String(i)+'"></div>\n');
		$('#inner'+String(i)).attr({
			"class": "item",
		});
		$('#inner'+String(i)).append('<div class=\"skill_wrap\"><div class=\"row\"><div class=\"col-xs-4\"><div class=\"skill_name_wrap\"></div></div><div class=\"col-xs-3\"><div class=\"skill_range_wrap\"></div></div><div class=\"col-xs-5\"><div class=\"skill_area_wrap\"><table><tr class=\"row\"><td></td><td></td><td></td></tr><tr class=\"row\"><td></td><td></td><td></td></tr><tr class=\"row\"><td></td><td></td><td></td></tr></table></div></div></div><div class=\"row\"><div class=\"col-xs-12\"><div class=\"skill_description_wrap\"></div></div></div></div>');
		$('div.col-xs-4:last > div.skill_name_wrap').append(enemydscrdata.skills[i].name);
		$('div.col-xs-3:last > div.skill_range_wrap').append(enemydscrdata.skills[i].range);
		//$('div.col-xs-5:last > div.skill_area_wrap').append('<table><tr class=\"row\"><td></td><td></td><td></td></tr><tr class=\"row\"><td></td><td></td><td></td></tr><tr class=\"row\"><td></td><td></td><td></td></tr></table>');
		if(typeof enemydscrdata.skills[i].areadata!="undefined") { DrawSkillArea($('div.col-xs-5:last > div.skill_area_wrap'), enemydscrdata.skills[i].areadata); }
		$('div.col-xs-12:last > div.skill_description_wrap').append('<p>'+enemydscrdata.skills[i].description+'</p>');
		$('#'+enemydscrdata.skills[i].title.substr(0,6)+'power'+enemydscrdata.skills[i].title.substr(6)).append(enemydata.skillpower[i]+' ');
    }
	$('.carousel-indicators>li').first().attr("class", "active skill_active");
	$('#inner0').attr("class", "item active");
	
	$("#myCarousel").carousel();
}

function DrawSkillArea(json, data)
{ 
	for(var i=0;i<data.length;i++)
	{
		var row=3-parseInt((data[i]-1)/3);
		var column=data[i]-parseInt((data[i]-1)/3)*3;
		json.children().children().children(":nth-child("+row+")").children(":nth-child("+column+")").css({"background-color": "yellow"});
	}
}

function WriteData(str1, str2)
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