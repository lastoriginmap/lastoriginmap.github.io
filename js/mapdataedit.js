var obj = {};
var enemyData = {};

window.onload = async function() {
	document.getElementById("input-resist").isChanged = false;
	
	var formArea = document.getElementById("form-area");
	var formStage = document.getElementById("form-stage");
	var formWave = document.getElementById("form-wave");
	var formEnemy = document.getElementById("form-enemy");
	var inputResult = document.getElementById("input-result");
	var formResult = document.getElementById("form-result");
	
	enemyData = await loadEnemyDescData();
	var nameList = document.getElementById("name-list");
	var enemyNameData = enemyData.map(data=>data.name);
	addDatalist(nameList, enemyNameData);
	
	Array.from(document.querySelectorAll("#form-stage input, #form-wave input, #form-enemy input")).forEach(el=>{
		el.disabled = true;
	});
	
	formArea.addEventListener("submit", async e=>{ e.preventDefault(); await submitArea(); }, false);
	formStage.addEventListener("submit", e=>{ e.preventDefault(); submitStage(); }, false);
	formWave.addEventListener("submit", async e=>{ e.preventDefault(); await submitWave(); }, false);
	formEnemy.addEventListener("submit", async e=>{ e.preventDefault(); await submitEnemy(); }, false);
	formResult.addEventListener("submit", e=>{ setObj(inputResult.value); e.preventDefault(); }, false);
	Array.from(document.querySelectorAll("input:not([type='submit'])")).forEach(el=>{
		el.addEventListener("focus", e=>{
			e.preventDefault();
			el.select();
		}, false);
	});
	document.getElementById("input-resist").addEventListener("focus", e=>{
		document.getElementById("input-resist").isChanged = true;
		document.getElementById("input-resist").style.color = 'black';
	});
	document.getElementById("input-CRT").addEventListener("focus", e=>{
		document.getElementById("input-CRT").style.color = 'black';
	});
	document.getElementById("delete").addEventListener("click", e=>{
		e.preventDefault();
		var overwrite=confirm("해당 위치의 전투원을 삭제하시겠습니까?");
		if(overwrite)
		{
			deleteEnemy(obj);
		}
	}, false);
	document.getElementById("download").addEventListener("click", e=>{
		e.preventDefault();
		saveFile(obj, "data-area"+document.getElementById("input-area").value+".js");
	}, false);
	document.getElementById("auto-fill").addEventListener("click", e=>{
		e.preventDefault();
		autoFill();
	}, false)
};

//지역 입력
async function submitArea(overide=false)
{
	//area 입력값 읽기
	var area = document.getElementById("input-area").value;
	
	//예외처리
	if(!area) { alert("지역을 입력하세요!"); throw "No area";}
	if(!overide&&"area"+area==obj.title) { alert("현재와 같은 지역입니다!"); throw "Same area";}
	
	//area 입력값 표시
	document.getElementById("label-stage").textContent = "스테이지: "+area+"-";
	document.getElementById("label-prevstage").textContent = "이전 스테이지: "+area+"-";
	
	//데이터 로드 시도,실패시 새로운 데이터 생성
	try
	{
		if(!overide)
		{
			obj = await loadAreaData(area);
		}
	}
	catch
	{
		obj={};
		obj["title"] = "area"+area;
		obj["areatype"] = "grid";
		obj["gridsize"] = [8,3];
	}
	
	//하위 입력칸 초기화, 스테이지 입력칸 활성화
	resetStageInput();
	resetWaveInput();
	resetEnemyInput();
	enableStageInput();
	
	//로그 기록, 데이터 결과 표시
	console.log("Submit area"+area);
	document.getElementById("input-result").value = JSON.stringify(obj, null, 2);
}

