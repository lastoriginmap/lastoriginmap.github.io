//공통 데이터 로드 함수
function loadData(src)
{
	//<script> 요소를 추가해 데이터 파일 로드
	//로드가 완료되면 다음 작업을 진행하도록 Promise 적용
	return new Promise((resolve, reject) => {
		var script = document.createElement('script');
		script.type = "text/javascript";
		script.src = src;
		script.addEventListener('load', () => { resolve(); }, false);
		script.addEventListener('error', () => { reject(); }, false);
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(script, s);
	});
}

//지역 데이터 로드 함수
async function loadAreaData(areaNum)
{
	return new Promise((resolve, reject)=> {
		//src를 지역 데이터 파일 주소로 설정해 데이터 파일을 로드하고 areaData 오브젝트 리턴
		var src="./data/data-area"+areaNum+".js";
		loadData(src).then(()=>resolve(areaData), ()=>reject());
	});
}

//스테이지 데이터 로드 함수
async function loadStageData(stageTitle)
{
	return new Promise(resolve=> {
		//src를 지역 데이터 파일로 설정해 로드
		var src="./data/data-area"+getAreaByStageTitle(stageTitle)+".js";
		loadData(src).then(()=> {
			var stageData=areaData.stage.find(sData => sData.title==stageTitle);
			var type=getTypeByStageTitle(stageTitle)
			var stageList=areaData.stage.reduce((acc, sData) => {
				if(getTypeByStageTitle(sData.title)==type) acc.push(getIndexByStageTitle(sData.title))
				return acc;
			}, []);
			resolve({"stageData": stageData, "stageList": stageList});
		});

	});
}

function loadEnemyDataArr()
{
	return new Promise(resolve=> {
		var src="./data/data-enemy.js";
		loadData(src).then(()=> {
			resolve(enemyDataArr);
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
			/*
			var enemyIMGData=enemyDataArr.map(data => { 
				if(data.skills[0].AP!=undefined) { 
					return {"name": data.name, "img": data.img}; 
				}
				else { 
					return {"name": data.name, "img": ""}; 
				}
			});
			*/
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