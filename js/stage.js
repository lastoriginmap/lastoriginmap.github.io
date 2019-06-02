window.onload = function(){
    var stageTitle = getURLParameter('stage_title');
	document.title = stageTitle+' 스테이지 정보';
	$("a.btn-info").attr("href", "area.html?areanum="+getAreaByStageTitle(stageTitle));
	var stageData=stageParse(stageTitle);
	drawPage(stageData);
	
	$('.carousel-indicators').on('click', '.carousel-indicator', function(e) {
		changeWave(Number(e.currentTarget.hash.slice(5)), stageData.wave.length);
		e.preventDefault();
	});
	$('.carousel-control').on('click', function(e) {
		changeWave(Number(e.currentTarget.hash.slice(5)), stageData.wave.length);
		e.preventDefault();
	});
}

function drawPage(stageData)
{
	$('#stage-title').html(stageData.title+' 스테이지');
	
    for(var i = 0; i < stageData.wave.length; i++)
	{
		$('.carousel-indicator').first().clone().appendTo('.carousel-indicators');
		$('.carousel-indicator').last().attr('href', '#wave'+i);
		
		$('.carousel-slide').first().clone().appendTo('.carousel-track');
		
		
		for(var j=0;j<stageData.wave[i].enemy.length;j++)
		{
			for(var k=0;k<stageData.wave[i].enemy[j].pos.length;k++)
			{
				var pos = stageData.wave[i].enemy[j].pos[k];
			    var row=3-parseInt((pos-1)/3);
			    var column=pos-parseInt((pos-1)/3)*3;
			    var enemyName=stageData.wave[i].enemy[j].name;
			    var enemyIMG=getEnemyIMG(enemyName);
			    $('div:nth-of-type('+((row-1)*3+column)+')', '.carousel-slide:last-child > .wave-grid').html('<a href=\"javascript:show_enemy(\''+stageData.title+'\', '+i+', '+j+')\"><img src=\"images/profile/'+enemyIMG+'\" /><p>'+enemyName+'</p></a>');
			}
		}
    }
    
    $('.carousel-indicator').first().remove();
    $('.carousel-slide').first().remove();
    
    changeWave(0, stageData.wave.length)
}

function changeWave(index, length)
{
	$('.carousel-slide-active').removeClass('carousel-slide-active');
	$('.carousel-slide').eq(index).addClass('carousel-slide-active');
	$('.carousel-indicator-active').removeClass('carousel-indicator-active');
	$('.carousel-indicator').eq(index).addClass('carousel-indicator-active');
	$('.carousel-control-end').removeClass('carousel-control-end');
	$('.carousel-control-left').attr("href", "#wave"+(index-1));
	$('.carousel-control-right').attr("href", "#wave"+(index+1));
	if($('.carousel-control-left').attr("href")=="#wave-1")
	{
		$('.carousel-control-left').addClass("carousel-control-end");
	}
	if($('.carousel-control-right').attr("href")=="#wave"+length)
	{
	$('.carousel-control-right').addClass("carousel-control-end");
	}
	
	//var translateX=Number(document.getElementByClassName('carousel-track')[0].style.transform.replace(/[^\d.]/g, ''));
	$('.carousel-track').css("transform", "translateX("+(-100*index)+"%)");
}

function show_enemy(stage, wave, enemy) {
    var popupX = (window.screen.width / 2) - (540 / 2);
    var popupY= (window.screen.height /2) - (400 / 2);
    window.open('enemy.html?stage='+stage+'&wave='+wave+'&enemy='+enemy, "popup_enemy", 'status=no, height=600, width=463, left='+ popupX + ', top='+ popupY + ', screenX='+ popupX + ', screenY= '+ popupY);
}



