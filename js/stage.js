window.onload = function(){
    var stageTitle = getURLParameter('stage_title');
	document.title = stageTitle+' 스테이지 정보';
	$("a.btn-info").attr("href", "area.html?areanum="+getAreaByStageTitle(stageTitle));
	var stageData=stageParse(stageTitle);
	drawPage(stageData);
}

function drawPage(stageData)
{
	$('#stage-title').html(stageData.title+' 스테이지');
		
    for(var i = 0; i < stageData.wave.length; i++)
	{
		$('.carousel-indicators').append('<li></li>');
		$('li:last').attr({
			"data-target": "#myCarousel",
			"data-slide-to": String(i),
			"class": "",
		});
		
		$('.carousel-inner').append('<div id="inner'+String(i)+'"></div>\n');
		$('#inner'+String(i)).attr({
			"class": "item",
		});
		$('#inner'+String(i)).append('<table class="table table-bordered"><tbody></tbody></table>');
		for(var j=1;j<=3;j++)
		{
			$('#inner'+String(i)).children('table').children('tbody').append('<tr id="tr'+String(i)+String(j)+'" class="row"></tr>');
			for(var k=1;k<=3;k++)
			{
				$('#tr'+String(i)+String(j)).append('<td id="td'+String(i)+String(k)+String(j)+'" class="col-xs-4"></td>');
			}
		}
		
		for(var j=0;j<stageData.wave[i].enemy.length;j++)
		{
			for(var k=0;k<stageData.wave[i].enemy[j].pos.length;k++)
			{
			  var row=3-parseInt((stageData.wave[i].enemy[j].pos[k]-1)/3);
			  var column=stageData.wave[i].enemy[j].pos[k]-parseInt((stageData.wave[i].enemy[j].pos[k]-1)/3)*3;
			  $('#td'+String(i)+String(column)+String(row)).append('<a href=\"javascript:show_enemy(\''+stageData.title+'\', '+i+', '+j+')\">'+stageData.wave[i].enemy[j].name+'</a>');
			}
		}
    }
	$('.carousel-indicators>li').first().attr("class", "active");
	$('#inner0').attr("class", "item active");

	$("#myCarousel").carousel();
}


function show_enemy(stage, wave, enemy) {
    var popupX = (window.screen.width / 2) - (450 / 2);
    var popupY= (window.screen.height /2) - (400 / 2);
    window.open('enemy.html?stage='+stage+'&wave='+wave+'&enemy='+enemy, "popup_enemy", 'status=no, height=600, width=463, left='+ popupX + ', top='+ popupY + ', screenX='+ popupX + ', screenY= '+ popupY);
}




