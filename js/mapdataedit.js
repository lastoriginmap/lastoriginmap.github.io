var obj = {};
var enemyData = {};
var latestenemy = [[], [], []];

window.onload = async function ()
{
	var formArea = document.getElementById("form-area");
	var formStage = document.getElementById("form-stage");
	var formWave = document.getElementById("form-wave");
	var formEnemy = document.getElementById("form-enemy");
	var inputResult = document.getElementById("input-result");
	var formResult = document.getElementById("form-result");

	enemyData = await loadEnemyDataList();
	var nameList = document.getElementById("name-list");
	var enemyNameData = new Set(Object.values(enemyData).map(data => data.name));
	addDatalist(nameList, enemyNameData);

	Array.from(document.querySelectorAll("#form-stage input, #form-wave input, #form-enemy input")).forEach(el =>
	{
		el.disabled = true;
	});

	document.getElementById("reload-data").addEventListener("click", async e =>
	{
		e.preventDefault();
		//reloadData();
		enemyData = await loadEnemyDataList();
		var nameList = document.getElementById("name-list");
		var enemyNameData = new Set(Object.values(enemyData).map(data => data.name));
		addDatalist(nameList, enemyNameData);
	}, false);
	formArea.addEventListener("submit", async e => { e.preventDefault(); await submitArea(); }, false);
	formStage.addEventListener("submit", e => { e.preventDefault(); submitStage(); }, false);
	formWave.addEventListener("submit", async e => { e.preventDefault(); await submitWave(); }, false);
	formEnemy.addEventListener("submit", async e => { e.preventDefault(); await submitEnemy(); }, false);
	formResult.addEventListener("submit", e => { setObj(inputResult.value); e.preventDefault(); }, false);
	Array.from(document.querySelectorAll("input:not([type='submit'])")).forEach(el =>
	{
		el.addEventListener("focus", e =>
		{
			e.preventDefault();
			el.select();
		}, false);
	});
	document.getElementById("submit-name").addEventListener("click", e =>
	{
		e.preventDefault();
		submitEnemyName();
	}, false);
	document.getElementById("delete").addEventListener("click", e =>
	{
		e.preventDefault();
		var overwrite = confirm("해당 위치의 전투원을 삭제하시겠습니까?");
		if (overwrite)
		{
			deleteEnemy(obj);
		}
	}, false);
	document.getElementById("download").addEventListener("click", e =>
	{
		e.preventDefault();
		saveFile(obj, "data-area" + document.getElementById("input-areaindex").value + ".json");
	}, false);
};

//지역 입력
async function submitArea(overide = false)
{
	//area 입력값 읽기
	var areaindex = document.getElementById("input-areaindex").value;
	var areatitle = document.getElementById("input-areatitle").value;

	//예외처리
	if (!areaindex) { alert("지역을 입력하세요!"); throw "No area"; }
	if (!overide && areaindex == obj.title) { alert("현재와 같은 지역입니다!"); throw "Same area"; }

	//area 입력값 표시
	document.getElementById("label-stage").textContent = "스테이지: " + areaindex + "-";
	document.getElementById("label-prevstage").textContent = "이전 스테이지: " + areaindex + "-";

	//데이터 로드 시도,실패시 새로운 데이터 생성
	try
	{
		if (!overide)
		{
			obj = await loadAreaData(areaindex);
			if (!areatitle) { document.getElementById("input-areatitle").value = obj.title; }
			else { obj.title = areatitle; }
			console.log("Load area" + areaindex);
		}
	}
	catch (e)
	{
		obj = {};
		if (!areatitle)
		{
			document.getElementById("input-areatitle").value = areaindex;
			obj["title"] = areaindex;
		}
		else obj["title"] = areatitle;
		obj["areatype"] = "grid";
		obj["gridsize"] = [8, 3];

		console.log("Submit area" + areaindex);
	}

	//하위 입력칸 초기화, 스테이지 입력칸 활성화
	resetStageInput();
	resetWaveInput();
	resetEnemyInput();
	enableStageInput();

	//로그 기록, 데이터 결과 표시
	document.getElementById("input-result").value = JSON.stringify(obj, null, 2);
}

