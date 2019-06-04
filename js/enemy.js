window.onload = async function(){
    var stageTitle = getURLParameter('stage');
    var waveNum = getURLParameter('wave');
    var enemyNum = getURLParameter('enemy');

	var stageLoadData=await loadStageData(stageTitle);
	var stageData=stageLoadData.stageData;
	var enemyStatData=stageData.wave[waveNum].enemy[enemyNum];
	var enemyDescData=await loadEnemyData(enemyStatData.name);
	drawEnemyPage(enemyStatData, enemyDescData);
	
	$('.skill-nav').on('click', '.btn', function(e) {
		changeSkill(e.currentTarget.hash.slice(6));
		e.preventDefault();
	}); 
};

function drawEnemyPage(stat, desc)
{
	document.title = stat.name+' 정보';
	$('#name').append(stat.name);
	$('.image').append("<img src=\"images/profile/"+desc.img+".png\" style=\"width: 100%\" />");
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
			$('.skill-icon:last').attr("src", "images/SkillIcon/"+desc.skills[i].img+"_active.png");
		}
		else if(desc.skills[i].type=="passive")
		{
			$('.btn:last').addClass("skill-passive");
			$('.skill-icon:last').attr("src", "images/SkillIcon/"+desc.skills[i].img+"_passive.png");
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