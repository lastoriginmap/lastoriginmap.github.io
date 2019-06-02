function areaParse(areaNum)
{
	var areaData;
	$.ajax({
		url: "https://raw.githubusercontent.com/ImpMK/lastorigin_helper/canvas/json/area"+areaNum+".json",
		dataType:'json',
        async: false,
        success: function (data)
        {
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
        },
        error: function (e) {
            alert("error");
        }
    });
	
	return enemyData[0];
}

function getURLParameter(sParam)
{
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++)
	{
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) {return sParameterName[1];}
	}
}

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