//스테이지 입력
function submitStage()
{
	//area 및 stage 입력값 읽기 및 예외처리
	var areaindex = document.getElementById("input-areaindex").value;
	if (!areaindex) { alert("지역을 먼저 입력하세요!"); throw "No area"; }
	var stage = document.getElementById("input-stage").value;
	if (!stage) { alert("스테이지를 입력하세요!"); throw "No stage"; }

	//표시할 이름, 그리드 위치 및 이전 스테이지 입력값 읽기
	var name = document.getElementById("input-stagename").value;
	var grid = ["x", "y"].map(id => parseInt(document.getElementById("input-stagegrid" + id).value));
	var prevstage = document.getElementById("input-prevstage").value;

	//스테이지 이름 생성
	var title = areaindex + "-" + stage;
	var prevtitle = areaindex + "-" + prevstage;

	//스테이지 타입(Main, B, Ex) 읽기
	var type = "";
	var prevtype = "";
	Array.from(document.getElementsByName("stage-type")).forEach(el =>
	{
		if (el.checked) { type = el.value }
	});
	Array.from(document.getElementsByName("prevstage-type")).forEach(el =>
	{
		if (el.checked) { prevtype = el.value }
	});
	if (type != "Main") { title += type }
	if (prevtype != "Main") { prevtitle += prevtype }

	//스테이지 프로퍼티가 없으먼 생성
	if (!obj.stage) { obj.stage = []; }

	//현재 데이터 내에 입력할 스테이지가 없으면 새로운 스테이지 생성
	if (obj.stage.findIndex(el => el.title == title) == -1)
	{
		let index = obj.stage.push({}) - 1;
		obj.stage[index]["title"] = title;
	}

	var currentstage = obj.stage.find(el => el.title == title);

	//그리드가 입력되지 않았을 시 자동 생성
	if (grid.includes(NaN))
	{
		if ("grid" in currentstage)
		{
			grid = currentstage.grid;
		}
		else
		{
			grid[0] = stage - 1;
			if (type == "B") grid[1] = 0;
			else if (type == "Main") grid[1] = 1;
			else if (type == "Ex") grid[1] = 2;
		}
	}

	//스테이지 및 그리드 입력값 표시
	Array.from(document.getElementsByClassName("current-stage")).forEach(el =>
	{
		el.textContent = "현재 스테이지: " + title;
	});
	document.getElementById("label-stagegrid").textContent = "그리드(x,y): (" + grid[0] + "," + grid[1] + ")";

	//입력값 적용
	if (name) currentstage["name"] = name;
	if (grid) currentstage["grid"] = grid;
	if (prevstage) currentstage["prevstage"] = prevtitle;
	if ("name" in currentstage) document.getElementById("input-stagename").value = currentstage.name;

	//그리드 및 하위 입력칸 초기화, 웨이브 입력칸 활성화
	document.getElementById("input-stagegridx").value = null;
	document.getElementById("input-stagegridy").value = null;
	resetWaveInput();
	resetEnemyInput();
	enableWaveInput();
	console.log("Submit Stage " + title);
	document.getElementById("input-result").value = JSON.stringify(obj, null, 2);
}

