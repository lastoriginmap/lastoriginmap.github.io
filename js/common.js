<<<<<<< HEAD
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
=======
function areaParse(areaNum)
{
	var areaData;
	$.ajax({
		url: "https://raw.githubusercontent.com/ImpMK/lastorigin_helper/canvas/json/area"+areaNum+".json",
>>>>>>> canvas
		dataType:'json',
        async: false,
        success: function (data)
        {
<<<<<<< HEAD
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
=======
          areaData=data;
        },
        error: function (e) {
            alert("error");
        }
    });
    return areaData;
}

function stageParse(stageTitle)
{
	var stageData;
	var areaNum=getAreaByStageTitle(stageTitle);
	$.ajax({
		url: "https://raw.githubusercontent.com/ImpMK/lastorigin_helper/canvas/json/area"+areaNum+".json",
		dataType:'json',
        async: false,
        success: function(data)
        {
        	var stageType=["b", "main", "ex"];
        	var stageTypeTitle=["B", "", "Ex"];
        	stageTypeTitle.forEach(function(element, index) {
				if(getTypeByStageTitle(stageTitle)==element)
				{
					stageData=data[stageType[index]+"stage"].filter(function(data){ return data.title==stageTitle; })[0];
				}
			});
        },
        error: function (e) {
            alert("error");
        }
    });
	
	return stageData;
}

function enemyParse(enemyName)
{
	var enemyData;
	$.ajax({
		url: "https://raw.githubusercontent.com/ImpMK/lastorigin_helper/canvas/json/enemy.json",
		dataType:'json',
        async: false,
        success: function (data)
        {
            enemyData=data.filter(function(data){ return data.name==enemyName; });
>>>>>>> canvas
        },
        error: function (e) {
            alert("error");
        }
    });
	
	return enemyData[0];
}

<<<<<<< HEAD
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
=======
function getURLParameter(sParam)
>>>>>>> canvas
{
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++)
	{
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) {return sParameterName[1];}
	}
}

<<<<<<< HEAD



=======
function getAreaByStageTitle(str)
{
	var regex=/^[0-9a-zA-Z]+/;
	return str.match(regex)[0];
}

function getIndexByStageTitle(str)
{
	var regex=/-[0-9]+/;
	return Number(str.match(regex)[0].slice(1));
}

function getTypeByStageTitle(str)
{
	var regex=/[a-zA-Z]*$/;
	return str.match(regex)[0];
}

function getEnemyIMG(name)
{
	var enemyData=enemyParse(name);
	return enemyData.img;
}
>>>>>>> canvas
