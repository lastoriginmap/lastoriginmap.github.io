//파일명 설정
var setting = '.min';
//var setting = '';

//공통 데이터 로드 함수
function loadData(src)
{
	//XMLHttpRequest를 사용해 데이터 파일 로드
	//로드가 완료되면 다음 작업을 진행하도록 Promise 적용
	return new Promise((resolve, reject) =>
	{
		var request = new XMLHttpRequest();
		request.open('GET', src);
		request.responseType = 'json';
		request.onload = function ()
		{
			if (request.status === 200)
			{
				resolve(request.response);
			}
			else
			{
				reject();
			}
		};
		request.onerror = function ()
		{
			reject();
		}
		request.send();
	});
}

//지역 데이터 로드 함수
function loadAreaData(areaNum)
{
	return new Promise((resolve, reject) =>
	{
		//src를 지역 데이터 파일 주소로 설정해 데이터 파일을 로드하고 areaData 오브젝트 리턴
		var src = "data/data-area" + areaNum + setting + ".json";
		loadData(src).then((areaData) => resolve(areaData)).catch((e) => reject(e));
	});
}

//스테이지 데이터 로드 함수
function loadStageData(stageTitle)
{
	return new Promise(resolve =>
	{
		//src를 지역 데이터 파일로 설정해 로드
		var src = "./data/data-area" + getAreaByStageTitle(stageTitle) + setting + ".json";
		loadData(src).then((areaData) =>
		{
			var stageData = areaData.stage.find(sData => sData.title == stageTitle);

			var stageList = [null,null];
			var gridList = areaData.stage.reduce((acc, sData) => {
				if (sData.grid[1] == stageData.grid[1]) acc.push(sData.title)
				return acc;
			}, []);
			
			if ("prevstage" in stageData)
			{
				var prevstageData = areaData.stage.find(sData => sData.title == stageData.prevstage);
				if (getTypeByStageTitle(stageData.name || stageData.title) == getTypeByStageTitle(prevstageData.name || prevstageData.title))
				{
					stageList[0] = prevstageData.title;
				}
			}
			if(stageList[0] === null && gridList.indexOf(stageTitle) > 0)
			{
					stageList[0] = gridList[gridList.indexOf(stageTitle) - 1];
			}

			var nextstageDataList = areaData.stage.filter(sData => sData.prevstage == stageTitle);
			if (nextstageDataList.length>0)
			{
				stageList[1] = nextstageDataList.find(sData => getTypeByStageTitle(stageData.name || stageData.title) == getTypeByStageTitle(sData.name || sData.title)).title || null;
			}
			if(stageList[1] === null && gridList.indexOf(stageTitle) < gridList.length-1)
			{
					stageList[1] = gridList[gridList.indexOf(stageTitle) + 1];
			}
			resolve({ "stageData": stageData, "stageList": stageList });
		});
	});
}

//웨이브 데이터 로드 함수
function loadgroupData(stageTitle)
{
	return new Promise(resolve =>
	{
		//src를 지역 데이터 파일로 설정해 로드
		var src = "./data/data-group" + getAreaByStageTitle(stageTitle) + setting + ".json";
		loadData(src).then((groupData) =>
		{
			resolve(groupData.wavegroup);
		});

	});
}

function loadEnemyDataList()
{
	return new Promise(resolve =>
	{
		var src = "./data/data-enemy" + setting + ".json";
		loadData(src).then((enemyDataList) =>
		{
			resolve(enemyDataList);
		});
	});
}

function loadEnemyData(enemyIndex)
{
	return new Promise(resolve =>
	{
		var src = "./data/data-enemy" + setting + ".json";
		loadData(src).then((enemyDataList) =>
		{
			var enemyData = enemyDataList[enemyIndex];
			resolve(enemyData);
		});
	});
}

/*
function loadEnemyIMGData()
{
	return new Promise(resolve=> {
		var src="./data/data-enemy"+setting+".json";
		loadData(src).then(()=> {
			var enemyIMGData={};
			for (var key in enemyDataList)
			{
				if (enemyDataList.hasOwnProperty(key))
				{
					enemyIMGData[key] = enemyDataList[key].img;
				}
			}
			//var enemyIMGData=enemyDataList.map(data => {return {"name": data.name, "img": data.img}; });
			//resolve(enemyIMGData);
			resolve(enemyIMGData);
		});
	});
}

function loadEnemyDescData()
{
	return new Promise(resolve=> {
		var src="./data/data-enemy"+setting+".json";
		loadData(src).then(()=> {
			var enemyDescData=enemyDataList.map(data => {
				var rtn = {"name": data.name, "img": data.img};
				if('resist' in data) rtn["resist"] = data.resist;
				if('CRT' in data) rtn["CRT"] = data.CRT;
				return rtn;
			});
			resolve(enemyDescData);
		});
	});
}
*/

function loadSkillDataList()
{
	return new Promise(resolve =>
	{
		var src = "./data/data-skill" + setting + ".json";
		loadData(src).then((enemySkillList) =>
		{
			resolve(enemySkillList);
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
		if (sParameterName[0] == sParam) { return sParameterName[1]; }
	}
}

function getAreaByStageTitle(str)
{
	var regex = /^[0-9a-zA-Z]+/;
	return str.match(regex)[0];
}

function getIndexByStageTitle(str)
{
	var regex = /-[0-9]+/;
	return Number(str.match(regex)[0].slice(1));
}

function getTypeByStageTitle(str)
{
	var regex = /[a-zA-Z]*$/;
	return str.match(regex)[0];
}

function getIndexByStageGrid(grid)
{
	var regex = /-[0-9]+/;
	return grid[0];
}

function getTypeByStageGrid(grid)
{
	var stageTypeTitle = ["B", "", "Ex"];
	return stageTypeTitle[grid[1]];
}