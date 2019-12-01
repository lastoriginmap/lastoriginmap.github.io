window.onload = async function(){
    var stageTitle = getURLParameter('stage');
    var waveNum = getURLParameter('wave');
    var enemyNum = getURLParameter('enemy');

	//remove this line
	var areaData=await loadAreaData(getAreaByStageTitle(stageTitle)); //remove this line
	var stageLoadData=await loadStageData(stageTitle);
	var stageData=stageLoadData.stageData;
	var enemyStatData=stageData.wave[waveNum].enemy[enemyNum];
	var enemyDescData=await loadEnemyData(enemyStatData.name);
	
	//drawEnemyPage(enemyStatData, enemyDescData);
	if('updated' in areaData) drawEnemyPage(enemyStatData, enemyDescData, true);
	else drawEnemyPage(enemyStatData, enemyDescData);
	
	$('.skill-nav').on('click', '.btn', function(e) {
		changeSkill(e.currentTarget.hash);
		e.preventDefault();
	}); 
};

//function drawEnemyPage(stat, desc)
function drawEnemyPage(stat, desc, updated=false)
{
	if(stat.nickname)
	{
		var enemyName = stat.nickname;
	}
	else
	{
		var enemyName = stat.name;
	}
	document.title = enemyName+' 정보';
	$('#name').append(enemyName);
	$('.image').append("<img src=\"images/profile/"+desc.img+".png\" style=\"width: 100%\" />");
	writeData('LVL', stat.LVL);
	writeData('HP', stat.HP);
	writeData('ATK', stat.ATK);
	writeData('DEF', stat.DEF);
	writeData('AGI', stat.AGI);
	writeData('CRT', stat.CRT);
	writeData('HIT', stat.HIT);
	writeData('DOD', stat.DOD);
	
	
	if('type' in desc)
	{
		$('#type').append(desc.type);
	}
	else
	{
		$('#type').remove();
	}
	
	if('resist' in stat)
	{
		writeData('fire', stat.resist[0]);
		writeData('ice', stat.resist[1]);
		writeData('electric', stat.resist[2]);
	}
	//else if('resist' in desc)
	else if('resist' in desc && updated)
	{
		writeData('fire', desc.resist[0]);
		writeData('ice', desc.resist[1]);
		writeData('electric', desc.resist[2]);
	}
	else
	{
		$('.resist').remove();
	}
	
	for(var i=0;i<desc.skills.length;i++)
	{
		if(stat.skillLVL[i]!=0&&stat.skillLVL[i]!==undefined)
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
    }
    $('.btn:first').remove();
    $('.btn-info').clone().appendTo('.skill-nav');
    $('.btn-info:last').attr('href', '#info');
    $('.btn-info:last').addClass("skill-active");
    $('.info-icon').attr("src", "images/info.png");
    
    $('.btn-info:first').remove();
    $('.btn:first').addClass("active");
	for(var i=0;i<desc.skills.length;i++)
	{
		if(stat.skillLVL[i]!=0&&stat.skillLVL[i]!==undefined)
		{
			$('.skill-container:last').after($('.skill-container:first').clone());
			drawSkillInfo(i, stat.skillLVL[i], stat.skillpower[i], desc.skills[i]);
		}
	}
	$('.skill-container:last').after($('.skill-container:first').clone());
	drawInfo(desc.skills.length, desc.info);
	$('.skill-container:first').remove();
	$('.skill-container:first').addClass('skill-container-active');
}

function drawSkillInfo(index, LVL, power, desc)
{
	var attr = "normal"
	if(desc.attr!=undefined) { attr=desc.attr; }
	$('.skill-name:last').html("<img class='icon-attr' src='images/"+attr+".png'></img><h5> Lv. "+LVL+"</h5> <h3>"+desc.name+"</h3>");
	$('.skill-range:last').html("사정거리 "+desc.range);
	if(desc.AP!=undefined)
	{
		$('.skill-range:last').append("<br>AP-"+desc.AP);
	}
	else
	{
		//$('.skill-range:last').html("AP-"+"#");
	}
	if(typeof desc.areadata!="undefined")
	{
		drawSkillArea($('.skill-area:last'), desc.areadata);
	}
	else
	{
		drawSkillArea($('.skill-area:last'), [5]);
	}
	$('.skill-description:last').html('<p>'+desc.description+'</p>');
	$('#'+desc.title.substr(0,6)+'power'+desc.title.substr(6)).html(power);
    
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
function drawInfo(index, info)
{
	$('.skill-name:last').remove();
	$('.skill-range:last').remove();
	$('.skill-area:last').remove();
	$('.skill-description:last').addClass('info-description');
	$('.skill-description:last').removeClass('.skill-description');
	$('.info-description:last').css('grid-area','3/1/5/13');
	if(info===undefined) info='-';
	$('.info-description:last').html('<h3>대상 정보</h3><p>'+info+'</p>');
	
	$('.active:last').removeClass("active");
	$('.skill-container:eq('+(index+1)+') .btn-info').addClass("active");
	$('.skill-nav-wrap:last').css("border-bottom", "5px solid orange");
}

function drawSkillArea(json, data)
{ 
	if(data.some(el=> {return isNaN(el);}))
	{
		for(var i=0; i<9; i++)
		{
			var color = data[i];
			
			var row=3-parseInt((i)/3);
			var column=i+1-parseInt((i)/3)*3;
			json.children().children().children(":nth-child("+row+")").children(":nth-child("+column+")").css({"background-color": color});
		}
	}
	else if(data.find(el=>{return el<1;})!=undefined)
	{
		for(var i=0; i<9; i++)
		{
			var color = "rgb(255, "+Math.round((213-128)/0.5*(data[i]-0.5)+128)+", 0)";
						
			if(data[i]==0) { color = "rgb(45, 45, 45)"; }
			
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

function changeSkill(hash)
{
	$('.skill-container-active').removeClass('skill-container-active');
	if(hash=='#info')
	{
		$('.skill-container:last').addClass('skill-container-active');
	}
	else
	{
		$('.skill-container:eq('+hash.slice(6)+')').addClass('skill-container-active');
	}
}

function writeData(str1, str2)
{
	if(str1=='fire'||str1=='ice'||str1=='electric')
	{
		$('#'+str1).append(`<img class="icon-attr" src="images/${str1}.png"> `);
	}
	if(str2 == -1)
	{
		$('#'+str1).append('???');
	}
	else
	{
		$('#'+str1).append(str2);
	}
	if(str1=='HIT'||str1=='CRT'||str1=='DOD'||str1=='fire'||str1=='ice'||str1=='electric')
	{
		$('#'+str1).append(' %');
	}
}