var obj = {};

window.onload = function() {
	//var src = "data/data-enemy.js";
	//await loadData(src);
	
	var formArea = document.getElementById("form-area");
	var formStage = document.getElementById("form-stage");
	var formWave = document.getElementById("form-wave");
	var formEnemy = document.getElementById("form-enemy");
	var inputResult = document.getElementById("input-result");
	
	formArea.addEventListener("submit", e=>{ submitArea(); e.preventDefault(); }, false);
	formStage.addEventListener("submit", e=>{ submitStage(); e.preventDefault(); }, false);
	formWave.addEventListener("submit", e=>{ submitWave(); e.preventDefault(); }, false);
	formEnemy.addEventListener("submit", e=>{ submitEnemy(); e.preventDefault(); }, false);
	inputResult.addEventListener("submit", e=>{ e.preventDefault(); }, false);
	inputResult.addEventListener("focus", e=>{
		e.preventDefault();
		document.execCommand('copy', false, inputResult.select());
	}, false);
};

function submitArea()
{
	var area = document.getElementById("input-area").value;
	document.getElementById("label-stage").textContent = "스테이지: "+area+"-";
	obj["title"] = "area"+area;
	obj["areatype"] = "grid";
	obj["gridsize"] = [8,3];
	console.log("Submit area"+area);
	document.getElementById("input-result").value = JSON.stringify(obj);
}

function submitStage()
{
	var area = document.getElementById("input-area").value;
	var stage = document.getElementById("input-stage").value;
	var type = "";
	var title = area+"-"+stage;
	Array.from(document.getElementsByName("stage-type")).forEach(el=>{
		if(el.checked) { type = el.value }
	});
	if(type!="Main") { title += type }
	Array.from(document.getElementsByClassName("current-stage")).forEach(el=>{
		el.textContent = "현재 스테이지: "+title;
	});
	switch(type)
	{
		case "Main":
			if(!obj.mainstage) { obj["mainstage"]=[]; }
			index=obj.mainstage.push({})-1;
			obj.mainstage[index]["title"]=title;
			break;
		case "B":
			if(!obj.bstage) { obj["bstage"]=[]; }
			index=obj.bstage.push({})-1;
			obj.bstage[index]["title"]=title;
			break;
		case "Ex":
			if(!obj.exstage) { obj["exstage"]=[]; }
			index=obj.exstage.push({})-1;
			obj.exstage[index]["title"]=title;
			break;
	}
	console.log("Submit Stage "+title);
	document.getElementById("input-result").value = JSON.stringify(obj);
}

function submitWave()
{
	var stageTitle = document.getElementsByClassName("current-stage")[0].textContent.slice(9);
	var wave = document.getElementById("input-wave").value;
	Array.from(document.getElementsByClassName("current-wave")).forEach(el=>{
		el.textContent = "현재 웨이브: "+wave;
	});
	var type = getTypeByStageTitle(stageTitle);
	switch(type)
	{
		case "":
			type="mainstage";
			break;
		case "B":
			type="bstage";
			break;
		case "Ex":
			type="exstage";
			break;
	}
	if(!obj[type].find(el=>el.title==stageTitle).wave)
	{
		obj[type].find(el=>el.title==stageTitle)["wave"]=[];
	}
	index = obj[type].find(el=>el.title==stageTitle).wave.push({})-1;
	obj[type].find(el=>el.title==stageTitle).wave[index]["title"] = "wave"+wave;
	console.log("Submit wave"+wave);
	document.getElementById("input-result").value = JSON.stringify(obj);
}

function submitEnemy()
{
	var objEnemy = {};
	var stageTitle = document.getElementsByClassName("current-stage")[0].textContent.slice(9);
	var wave = document.getElementsByClassName("current-wave")[0].textContent.slice(8);
	objEnemy['name'] = document.getElementById("input-name").value;
	objEnemy['pos'] = document.getElementById("input-pos").value.split(',').map(el=>parseInt(el));
	objEnemy['LVL'] = parseInt(document.getElementById("input-LVL").value);
	objEnemy['HP'] = parseInt(document.getElementById("input-HP").value);
	objEnemy['ATK'] = parseInt(document.getElementById("input-ATK").value);
	objEnemy['DEF'] = parseInt(document.getElementById("input-DEF").value);
	objEnemy['AGI'] = parseInt(document.getElementById("input-AGI").value);
	objEnemy['CRT'] = parseInt(document.getElementById("input-CRT").value);
	objEnemy['HIT'] = parseInt(document.getElementById("input-HIT").value);
	objEnemy['DOD'] = parseInt(document.getElementById("input-DOD").value);
	objEnemy['skillpower'] = document.getElementById("input-skill").value.split(',').map(el=>parseInt(el));
	objEnemy['skillLVL'] = [];
	objEnemy.skillpower.forEach((el,index)=>{ objEnemy['skillLVL'][index]=1; });
	
	
	var type = getTypeByStageTitle(stageTitle);
	switch(type)
	{
		case "":
			type="mainstage";
			break;
		case "B":
			type="bstage";
			break;
		case "Ex":
			type="exstage";
			break;
	}
	if(!obj[type].find(el=>el.title==stageTitle).wave[wave-1].enemy)
	{
		obj[type].find(el=>el.title==stageTitle).wave[wave-1].enemy=[];
	}
	obj[type].find(el=>el.title==stageTitle).wave[wave-1].enemy.push(objEnemy);
	document.getElementById("input-result").value = JSON.stringify(obj);
}

function getStage(title)
{
	var type = getTypeByStageTitle(title);
	switch(type)
	{
		case "":
			type="mainstage";
			break;
		case "B":
			type="bstage";
			break;
		case "Ex":
			type="exstage";
			break;
	}
}