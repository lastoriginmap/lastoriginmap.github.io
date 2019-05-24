function AreaParse(areanum)
{
	var areadata;
	$.ajax({
		url: "https://raw.githubusercontent.com/ImpMK/lastorigin_helper/master/json/area"+areanum+".json",
		dataType:'json',
        async: false,
        success: function (data)
        {
          areadata=data;
        },
        error: function (e) {
            alert("error");
        }
    });
    return areadata;
}

function StageParse(stage_name)
{
	var stagedata;
	var areanum=Number(stage_name.split('-')[0]);
	var stagecode=stage_name.split('-')[1];
	$.ajax({
		url: "https://raw.githubusercontent.com/ImpMK/lastorigin_helper/master/json/area"+areanum+".json",
		dataType:'json',
        async: false,
        success: function (data)
        {
			if(stagecode.endsWith('B'))
			{
				var stagenum=Number(stagecode.slice(0,-1));
				stagedata=data.bstage[stagenum-1];
			}
			else if(stagecode.endsWith('Ex'))
			{
				var stagenum=Number(stagecode.slice(0,-2));
				stagedata=data.exstage[stagenum-1];
			}
			else
			{
				var stagenum=Number(stagecode);
				stagedata=data.mainstage[stagenum-1];
			}
        },
        error: function (e) {
            alert("error");
        }
    });
	
	return stagedata;
}

function EnemyParse(enemy_name)
{
	var enemydata;
	$.ajax({
		url: "https://raw.githubusercontent.com/ImpMK/lastorigin_helper/master/json/enemy.json",
		dataType:'json',
        async: false,
        success: function (data)
        {
            enemydata=data.filter(function(data){ return data.name==enemy_name; });
        },
        error: function (e) {
            alert("error");
        }
    });
	
	return enemydata[0];
}

function GetURLParameter(sParam)
{
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++)
	{
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) {return sParameterName[1];}
	}
}




