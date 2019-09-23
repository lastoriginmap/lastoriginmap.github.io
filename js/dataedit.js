var obj = {};
var enemyIMGData = {};

window.onload = async function() {
	var formArea = document.getElementById("form-area");
	var formStage = document.getElementById("form-stage");
	var formWave = document.getElementById("form-wave");
	var formEnemy = document.getElementById("form-enemy");
	var inputResult = document.getElementById("input-result");
	var formResult = document.getElementById("form-result");
	
	enemyIMGData = await loadEnemyIMGData();
	var nameList = document.getElementById("name-list");
	var enemyNameData = enemyIMGData.map(data=>data.name);
	addDatalist(nameList, enemyNameData);
	
	Array.from(document.querySelectorAll("#form-stage input, #form-wave input, #form-enemy input")).forEach(el=>{
		el.disabled = true;
	});
	
	formArea.addEventListener("submit", async e=>{ e.preventDefault(); await submitArea(); }, false);
	formStage.addEventListener("submit", e=>{ e.preventDefault(); submitStage(); }, false);
	formWave.addEventListener("submit", async e=>{ e.preventDefault(); await submitWave(); }, false);
	formEnemy.addEventListener("submit", async e=>{ e.preventDefault(); await submitEnemy(); }, false);
	formResult.addEventListener("submit", e=>{ setObj(inputResult.value); e.preventDefault(); }, false);
	inputResult.addEventListener("focus", e=>{
		e.preventDefault();
		document.execCommand('copy', false, inputResult.select());
	}, false);
	Array.from(document.querySelectorAll("input:not([type='submit'])")).forEach(el=>{
		el.addEventListener("focus", e=>{
			e.preventDefault();
			el.select();
		}, false);
	});
	document.getElementById("delete").addEventListener("click", e=>{
		e.preventDefault();
		deleteEnemy(obj);
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

async function submitArea(overide=false)
{
	var area = document.getElementById("input-area").value;
	if(!area) { alert("지역을 입력하세요!"); throw "No area";}
	if(!overide&&"area"+area==obj.title) { alert("현재와 같은 지역입니다!"); throw "Same area";}
	document.getElementById("label-stage").textContent = "스테이지: "+area+"-";
	document.getElementById("label-prevstage").textContent = "이전 스테이지: "+area+"-";
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
	Array.from(document.querySelectorAll("#form-stage input[type='number'], #form-wave input:not([type='submit']), #form-enemy input:not([type='submit'])")).forEach(el=>{
		el.value = null;
		el.disabled = true;
	});
	Array.from(document.querySelectorAll("#form-stage input")).forEach(el=>{
		el.disabled = false;
	});
	Array.from(document.getElementsByClassName("current-stage")).forEach(el=>{
		el.textContent = "현재 스테이지: ";
	});
	Array.from(document.getElementsByClassName("current-wave")).forEach(el=>{
		el.textContent = "현재 웨이브: ";
	});
	console.log("Submit area"+area);
	document.getElementById("input-result").value = JSON.stringify(obj, null, 2);
}

function submitStage()
{
	var area = document.getElementById("input-area").value;
	if(!area) { alert("지역을 먼저 입력하세요!"); throw "No area";}
	var stage = document.getElementById("input-stage").value;
	if(!stage) { alert("스테이지를 입력하세요!"); throw "No stage";}
	var prevstage = document.getElementById("input-prevstage").value;
	var type = "";
	var prevtype = "";
	var title = area+"-"+stage;
	var prevtitle = area+"-"+prevstage;
	Array.from(document.getElementsByName("stage-type")).forEach(el=>{
		if(el.checked) { type = el.value }
	});
	if(type!="Main") { title += type }
	Array.from(document.getElementsByName("prevstage-type")).forEach(el=>{
	if(el.checked) { prevtype = el.value }
	});
	if(prevtype!="Main") { prevtitle += prevtype }
	Array.from(document.getElementsByClassName("current-stage")).forEach(el=>{
		el.textContent = "현재 스테이지: "+title;
	});
	
	type = type.toLowerCase()+"stage";
	if(!obj[type]) { obj[type]=[]; }
	if(obj[type].findIndex(el=>el.title==title)==-1)
	{
		index=obj[type].push({})-1;
		obj[type][index]["title"]=title;
		if(prevstage!="") { obj[type][index]["prevstage"]=prevtitle; }
	}
	Array.from(document.querySelectorAll("#form-wave input:not([type='submit']), #form-enemy input:not([type='submit'])")).forEach(el=>{
		el.value = null;
		el.disabled = true;
	});
	Array.from(document.querySelectorAll("#form-wave input")).forEach(el=>{
		el.disabled = false;
	});
	console.log("Submit Stage "+title);
	document.getElementById("input-result").value = JSON.stringify(obj, null, 2);
}

async function submitWave()
{
	var stageTitle = document.getElementsByClassName("current-stage")[0].textContent.slice(9);
	if(!stageTitle) { alert("지역과 스테이지를 먼저 입력하세요!"); throw "No stageTitle";}
	var wave = document.getElementById("input-wave").value;
	if(!wave) { alert("웨이브를 입력하세요!"); throw "No wave";}
	
	Array.from(document.getElementsByName("stage-type")).forEach(el=>{
		if(el.checked) { type = el.value.toLowerCase()+"stage"; }
	});
	if(!obj[type].find(el=>el.title==stageTitle).wave)
	{
		if(wave!=1)
		{
			alert("첫 웨이브는 1부터 시작해야 합니다!");
			throw "Wrong Wave Number";
		}
		obj[type].find(el=>el.title==stageTitle)["wave"]=[{}];
	}
	if(!obj[type].find(el=>el.title==stageTitle).wave[wave-1])
	{
		if(!obj[type].find(el=>el.title==stageTitle).wave[wave-2])
		{
			alert("웨이브의 순서가 잘못되었습니다!");
			throw "Wrong Wave Number";
		}
		obj[type].find(el=>el.title==stageTitle).wave[wave-1]={};
	}
	obj[type].find(el=>el.title==stageTitle).wave[wave-1]["title"] = "wave"+wave;
	console.log("Submit wave"+wave);
	Array.from(document.getElementsByClassName("current-wave")).forEach(el=>{
		el.textContent = "현재 웨이브: "+wave;
	});
	Array.from(document.querySelectorAll("#form-enemy input:not([type='submit'])")).forEach(el=>{
		el.value = null;
	});
	Array.from(document.querySelectorAll("#form-enemy input")).forEach(el=>{
		el.disabled = false;
	});
	document.getElementById("input-result").value = JSON.stringify(obj, null, 2);
	drawStageMap([type, stageTitle, wave]);
}

function submitEnemy()
{
	var objEnemy = {};
	var stageTitle = document.getElementsByClassName("current-stage")[0].textContent.slice(9);
	if(!stageTitle) { alert("지역과 스테이지를 먼저 입력하세요!"); throw "No stageTitle";}
	var wave = document.getElementsByClassName("current-wave")[0].textContent.slice(8);
	if(!wave) { alert("웨이브를 먼저 입력하세요!"); throw "No wave";}
	
	objEnemy['name'] = document.getElementById("input-name").value;
	objEnemy['pos'] = [];
	document.getElementsByName("input-pos").forEach((el, index) => {
		if(el.checked==true)
		{
			objEnemy.pos.push(7-parseInt(index/3)*3+index%3);
		}
	});
	objEnemy['LVL'] = parseInt(document.getElementById("input-LVL").value);
	objEnemy['HP'] = parseInt(document.getElementById("input-HP").value);
	objEnemy['ATK'] = parseInt(document.getElementById("input-ATK").value);
	objEnemy['DEF'] = parseInt(document.getElementById("input-DEF").value);
	objEnemy['AGI'] = parseFloat(document.getElementById("input-AGI").value);
	objEnemy['CRT'] = parseInt(document.getElementById("input-CRT").value);
	objEnemy['HIT'] = parseInt(document.getElementById("input-HIT").value);
	objEnemy['DOD'] = parseFloat(document.getElementById("input-DOD").value);
	objEnemy['skillpower'] = document.getElementById("input-skill").value.split(',').map(el=>parseInt(el));
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
	if(!obj[type].find(el=>el.title==stageTitle).wave[wave-1].enemy)
	{
		obj[type].find(el=>el.title==stageTitle).wave[wave-1].enemy=[];
	}
	var enemypos=obj[type].find(el=>el.title==stageTitle).wave[wave-1].enemy.map(enemyElem=>enemyElem.pos);
	var overlapped=false;
	var overlappedpos=[];
	for(let i=0;i<enemypos.length;i++)
	{
		for(let j=0;j<enemypos[i].length;j++)
		{
			if(objEnemy.pos.findIndex(el=>el==enemypos[i][j])!=-1)
			{
				overlapped=true;
				overlappedpos.push([i,j]);
			}
		}
	}
	if(overlapped)
	{
		var overwrite=confirm("중복된 위치입니다!\n덮어쓰시겠습니까?");
		if(overwrite)
		{
			for(let i=0;i<overlappedpos.length;i++)
			{
				if(obj[type].find(el=>el.title==stageTitle).wave[wave-1].enemy[overlappedpos[i][0]].pos.length==1)
				{
					obj[type].find(el=>el.title==stageTitle).wave[wave-1].enemy.splice(overlappedpos[i][0],1);
				}
				else
				{
					obj[type].find(el=>el.title==stageTitle).wave[wave-1].enemy[overlappedpos[i][0]].pos.splice(overlappedpos[i][1], 1);
				}
			}
		}
		else
		{
			throw "Overlapped pos";
		}
	}
	obj[type].find(el=>el.title==stageTitle).wave[wave-1].enemy.push(objEnemy);
	document.getElementById("input-result").value = JSON.stringify(obj, null, 2);
	
	var newEnemy = obj[type].find(el=>el.title==stageTitle).wave[wave-1].enemy[obj[type].find(el=>el.title==stageTitle).wave[wave-1].enemy.length-1]
	drawStageMap([type, stageTitle, wave]);
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
	var enemypos=obj[type].find(el=>el.title==stageTitle).wave[wave-1].enemy.map(enemyElem=>enemyElem.pos);
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
		for(let i=0;i<overlappedpos.length;i++)
		{
			if(obj[type].find(el=>el.title==stageTitle).wave[wave-1].enemy[overlappedpos[i][0]].pos.length==1)
			{
				obj[type].find(el=>el.title==stageTitle).wave[wave-1].enemy.splice(overlappedpos[i][0],1);
			}
			else
			{
				obj[type].find(el=>el.title==stageTitle).wave[wave-1].enemy[overlappedpos[i][0]].pos.splice(overlappedpos[i][1], 1);
			}
		}
	}
	
	document.getElementById("input-result").value = JSON.stringify(obj, null, 2);
	drawStageMap([type, stageTitle, wave]);
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
	
	
	for(let stype=0; stype<type.length && !isFilled; stype++)
	{
		if(obj[type[stype]])
		{
		for(let sindex=0; sindex<obj[type[stype]].length && !isFilled; sindex++)
		{
			if(obj[type[stype]][obj[type[stype]].length-sindex-1].wave)
			{
			for(let windex=0; windex<obj[type[stype]][sindex].wave.length && !isFilled; windex++)
			{
				if(obj[type[stype]][sindex].wave[windex].enemy)
				{
				for(let eindex=0; eindex<obj[type[stype]][sindex].wave[windex].enemy.length && !isFilled; eindex++)
				{
					let enemyObj = obj[type[stype]][sindex].wave[windex].enemy[eindex];
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
						isFilled = true;
					}
					if(enemyObj.name==name && type[stype]==currentStageType && !isFilled)
					{
						document.getElementById("input-HP").value = null;
						document.getElementById("input-ATK").value = null;
						document.getElementById("input-DEF").value = null;
						document.getElementById("input-AGI").value = enemyObj.AGI;
						document.getElementById("input-CRT").value = enemyObj.CRT;
						document.getElementById("input-HIT").value = enemyObj.HIT;
						document.getElementById("input-DOD").value = enemyObj.DOD;
						document.getElementById("input-skill").value = null;
						isPartialFilled = true;
					}
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
	for(let i=0;i<9;i++)
	{
		$('.current-wave-map > div').html('');
	}
	
	var waveData = obj[param[0]].find(el=>el.title==param[1]).wave[param[2]-1];
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
				var imgName=enemyIMGData.filter(obj => obj.name==waveData.enemy[j].name)[0].img;
				//해당 위치에 적 이름과 사진, 링크 추가
				$('.current-wave-map > div:nth-of-type('+((row-1)*3+column)+')').html('<div class="cell cell'+pos+'"><img src=\"images/profile/'+imgName+'.png\" /><p>'+enemyName+'</p></div>');
				var param2 = param.concat(j);
				$('.cell'+pos).on('click', {param:param2}, e => { loadEnemyStat(e.data.param); });
			}
		}
	}
}

function loadEnemyStat(param)
{
	var enemyStatData = obj[param[0]].find(el=>el.title==param[1]).wave[param[2]-1].enemy[param[3]];
	document.getElementById("input-name").value = enemyStatData.name;
	document.getElementById("input-LVL").value = enemyStatData.LVL;
	document.getElementById("input-HP").value = enemyStatData.HP;
	document.getElementById("input-ATK").value = enemyStatData.ATK;
	document.getElementById("input-DEF").value = enemyStatData.DEF;
	document.getElementById("input-AGI").value = enemyStatData.AGI;
	document.getElementById("input-CRT").value = enemyStatData.CRT;
	document.getElementById("input-HIT").value = enemyStatData.HIT;
	document.getElementById("input-DOD").value = enemyStatData.DOD;
	document.getElementById("input-skill").value = enemyStatData.skillpower;
}