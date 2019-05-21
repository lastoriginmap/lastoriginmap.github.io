window.onload = function(){
    var stage_name = GetURLParameter('stage_name');
	document.title = stage_name;
	
	var stagedata=StageParse(stage_name);	
	DrawPage(stagedata);
}

function DrawPage(stagedata)
{
	$('#stage_name').html(stagedata.title);
		
    for(var i = 0; i < stagedata.wave.length; i++)
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
		
		for(var j=0;j<stagedata.wave[i].enemy.length;j++)
		{
			for(var k=0;k<stagedata.wave[i].enemy[j].pos.length;k++)
			{
				$('#td'+String(i)+String(stagedata.wave[i].enemy[j].pos[k][0])+String(stagedata.wave[i].enemy[j].pos[k][1])).append('<a href=\"javascript:show_enemy(\''+stagedata.title+'\', '+i+', '+j+')\">'+stagedata.wave[i].enemy[j].name+'</a>');
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
    window.open('enemytmp.html?stage='+stage+'&wave='+wave+'&enemy='+enemy, "popup_enemy", 'status=no, height=600, width=463, left='+ popupX + ', top='+ popupY + ', screenX='+ popupX + ', screenY= '+ popupY);
}