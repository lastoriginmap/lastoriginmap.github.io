var obj = {};

window.onload = async function() {
	var formArea = document.getElementById("form-area");
	var formStage = document.getElementById("form-stage");
	var formWave = document.getElementById("form-wave");
	var formEnemy = document.getElementById("form-enemy");
	var inputResult = document.getElementById("input-result");
	var formResult = document.getElementById("form-result");
	
	var nameList = document.getElementById("name-list");
	var enemyIMGData = await loadEnemyIMGData();
	var enemyNameData = enemyIMGData.map(data=>data.name);
	addDatalist(nameList, enemyNameData);
	
	Array.from(document.querySelectorAll("#form-stage input, #form-wave input, #form-enemy input")).forEach(el=>{
		el.disabled = true;
	});
	
	formArea.addEventListener("submit", async e=>{ e.preventDefault(); await submitArea(); }, false);
	formStage.addEventListener("submit", e=>{ e.preventDefault(); submitStage(); }, false);
	formWave.addEventListener("submit", e=>{ e.preventDefault(); submitWave(); }, false);
	formEnemy.addEventListener("submit", e=>{ e.preventDefault(); submitEnemy(); }, false);
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
	document.getElementById("download").addEventListener("click", e=>{
		e.preventDefault();
		saveFile(obj, "data-"+obj.title+".js");
	}, false)
};

async function submitArea(overide=false)
{
	var area = document.getElementById("input-area").value;
	if(!area) { alert("지역을 입력하세요!"); throw "No area";}
	if(!overide&&"area"+area==obj.title) { alert("현재와 같은 지역입니다!"); throw "Same area";}
	document.getElementById("label-stage").textContent = "스테이지: "+area+"-";
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
	document.getElementById("input-result").value = JSON.stringify(obj);
}

function submitStage()
{
	var area = document.getElementById("input-area").value;
	if(!area) { alert("지역을 먼저 입력하세요!"); throw "No area";}
	var stage = document.getElementById("input-stage").value;
	if(!stage) { alert("스테이지를 입력하세요!"); throw "No stage";}
	var type = "";
	var title = area+"-"+stage;
	Array.from(document.getElementsByName("stage-type")).forEach(el=>{
		if(el.checked) { type = el.value }
	});
	if(type!="Main") { title += type }
	Array.from(document.getElementsByClassName("current-stage")).forEach(el=>{
		el.textContent = "현재 스테이지: "+title;
	});
	
	type = type.toLowerCase()+"stage";
	if(!obj[type]) { obj[type]=[]; }
	if(obj[type].findIndex(el=>el.title==title)==-1)
	{
		index=obj[type].push({})-1;
		obj[type][index]["title"]=title;
	}
	Array.from(document.querySelectorAll("#form-wave input:not([type='submit']), #form-enemy input:not([type='submit'])")).forEach(el=>{
		el.value = null;
		el.disabled = true;
	});
	Array.from(document.querySelectorAll("#form-wave input")).forEach(el=>{
		el.disabled = false;
	});
	console.log("Submit Stage "+title);
	document.getElementById("input-result").value = JSON.stringify(obj);
}

function submitWave()
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
	document.getElementById("input-result").value = JSON.stringify(obj);
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
	var enemypos=[];
	obj[type].find(el=>el.title==stageTitle).wave[wave-1].enemy.forEach(enemyElem=>{ 
		enemyElem.pos.forEach(posElem=>{
			var index=enemypos.findIndex(el=>el>posElem);
			if(index==-1) { index= enemypos.length; }
			enemypos.splice(index, 0, posElem);
		});
	});
	if(objEnemy.pos.findIndex(newpos=>enemypos.indexOf(newpos)!=-1)!=-1)
	{
		alert("중복된 위치입니다!");
		throw "Overlapped Enemy Position";
	}
	obj[type].find(el=>el.title==stageTitle).wave[wave-1].enemy.push(objEnemy);
	document.getElementById("input-result").value = JSON.stringify(obj);
	var nowEnemy = obj[type].find(el=>el.title==stageTitle).wave[wave-1].enemy;
	alert(nowEnemy[(nowEnemy.length-1)].name+" 입력 성공!\n위치: "+nowEnemy[(nowEnemy.length-1)].pos);
}

function setObj(str)
{
	try
	{
		obj = JSON.parse(str);
		document.getElementById("error-message").textContent = "";
		
		document.getElementById("input-area").value = obj.title.slice(4);
		submitArea(true);
	}
	catch
	{
		document.getElementById("error-message").textContent = "Invalid JSON!";
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
	var json = "var areaData = "+JSON.stringify(data)+";";
	var blob = new Blob([json], {type: "octet/stream"});
	var url = window.URL.createObjectURL(blob);
	a.href = url;
	a.download = fileName;
	a.click();
	window.URL.revokeObjectURL(url);
}