//웨이브 입력
async function submitWave()
{
	//stage 및 wave 입력값 읽기 및 예외처리
	var stageTitle = document.getElementsByClassName("current-stage")[0].textContent.slice(9);
	if (!stageTitle) { alert("지역과 스테이지를 먼저 입력하세요!"); throw "No stageTitle"; }
	var wave = document.getElementById("input-wave").value;
	if (!wave)
	{
		alert("웨이브를 입력하세요!");
		throw "No wave";
	}
	if (!obj.stage.find(el => el.title == stageTitle).wave && wave != 1)
	{
		alert("첫 웨이브는 1부터 시작해야 합니다!");
		throw "Wrong Wave Number";
	}

	//스테이지에 웨이브 프로퍼티가 없을 시 새로 생성
	if (!obj.stage.find(el => el.title == stageTitle).wave)
	{
		obj.stage.find(el => el.title == stageTitle)["wave"] = [{}];
	}

	//해당 웨이브가 없을 시 새로 생성
	if (!obj.stage.find(el => el.title == stageTitle).wave[wave - 1])
	{
		//이전 웨이브가 존재하지 않을 시 예외처리
		if (!obj.stage.find(el => el.title == stageTitle).wave[wave - 2])
		{
			alert("웨이브의 순서가 잘못되었습니다!");
			throw "Wrong Wave Number";
		}
		obj.stage.find(el => el.title == stageTitle).wave[wave - 1] = {};
	}

	//웨이브 이름 적용
	obj.stage.find(el => el.title == stageTitle).wave[wave - 1]["title"] = "wave" + wave;

	//웨이브 입력값 표시
	Array.from(document.getElementsByClassName("current-wave")).forEach(el =>
	{
		el.textContent = "현재 웨이브: " + wave;
	});

	//하위 입력칸 초기화, 적 입력칸 활성화
	resetEnemyInput();
	enableEnemyInput();
	console.log("Submit wave" + wave);
	drawStageMap([stageTitle, wave]);
	document.getElementById("input-result").value = JSON.stringify(obj.stage.find(el => el.title == stageTitle).wave[wave - 1], null, 2);
}

//적 이름 입력
function submitEnemyName()
{
	var name = document.getElementById("input-name").value;
	var indexList = document.getElementById("index-list");

	var enemyindexData = Object.entries(enemyData).filter(([key, value]) => value.name == name).map(([key, value]) => key);
	addDatalist(indexList, enemyindexData);

	var LVL = document.getElementById("input-LVL").value;
	if (LVL)
	{
		var optionviewer = document.getElementById("index-option-view")
		while (optionviewer.firstChild)
		{
			optionviewer.removeChild(optionviewer.lastChild);
		}

		var table = document.createElement("table");

		enemyindexData.forEach(index =>
		{
			var enemydata = enemyData[index];
			var HP = Math.floor(enemydata.HP[0] + Math.floor(enemydata.HP[1]) * (LVL - 1));
			var ATK = Math.floor(enemydata.ATK[0] + enemydata.ATK[1] * (LVL - 1));
			var DEF = Math.floor(enemydata.DEF[0] + enemydata.DEF[1] * (LVL - 1));

			var newOption = table.insertRow();
			newOption.insertCell(0).appendChild(document.createTextNode(index));
			newOption.insertCell(1).appendChild(document.createTextNode(HP));
			newOption.insertCell(2).appendChild(document.createTextNode(ATK));
			newOption.insertCell(3).appendChild(document.createTextNode(DEF));

			if(document.getElementById("input-index").value === index)
			{
				newOption.classList.add('cell-selected');
			}

			optionviewer.appendChild(table);

			newOption.param = index;
			newOption.addEventListener("click", e =>
			{
				e.preventDefault();
				document.getElementById("input-index").value = e.currentTarget.param;
				submitEnemyName();
			}, false);
		})
	}
}