//스테이지 입력
function submitStage()
{
	//area 및 stage 입력값 읽기 및 예외처리
	var area = document.getElementById("input-area").value;
	if(!area) { alert("지역을 먼저 입력하세요!"); throw "No area";}
	var stage = document.getElementById("input-stage").value;
	if(!stage) { alert("스테이지를 입력하세요!"); throw "No stage";}
	
	//표시할 이름 및 이전 스테이지 입력값 읽기
	var name = document.getElementById("input-stagename").value;
	var prevstage = document.getElementById("input-prevstage").value;
	
	//스테이지 이름 생성
	var title = area+"-"+stage;
	var prevtitle = area+"-"+prevstage;
	
	//스테이지 타입(Main, B, Ex) 읽기
	var type = "";
	var prevtype = "";
	Array.from(document.getElementsByName("stage-type")).forEach(el=>{
		if(el.checked) { type = el.value }
	});
	Array.from(document.getElementsByName("prevstage-type")).forEach(el=>{
	if(el.checked) { prevtype = el.value }
	});
	if(type!="Main") { title += type }
	if(prevtype!="Main") { prevtitle += prevtype }
	
	//스테이지 입력값 표시
	Array.from(document.getElementsByClassName("current-stage")).forEach(el=>{
		el.textContent = "현재 스테이지: "+title;
	});
	
	//스테이지 프로퍼티가 없으먼 생성
	if(!obj.stage) { obj.stage=[]; }
	
	//현재 데이터 내에 입력할 스테이지가 없으면 새로운 스테이지 생성
	if(obj.stage.findIndex(el=>el.title==title)==-1)
	{
		let index=obj.stage.push({})-1;
		obj.stage[index]["title"]=title;
		if(name) { obj.stage[index]["name"]=name; }
		if(prevstage) { obj.stage[index]["prevstage"]=prevtitle; }
	}
	
	//하위 입력칸 초기화, 웨이브 입력칸 활성화
	resetWaveInput();
	resetEnemyInput();
	enableWaveInput();
	console.log("Submit Stage "+title);
	document.getElementById("input-result").value = JSON.stringify(obj, null, 2);
}

//웨이브 입력
async function submitWave()
{
	var stageTitle = document.getElementsByClassName("current-stage")[0].textContent.slice(9);
	if(!stageTitle) { alert("지역과 스테이지를 먼저 입력하세요!"); throw "No stageTitle";}
	var wave = document.getElementById("input-wave").value;
	if(!wave) { alert("웨이브를 입력하세요!"); throw "No wave";}
	
	if(!obj.stage.find(el=>el.title==stageTitle).wave)
	{
		if(wave!=1)
		{
			alert("첫 웨이브는 1부터 시작해야 합니다!");
			throw "Wrong Wave Number";
		}
		obj.stage.find(el=>el.title==stageTitle)["wave"]=[{}];
	}
	if(!obj.stage.find(el=>el.title==stageTitle).wave[wave-1])
	{
		if(!obj.stage.find(el=>el.title==stageTitle).wave[wave-2])
		{
			alert("웨이브의 순서가 잘못되었습니다!");
			throw "Wrong Wave Number";
		}
		obj.stage.find(el=>el.title==stageTitle).wave[wave-1]={};
	}
	obj.stage.find(el=>el.title==stageTitle).wave[wave-1]["title"] = "wave"+wave;

	Array.from(document.getElementsByClassName("current-wave")).forEach(el=>{
		el.textContent = "현재 웨이브: "+wave;
	});
	
	resetEnemyInput();
	enableEnemyInput();
	console.log("Submit wave"+wave);
	drawStageMap([stageTitle, wave]);
	document.getElementById("input-result").value = JSON.stringify(obj.stage.find(el=>el.title==stageTitle).wave[wave-1], null, 2);
	//document.getElementById("input-result").value = JSON.stringify(obj, null, 2);
}

