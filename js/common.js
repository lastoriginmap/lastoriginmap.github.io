function loadData(src)
{
	return new Promise(resolve => {
		var script = document.createElement('script');
		script.type = "text/javascript";
		script.src = src;
		script.addEventListener('load', () => { resolve(); }, false);
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(script, s);
	});
}

async function loadAreaData(areaNum)
{
	return new Promise(resolve=> {
		var src="./data/data-area"+areaNum+".js";
		loadData(src).then(()=> {
			resolve(areaData);
		});
	});
}

async function loadStageData(stageTitle)
{
	return new Promise(resolve=> {
		var src="./data/data-area"+getAreaByStageTitle(stageTitle)+".js";
		loadData(src).then(()=> {
			var areaNum=getAreaByStageTitle(stageTitle);
			var stageType=["b", "main", "ex"];
			var stageTypeTitle=["B", "", "Ex"];
			var stageTypeIndex=stageTypeTitle.indexOf(getTypeByStageTitle(stageTitle));
			var stageListData=areaData[stageType[stageTypeIndex]+"stage"];
			var stageData= stageListData.filter(sData => sData.title==stageTitle)[0];
			var stageList=stageListData.map(sData => getIndexByStageTitle(sData.title));
			
			resolve({"stageData": stageData, "stageList": stageList});
		});

	});
}

function loadEnemyData(enemyName)
{
	return new Promise(resolve=> {
		var src="./data/data-enemy.js";
		loadData(src).then(()=> {
			var enemyData=enemyDataArr.filter(data => data.name==enemyName)[0];
			resolve(enemyData);
		});
	});
}

async function loadEnemyIMGData()
{
	return new Promise(resolve=> {
		var src="./data/data-enemy.js";
		loadData(src).then(()=> {
			var enemyIMGData=enemyDataArr.map(data => {return {"name": data.name, "img": data.img}; });
			resolve(enemyIMGData);
		});
	});
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