//적 입력
function submitEnemy()
{
	var stageTitle = document.getElementsByClassName("current-stage")[0].textContent.slice(9);
	if (!stageTitle) { alert("지역과 스테이지를 먼저 입력하세요!"); throw "No stageTitle"; }
	var wave = document.getElementsByClassName("current-wave")[0].textContent.slice(8);
	if (!wave) { alert("웨이브를 먼저 입력하세요!"); throw "No wave"; }

	var name = document.getElementById("input-name").value;
	var index = document.getElementById("input-index").value;

	var posarr = [];
	document.getElementsByName("input-pos").forEach((el, index) =>
	{
		if (el.checked == true)
		{
			posarr.push(index + 1);
		}
	});
	if (posarr.length == 0) return alert('위치가 존재하지 않습니다!');

	var LVL = parseInt(document.getElementById("input-LVL").value);

	var checkNull = (arr) =>
	{
		for (var el of arr)
		{
			if (el === null) { return true; }
		}
		return false;
	};
	if (checkNull([name, index, LVL]))
	{
		alert("입력값에 빈칸이 있습니다!");
		throw "error";
	}

	var currentwave = obj.stage.find(el => el.title == stageTitle).wave[wave - 1];
	if (!currentwave.enemylist)
	{
		currentwave.enemylist = [];
	}
	if (currentwave.enemylist.length == 0)
	{
		for (var i = 0; i < 9; i++)
		{
			currentwave.enemylist[i] = { "index": "", "level": 0 };
		}
	}
	posarr.forEach(pos =>
	{
		currentwave.enemylist[pos - 1].index = index;
		currentwave.enemylist[pos - 1].level = LVL;
	})

	document.getElementById("input-result").value = JSON.stringify(currentwave, null, 2);

	addLatestInput(name, LVL, index);

	resetEnemyInput();
	enableEnemyInput();
	drawStageMap([stageTitle, wave]);
	loadEnemyStat([stageTitle, wave, posarr[0]])
}

function deleteEnemy()
{
	var stageTitle = document.getElementsByClassName("current-stage")[0].textContent.slice(9);
	if (!stageTitle) { alert("지역과 스테이지를 먼저 입력하세요!"); throw "No stageTitle"; }
	var wave = document.getElementsByClassName("current-wave")[0].textContent.slice(8);
	if (!wave) { alert("웨이브를 먼저 입력하세요!"); throw "No wave"; }

	var posarr = [];
	document.getElementsByName("input-pos").forEach((el, index) =>
	{
		if (el.checked == true)
		{
			posarr.push(index + 1);
		}
	});

	var currentwave = obj.stage.find(el => el.title == stageTitle).wave[wave - 1];
	if (!currentwave.enemylist)
	{
		currentwave.enemylist = [];
	}
	if (currentwave.enemylist.length == 0)
	{
		for (var i = 0; i < 9; i++)
		{
			currentwave.enemylist[i] = { "index": "", "level": 0 };
		}
	}

	posarr.forEach(pos =>
	{
		currentwave.enemylist[pos - 1].index = "";
		currentwave.enemylist[pos - 1].level = 0;
	})

	document.getElementById("input-result").value = JSON.stringify(currentwave, null, 2);

	resetEnemyInput();
	enableEnemyInput();
	drawStageMap([stageTitle, wave]);
}

function setObj(str)
{
	try
	{
		obj = JSON.parse(str);
		document.getElementById("error-message").textContent = "";

		document.getElementById("input-areatitle").value = obj.title.slice(-1);
		var stage = document.getElementById("input-stage").value;
		var prevstage = document.getElementById("input-prevstage").value;
		var type = "";
		var prevtype = "";
		Array.from(document.getElementsByName("stage-type")).forEach(el =>
		{
			if (el.checked) { type = el.value }
		});
		Array.from(document.getElementsByName("prevstage-type")).forEach(el =>
		{
			if (el.checked) { prevtype = el.value }
		});
		var wave = document.getElementById("input-wave").value;

		submitArea(true);

		document.getElementById("input-stage").value = stage;
		document.getElementById("input-prevstage").value = prevstage;
		Array.from(document.getElementsByName("stage-type")).forEach(el =>
		{
			if (el.value == type) { el.checked = true; }
			else { el.checked = false; }
		});
		Array.from(document.getElementsByName("prevstage-type")).forEach(el =>
		{
			if (el.value == prevtype) { el.checked = true; }
			else { el.checked = false; }
		});
		submitStage();

		document.getElementById("input-wave").value = wave;
		submitWave();
	}
	catch (e)
	{
		document.getElementById("error-message").textContent = "Invalid JSON!";
		console.log(e);
	}
}

function addDatalist(element, arr)
{
	while (element.firstChild)
	{
		element.removeChild(element.lastChild);
	}
	arr.forEach(el =>
	{
		var newOption = document.createElement("option");
		newOption.value = el;
		element.appendChild(newOption);
	});
}