//적 입력
function submitEnemy()
{
	var objEnemy = {};
	var stageTitle = document.getElementsByClassName("current-stage")[0].textContent.slice(9);
	if(!stageTitle) { alert("지역과 스테이지를 먼저 입력하세요!"); throw "No stageTitle";}
	var wave = document.getElementsByClassName("current-wave")[0].textContent.slice(8);
	if(!wave) { alert("웨이브를 먼저 입력하세요!"); throw "No wave";}
	
	objEnemy['name'] = document.getElementById("input-name").value;
	if(document.getElementById("input-nickname").value) objEnemy['nickname'] = document.getElementById("input-nickname").value;
	objEnemy['pos'] = [];
	document.getElementsByName("input-pos").forEach((el, index) => {
		if(el.checked==true)
		{
			objEnemy.pos.push(7-parseInt(index/3)*3+index%3);
		}
	});
	if(objEnemy.pos.length==0) return alert('위치가 존재하지 않습니다!');
	var enemyDescData = enemyData.find(el=>el.name==objEnemy.name);
	objEnemy['LVL'] = parseInt(document.getElementById("input-LVL").value);
	objEnemy['HP'] = parseInt(document.getElementById("input-HP").value);
	objEnemy['ATK'] = parseInt(document.getElementById("input-ATK").value);
	objEnemy['DEF'] = parseInt(document.getElementById("input-DEF").value);
	objEnemy['AGI'] = parseFloat(document.getElementById("input-AGI").value);
	objEnemy['CRT'] = parseFloat(document.getElementById("input-CRT").value);
	objEnemy['HIT'] = parseInt(document.getElementById("input-HIT").value);
	objEnemy['DOD'] = parseFloat(document.getElementById("input-DOD").value);
	objEnemy['skillpower'] = document.getElementById("input-skill").value.split(',').map(el=>parseInt(el));
	
	var resist = document.getElementById("input-resist");
	if(resist.value && (resist.value!=JSON.stringify(enemyDescData.resist||[]).slice(1,-1) || resist.isChanged))
	{
		objEnemy['resist'] = document.getElementById("input-resist").value.split(',').map(el=>parseInt(el));
	}
	objEnemy['skillLVL'] = [];
	objEnemy.skillpower.forEach((el,index)=>{ objEnemy['skillLVL'][index]=1; });
	
	var checkNull = (object)=>{ 
		var objValue=Object.values(object);
		for(var el of objValue) {
			if(el===null) { return true; }
		}
		return false;
	};
	if(checkNull(objEnemy))
	{
		alert("입력값에 빈칸이 있습니다!");
		throw "error";
	}
	
	Array.from(document.getElementsByName("stage-type")).forEach(el=>{
	if(el.checked) { type = el.value.toLowerCase()+"stage"; }
	});
	if(!obj.stage.find(el=>el.title==stageTitle).wave[wave-1].enemy)
	{
		obj.stage.find(el=>el.title==stageTitle).wave[wave-1].enemy=[];
	}
	var enemy=obj.stage.find(el=>el.title==stageTitle).wave[wave-1].enemy;
	
	//중복 위치가 존재하는지 확인
	//중복위치가 있으면 기존 데이터에서 해당 위치를 삭제하고 새로 추가할 데이터로 덮어씌움
	//enemypos: 해당 웨이브에 철충이 이미 존재하는 위치 배열 
	//overlappedpos: 중복되는 위치 배열
	var enemypos=enemy.map(enemyElem=>enemyElem.pos).flat();
	var overlappedpos=enemypos.filter(pos => objEnemy.pos.includes(pos));
	
	//중복 위치가 존재하면
	if(overlappedpos.length!=0)
	{
		//덮어쓸지 확인
		var overwrite=confirm("중복된 위치입니다!\n덮어쓰시겠습니까?");
		if(overwrite)
		{
			//각 중복위치 overlappedpos[i]마다
			for(let i=0;i<overlappedpos.length;i++)
			{
				//웨이브 내 모든 enemy마다 enemy.pos에 overlappedpos[i]가 있는지 확인하고
				enemy.forEach(el => {
					for(let j=el.pos.length;j>=0;j--)
					{
						//overlappedpos[i]와 중복되는 enemy.pos 내 요소를 삭제
						if(el.pos[j]==overlappedpos[i])
						{
							el.pos.splice(j,1);
						}
					}
				});
			}
			//위치가 전부 삭제된 적 삭제
			for(let i=enemy.length-1;i>=0;i--)
			{
				if(enemy[i].pos.length==0)
					enemy.splice(i,1);
			}
		}
		else
		{
			throw "Overlapped pos";
		}
	}
	enemy.push(objEnemy);
	document.getElementById("input-result").value = JSON.stringify(obj.stage.find(el=>el.title==stageTitle).wave[wave-1], null, 2);
	//document.getElementById("input-result").value = JSON.stringify(obj, null, 2);
	
	//var newEnemy = enemy[enemy.length-1]
	
	resetEnemyInput();
	enableEnemyInput();
	drawStageMap([stageTitle, wave]);
	
	document.getElementById("input-resist").isChanged = false;
}

