window.onload = function(){
<<<<<<< HEAD
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
=======
    var stageTitle = getURLParameter('stage');
    var waveNum = getURLParameter('wave');
    var enemyNum = getURLParameter('enemy');
	
	var enemyStatData=stageParse(stageTitle).wave[waveNum].enemy[enemyNum];	
	var enemyDescData=enemyParse(enemyStatData.name);
	drawEnemyPage(enemyStatData, enemyDescData);
	
	$('.skill-nav').on('click', '.btn', function(e) {
		changeSkill(e.currentTarget.hash.slice(6));
		e.preventDefault();
	}); 
}

function drawEnemyPage(stat, desc)
{
	document.title = stat.name+' 정보';
	$('#name').append(stat.name);
	$('.image').append("<img src=\"images/profile/"+desc.img+"\" style=\"width: 100%\" />");
	writeData('LVL', stat.LVL);
	writeData('HP', stat.HP);
	writeData('ATK', stat.ATK);
	writeData('DEF', stat.DEF);
	writeData('AGI', stat.AGI);
	writeData('CRT', stat.CRT);
	writeData('HIT', stat.HIT);
	writeData('DOD', stat.DOD);
	
	for(var i=0;i<desc.skills.length;i++)
	{
		$('.btn:first').clone().appendTo('.skill-nav');
		$('.btn:last').attr('href', '#skill'+i);
		if(desc.skills[i].type=="active")
		{
			$('.btn:last').addClass("skill-active");
			$('.skill-icon:last').attr("src", "images/SkillIcon/SkillIconCircle_"+desc.skills[i].img+"_active.png");
		}
		else if(desc.skills[i].type=="passive")
		{
			$('.btn:last').addClass("skill-passive");
			$('.skill-icon:last').attr("src", "images/SkillIcon/SkillIconCircle_"+desc.skills[i].img+"_passive.png");
		}
    }
    $('.btn:first').remove();
    $('.btn:first').addClass("active");
	for(var i=0;i<desc.skills.length;i++)
	{
		$('.skill-container:last').after($('.skill-container:first').clone());
		drawSkillInfo(i, stat.skillLVL[i], stat.skillpower[i], desc.skills[i]);
	}
	$('.skill-container:first').remove();
	$('.skill-container:first').addClass('skill-container-active');
}

function drawSkillInfo(index, LVL, power, desc)
{
	$('.skill-name:last').html("<h5> Lv. "+LVL+"</h5> <h3>"+desc.name+"</h3>");
	$('.skill-range:last').html("사정거리 "+desc.range);
	if(typeof desc.areadata!="undefined")
	{
		drawSkillArea($('.skill-area:last'), desc.areadata);
	}
	else
	{
		drawSkillArea($('.skill-area:last'), [5]);
	}
	$('.skill-description:last').html('<p>'+desc.description+'</p>');
	$('#'+desc.title.substr(0,6)+'power'+desc.title.substr(6)).html(power+' ');
    
    $('.active:last').removeClass("active");
	$('.skill-container:eq('+(index+1)+') .btn:eq('+index+')').addClass("active");
	if(desc.type=="active")
	{
		$('.skill-nav-wrap:last').css("border-bottom", "5px solid orange");
	}
	else if(desc.type=="passive")
	{
		$('.skill-nav-wrap:last').css("border-bottom", "5px solid skyblue");
	}
}

function drawSkillArea(json, data)
{ 
	if(data.indexOf(0.75)!=-1||data.indexOf(0.5)!=-1)
	{
		for(var i=0; i<9; i++)
		{
			if(data[i]==0.5) { var color = "rgb(255, 128, 0)"; }
			else if(data[i]==0.75) { var color = "rgb(255, 171, 0)"; }
			else if(data[i]==1) { var color = "rgb(255, 213, 0)"; }
			
			var row=3-parseInt((i)/3);
			var column=i+1-parseInt((i)/3)*3;
			json.children().children().children(":nth-child("+row+")").children(":nth-child("+column+")").css({"background-color": color});
		}
	}
	else
	{
		for(var i=0;i<9;i++)
		{
			if(data.indexOf(i+1)!=-1) { var color = "rgb(255, 213, 0)"; }
			else { var color = "rgb(50, 50, 50)"; }
			
			var row=3-parseInt((i)/3);
			var column=i+1-parseInt((i)/3)*3;
			json.children().children().children(":nth-child("+row+")").children(":nth-child("+column+")").css({"background-color": color});
		}
	}
}

function changeSkill(index)
{
	$('.skill-container-active').removeClass('skill-container-active');
	$('.skill-container:eq('+index+')').addClass('skill-container-active');
}

function writeData(str1, str2)
>>>>>>> canvas
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