function saveFile(data, fileName)
{
	var a = document.getElementById("download-dummy");
	var json = JSON.stringify(data, null, 2);
	var blob = new Blob([json], { type: "octet/stream" });
	var url = window.URL.createObjectURL(blob);
	a.href = url;
	a.download = fileName;
	a.click();
	window.URL.revokeObjectURL(url);
}

function drawStageMap(param)
{
	//지도 초기화
	resetCell();

	//매개변수가 없을 경우 종료
	if (!param)
	{
		return 0;
	}

	var stageTitle = param[0];
	var wave = param[1];

	var waveData = obj.stage.find(el => el.title == stageTitle).wave[wave - 1];
	if (waveData.enemylist)
	{
		for (let i = 0; i < waveData.enemylist.length; i++)
		{
			var pos = i + 1;
			var index = waveData.enemylist[i].index;
			var level = waveData.enemylist[i].level;

			if (index !== "" && level !== 0)
			{
				if (index in enemyData)
				{
					var name = enemyData[index].name;
					var img = enemyData[index].img;
					//해당 위치에 적 이름과 사진, 링크 추가
					$('.current-wave-map > div:nth-of-type(' + pos + ')').html('<img src=\"images/profile/' + img + '.png\" /><p>' + name + '</p>');
				}
				else
				{
					$('.current-wave-map > div:nth-of-type(' + pos + ')').html('<p>' + index + '</p><p>Lv. ' + level + '</p>');
				}
			}
			var param2 = param.concat(i + 1);
			$('.cell' + pos).off('click').on('click', { param: param2 }, e => { selectCell(e.currentTarget, e.data.param[2]); loadEnemyStat(e.data.param); });
		}
	}
	else
	{
		for (let i = 0; i < 9; i++)
		{
			var pos = i + 1;
			$('.cell' + pos).off('click').on('click', { param: pos }, e => { selectCell(e.currentTarget, e.data.param); });
		}
	}
}

function selectCell(target, pos)
{
	target.classList.toggle('cell-selected');
	document.getElementById("pos" + pos).checked ^= true;
}

function resetCell()
{
	Array.from(document.getElementsByClassName('cell')).forEach(el => { el.innerHTML = ''; el.classList.remove('cell-selected'); });
}

//지도에서 적 선택시 스탯 채우기
function loadEnemyStat([stageTitle, wave, pos])
{
	var waveData = obj.stage.find(el => el.title == stageTitle).wave[wave - 1];

	if (waveData.enemylist[pos - 1].index == "") return 0;

	document.getElementById("input-name").value = enemyData[waveData.enemylist[pos - 1].index].name;
	document.getElementById("input-index").value = waveData.enemylist[pos - 1].index;
	document.getElementById("input-LVL").value = waveData.enemylist[pos - 1].level;
	submitEnemyName();

	/*
	Array.from(document.getElementsByName("input-pos")).forEach(el=>{
		el.checked = false;
	});
	document.getElementById("pos"+pos).checked=true;
	*/

	var statstring = "";
	var enemydata = enemyData[waveData.enemylist[pos - 1].index];
	var LVL = waveData.enemylist[pos - 1].level;
	statstring += `HP: ${Math.floor(enemydata.HP[0] + Math.floor(enemydata.HP[1]) * (LVL - 1))}<br>`;
	statstring += `ATK: ${Math.floor(enemydata.ATK[0] + parseFloat(enemydata.ATK[1]) * (LVL - 1))}<br>`;
	statstring += `HIT: ${enemydata.HIT}%<br>`;
	statstring += `CRT: ${enemydata.CRT}%<br>`;
	statstring += `DEF: ${Math.floor(enemydata.DEF[0] + parseFloat(enemydata.DEF[1]) * (LVL - 1))}<br>`;
	statstring += `DOD: ${enemydata.DOD}%<br>`;
	statstring += `AGI: ${enemydata.AGI}<br>`;
	statstring += `저항: ${enemydata.resist}<br>`;
	$('#enemy-stat').html(statstring);
}