function deleteEnemy(obj)
{
	var stageTitle = document.getElementsByClassName("current-stage")[0].textContent.slice(9);
	if(!stageTitle) { alert("지역과 스테이지를 먼저 입력하세요!"); throw "No stageTitle";}
	var wave = document.getElementsByClassName("current-wave")[0].textContent.slice(8);
	if(!wave) { alert("웨이브를 먼저 입력하세요!"); throw "No wave";}
	Array.from(document.getElementsByName("stage-type")).forEach(el=>{
		if(el.checked) { type = el.value.toLowerCase()+"stage"; }
	});
	deletePos = [];
	document.getElementsByName("input-pos").forEach((el, index) => {
		if(el.checked==true)
		{
			deletePos.push(7-parseInt(index/3)*3+index%3);
		}
	});
	var enemypos=obj.stage.find(el=>el.title==stageTitle).wave[wave-1].enemy.map(enemyElem=>enemyElem.pos);
	var overlapped=false;
	var overlappedpos=[];
	for(let i=0;i<enemypos.length;i++)
	{
		for(let j=0;j<enemypos[i].length;j++)
		{
			if(deletePos.findIndex(el=>el==enemypos[i][j])!=-1)
			{
				overlapped=true;
				overlappedpos.push([i,j]);
			}
		}
	}
	
	if(overlapped)
	{
		for(let i=overlappedpos.length-1;i>=0;i--)
		{
			if(obj.stage.find(el=>el.title==stageTitle).wave[wave-1].enemy[overlappedpos[i][0]].pos.length==1)
			{
				obj.stage.find(el=>el.title==stageTitle).wave[wave-1].enemy.splice(overlappedpos[i][0],1);
			}
			else
			{
				obj.stage.find(el=>el.title==stageTitle).wave[wave-1].enemy[overlappedpos[i][0]].pos.splice(overlappedpos[i][1], 1);
			}
		}
	}
	
	document.getElementById("input-result").value = JSON.stringify(obj, null, 2);
	
	resetEnemyInput();
	enableEnemyInput();
	drawStageMap([stageTitle, wave]);
	
	Array.from(document.getElementsByName("input-pos")).forEach(el=>{
		el.checked = false;
	});
}

function setObj(str)
{
	try
	{
		obj = JSON.parse(str);
		document.getElementById("error-message").textContent = "";
		
		document.getElementById("input-area").value = obj.title.slice(4);
		var stage = document.getElementById("input-stage").value;
		var prevstage = document.getElementById("input-prevstage").value;
		var type = "";
		var prevtype = "";
		Array.from(document.getElementsByName("stage-type")).forEach(el=>{
			if(el.checked) { type = el.value }
		});
		Array.from(document.getElementsByName("prevstage-type")).forEach(el=>{
			if(el.checked) { prevtype = el.value }
		});
		var wave = document.getElementById("input-wave").value;
		
		submitArea(true);
		
		document.getElementById("input-stage").value = stage;
		document.getElementById("input-prevstage").value = prevstage;
		Array.from(document.getElementsByName("stage-type")).forEach(el=>{
			if(el.value==type) { el.checked=true; }
			else { el.checked=false; }
		});
		Array.from(document.getElementsByName("prevstage-type")).forEach(el=>{
			if(el.value==prevtype) { el.checked=true; }
			else { el.checked=false; }
		});
		submitStage();
		
		document.getElementById("input-wave").value = wave;
		submitWave();
	}
	catch(e)
	{
		document.getElementById("error-message").textContent = "Invalid JSON!";
		console.log(e);
	}
}

function addDatalist(element, arr)
{
	arr.forEach(el=>{
		var newOption = document.createElement("option");
		newOption.value = el;
		element.appendChild(newOption);
	});
}

function saveFile(data, fileName)
{
	var a = document.getElementById("download-dummy");
	var json = "var areaData = "+JSON.stringify(data, null, 2)+";";
	var blob = new Blob([json], {type: "octet/stream"});
	var url = window.URL.createObjectURL(blob);
	a.href = url;
	a.download = fileName;
	a.click();
	window.URL.revokeObjectURL(url);
}