//스테이지 입력칸 비우고 비활성화
function resetStageInput()
{
	Array.from(document.querySelectorAll("#form-stage input[type='text'], #form-stage input[type='number']")).forEach(el =>
	{
		el.value = null;
		el.disabled = true;
	});
	Array.from(document.getElementsByClassName("current-stage")).forEach(el =>
	{
		el.textContent = "현재 스테이지: ";
	});
}

//스테이지 입력칸 활성화
function enableStageInput()
{
	Array.from(document.querySelectorAll("#form-stage input")).forEach(el =>
	{
		el.disabled = false;
	});
}

//웨이브 입력칸 비우고 비활성화
function resetWaveInput()
{
	Array.from(document.querySelectorAll("#input-wave")).forEach(el =>
	{
		el.value = null;
		el.disabled = true;
	});
	Array.from(document.getElementsByClassName("current-wave")).forEach(el =>
	{
		el.textContent = "현재 웨이브: ";
	});
}

//웨이브 입력칸 활성화
function enableWaveInput()
{
	Array.from(document.querySelectorAll("#form-wave input")).forEach(el =>
	{
		el.disabled = false;
	});
}

//적 입력칸 비우고 비활성화
function resetEnemyInput()
{
	Array.from(document.querySelectorAll("#form-enemy input[type='text'], #form-enemy input[type='number']")).forEach(el =>
	{
		el.value = null;
		el.disabled = true;
	});
	Array.from(document.getElementsByName("input-pos")).forEach(el =>
	{
		el.checked = false;
		el.disabled = true;
	});
	drawStageMap();
}

//적 입력칸 활성화
function enableEnemyInput()
{
	Array.from(document.getElementsByName("input-pos")).forEach(el =>
	{
		el.checked = false;
	});
	Array.from(document.querySelectorAll("#form-enemy input")).forEach(el =>
	{
		el.disabled = false;
	});
}

function addLatestInput(nameinput, lvlinput, indexinput)
{

	let optionviewer = document.getElementById("input-latest-view")
	while (optionviewer.firstChild)
	{
		optionviewer.removeChild(optionviewer.lastChild);
	}
	let table = document.createElement("table");

	if(latestenemy[0].includes(nameinput))
	{
		latestenemy[1].splice(latestenemy[0].indexOf(nameinput), 1);
		latestenemy[2].splice(latestenemy[0].indexOf(nameinput), 1);
		latestenemy[0].splice(latestenemy[0].indexOf(nameinput), 1);
	}
	latestenemy[0].unshift(nameinput);
	latestenemy[1].unshift(lvlinput);
	latestenemy[2].unshift(indexinput);

	for(let i=0; i<latestenemy[0].length; i++)
	{
		let name = latestenemy[0][i];
		let lvl = latestenemy[1][i];
		let index = latestenemy[2][i];
		let newOption = table.insertRow();
		newOption.insertCell(0).appendChild(document.createTextNode(name));
		newOption.insertCell(1).appendChild(document.createTextNode(lvl));
		newOption.insertCell(2).appendChild(document.createTextNode(index));

		newOption.childNodes[0].param = [name, index];
		newOption.childNodes[0].addEventListener("click", e =>
		{
			e.preventDefault();
			document.getElementById("input-name").value = e.currentTarget.param[0];
			document.getElementById("input-index").value = e.currentTarget.param[1];
			submitEnemyName();
		}, false);

		newOption.childNodes[1].param = [name, lvl];
		newOption.childNodes[1].addEventListener("click", e =>
		{
			e.preventDefault();
			document.getElementById("input-name").value = e.currentTarget.param[0];
			document.getElementById("input-LVL").value = e.currentTarget.param[1];
			submitEnemyName();
		}, false);

		newOption.childNodes[2].param = [name, lvl, index];
		newOption.childNodes[2].addEventListener("click", e =>
		{
			e.preventDefault();
			document.getElementById("input-name").value = e.currentTarget.param[0];
			document.getElementById("input-LVL").value = e.currentTarget.param[1];
			document.getElementById("input-index").value = e.currentTarget.param[2];
			submitEnemyName();
		}, false);
	}
	optionviewer.appendChild(table);
}