function autoFill()
{
	var type = ["mainstage", "bstage", "exstage"];
	var isFilled = false;
	var isPartialFilled = false;
	var name = document.getElementById("input-name").value;
	var LVL = parseInt(document.getElementById("input-LVL").value);
	var currentStageType = "";
	
	Array.from(document.getElementsByName("stage-type")).forEach(el=>{
		if(el.checked) { currentStageType = el.value.toLowerCase()+"stage"; }
	});
			
	if(obj.stage)
	{
		for(let sindex=obj.stage.length-1; sindex>=0 && !isFilled; sindex--)
		{
			if(obj.stage[sindex].wave)
			{
			for(let windex=obj.stage[sindex].wave.length-1; windex>=0 && !isFilled; windex--)
			{
				if(obj.stage[sindex].wave[windex].enemy)
				{
				for(let eindex=0; eindex<obj.stage[sindex].wave[windex].enemy.length && !isFilled; eindex++)
				{
					let enemyObj = obj.stage[sindex].wave[windex].enemy[eindex];
					let enemyDescData = enemyData.find(el=>el.name==name)
					if(enemyObj.name==name && enemyObj.LVL==LVL)
					{
						document.getElementById("input-HP").value = enemyObj.HP;
						document.getElementById("input-ATK").value = enemyObj.ATK;
						document.getElementById("input-DEF").value = enemyObj.DEF;
						document.getElementById("input-AGI").value = enemyObj.AGI;
						document.getElementById("input-CRT").value = enemyObj.CRT;
						document.getElementById("input-HIT").value = enemyObj.HIT;
						document.getElementById("input-DOD").value = enemyObj.DOD;
						document.getElementById("input-skill").value = enemyObj.skillpower;
						if('resist' in enemyObj)
						{
							document.getElementById("input-resist").value = enemyObj.resist;
							document.getElementById("input-resist").style.color = 'black';
						}
						else if('resist' in enemyDescData)
						{
							document.getElementById("input-resist").value = enemyDescData.resist;
							document.getElementById("input-resist").style.color = '#b0b0b0';
						}
						else
						{
							document.getElementById("input-resist").value = null;
							document.getElementById("input-resist").style.color = 'black';
						}
						isFilled = true;
					}
					else if(enemyObj.name==name && !isPartialFilled)
					{
						document.getElementById("input-HP").value = null;
						document.getElementById("input-ATK").value = null;
						document.getElementById("input-DEF").value = null;
						document.getElementById("input-AGI").value = enemyObj.AGI;
						document.getElementById("input-CRT").value = enemyObj.CRT;
						document.getElementById("input-HIT").value = enemyObj.HIT;
						document.getElementById("input-DOD").value = enemyObj.DOD;
						document.getElementById("input-skill").value = null;
						document.getElementById("input-resist").value = enemyObj.resist || null;
						document.getElementById("input-resist").style.color = 'black';
						isPartialFilled = true;
					}
					else
					{
						
						document.getElementById("input-HP").value = null;
						document.getElementById("input-ATK").value = null;
						document.getElementById("input-DEF").value = null;
						document.getElementById("input-AGI").value = null;
						document.getElementById("input-HIT").value = null;
						document.getElementById("input-DOD").value = null;
						document.getElementById("input-skill").value = null;
						document.getElementById("input-CRT").value = enemyDescData.CRT || null;
						document.getElementById("input-resist").value = enemyDescData.resist || null;
						document.getElementById("input-resist").style.color = '#b0b0b0';
					}
				}
				}
			}
			}
		}
	}
	if(isFilled)
	{
		alert("불러오기 완료!");
	}
	else if(isPartialFilled)
	{
		alert("일부 불러오기 완료!");
	}
	else
	{
		alert("데이터 없음");
	}
}

function drawStageMap(param)
{
	//지도 초기화
	$('.current-wave-map > div').html('');
	
	//매개변수가 없을 경우 종료
	if(!param) return 0;
	
	var waveData = obj.stage.find(el=>el.title==param[0]).wave[param[1]-1];
	if(waveData.enemy)
	{
		for(let j=0;j<waveData.enemy.length;j++)
		{
			//같은 종류의 철충이 여러 위치에 있으면 전부 그림
			for(let k=0;k<waveData.enemy[j].pos.length;k++)
			{
				//현재 철충 위치
				var pos = waveData.enemy[j].pos[k];
				//PC 키패드 숫자로 표시된 위치를 핸드폰 숫자 위치로 변환
				var row=3-parseInt((pos-1)/3);
					var column=pos-parseInt((pos-1)/3)*3;
		
				//적 이름
				if(waveData.enemy[j].nickname)
				{
					var enemyName=waveData.enemy[j].nickname;
				}
				else
				{
					var enemyName=waveData.enemy[j].name;
				}
				//이름에 해당되는 이미지 찾기
				var imgName=enemyData.filter(obj => obj.name==waveData.enemy[j].name)[0].img;
				//해당 위치에 적 이름과 사진, 링크 추가
				$('.current-wave-map > div:nth-of-type('+((row-1)*3+column)+')').html('<div class="cell cell'+pos+'"><img src=\"images/profile/'+imgName+'.png\" /><p>'+enemyName+'</p></div>');
				var param2 = param.concat(j);
				$('.cell'+pos).on('click', {param:param2}, e => { loadEnemyStat(e.data.param); });
			}
		}
	}
}

//지도에서 적 선택시 스탯 입력칸 채우기
function loadEnemyStat([stageTitle, wave, enemy])
{
	var enemyStatData = obj.stage.find(el=>el.title==stageTitle).wave[wave-1].enemy[enemy];
	var enemyDescData = enemyData.find(el=>el.name==enemyStatData.name);
	document.getElementById("input-name").value = enemyStatData.name;
	document.getElementById("input-nickname").value = enemyStatData.nickname || null;
	document.getElementById("input-LVL").value = enemyStatData.LVL;
	document.getElementById("input-HP").value = enemyStatData.HP;
	document.getElementById("input-ATK").value = enemyStatData.ATK;
	document.getElementById("input-DEF").value = enemyStatData.DEF;
	document.getElementById("input-AGI").value = enemyStatData.AGI;
	if(enemyStatData.CRT==-1 && enemyDescData.CRT)
	{
		document.getElementById("input-CRT").value = enemyDescData.CRT;
		document.getElementById("input-CRT").style.color = 'blue';
	}
	else
	{
		document.getElementById("input-CRT").value = enemyStatData.CRT;
		document.getElementById("input-CRT").style.color = 'black';
	}
	document.getElementById("input-HIT").value = enemyStatData.HIT;
	document.getElementById("input-DOD").value = enemyStatData.DOD;
	document.getElementById("input-skill").value = enemyStatData.skillpower;
	if('resist' in enemyStatData)
	{
		document.getElementById("input-resist").value = enemyStatData.resist;
		document.getElementById("input-resist").style.color = 'black';
		}
	else if('resist' in enemyDescData)
	{
		document.getElementById("input-resist").value = enemyDescData.resist;
		document.getElementById("input-resist").style.color = '#b0b0b0';
	}
	else
	{
		document.getElementById("input-resist").value = null;
		document.getElementById("input-resist").style.color = 'black';
	}
	Array.from(document.getElementsByName("input-pos")).forEach(el=>{
		el.checked = false;
	});
	enemyStatData.pos.forEach(el=>{
		document.getElementById("pos"+el).checked=true;
	});
}

//스테이지 입력칸 비우고 비활성화
function resetStageInput()
{
	Array.from(document.querySelectorAll("#form-stage input[type='text'], #form-stage input[type='number']")).forEach(el=>{
		el.value = null;
		el.disabled = true;
	});
	Array.from(document.getElementsByClassName("current-stage")).forEach(el=>{
	el.textContent = "현재 스테이지: ";
	});
}

//스테이지 입력칸 활성화
function enableStageInput()
{
	Array.from(document.querySelectorAll("#form-stage input")).forEach(el=>{
		el.disabled = false;
	});
}

//웨이브 입력칸 비우고 비활성화
function resetWaveInput()
{
	Array.from(document.querySelectorAll("#input-wave")).forEach(el=>{
		el.value = null;
		el.disabled = true;
	});
	Array.from(document.getElementsByClassName("current-wave")).forEach(el=>{
		el.textContent = "현재 웨이브: ";
	});
}

//웨이브 입력칸 활성화
function enableWaveInput()
{
	Array.from(document.querySelectorAll("#form-wave input")).forEach(el=>{
		el.disabled = false;
	});
}

//적 입력칸 비우고 비활성화
function resetEnemyInput()
{
	Array.from(document.querySelectorAll("#form-enemy input[type='text'], #form-enemy input[type='number']")).forEach(el=>{
		el.value = null;
		el.disabled = true;
	});
	Array.from(document.getElementsByName("input-pos")).forEach(el=>{
		el.checked = false;
		el.disabled = true;
	});
	drawStageMap();
}

//적 입력칸 활성화
function enableEnemyInput()
{
	Array.from(document.getElementsByName("input-pos")).forEach(el=>{
		el.checked = false;
	});
	Array.from(document.querySelectorAll("#form-enemy input")).forEach(el=>{
		el.disabled = false;
	});
}