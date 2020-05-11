var enemyDataList = {};
var skillDataList = {};

window.onload = async function() {
	var formEnemy = document.getElementById("form-enemy");
	var inputSkillSelect = document.getElementsByName("skill-select");
	var formSkill = document.getElementById("form-skill");
	var formResult = document.getElementById("form-result");
	var inputResult = document.getElementById("input-result");
	
	enemyDataList = await loadEnemyDataList();
	skillDataList = await loadSkillDataList();
	addDatalist(document.getElementById("name-list"), Object.values(enemyDataList).map(data=>data.name));
	
	inputResult.value = JSON.stringify(enemyDataList, null, 2);
	
	formEnemy.addEventListener("submit", async e=>{ e.preventDefault(); submitEnemy(); }, false);
	inputSkillSelect.forEach(el=>el.addEventListener("change", async e=>{ e.preventDefault(); selectSkill(); }, false));
	formSkill.addEventListener("submit", async e=>{ e.preventDefault(); submitSkill(); }, false);
	formResult.addEventListener("submit", e=>{ setData(inputResult.value); e.preventDefault(); }, false);
	document.getElementById("button-index").addEventListener("click", e=>{ e.preventDefault(); submitIndex(); }, false);
	document.getElementById("button-name").addEventListener("click", e=>{ e.preventDefault(); submitName(); }, false);
	document.getElementById("button-skillindex").addEventListener("click", e=>{ e.preventDefault(); submitSkillIndex(); }, false);

	document.getElementById("delete-index").addEventListener("click", e=>{
		e.preventDefault();
		if(confirm("철충이 완전히 삭제됩니다. 삭제하시겠습니까?"))
		{
			deleteEnemy();
		}
	}, false);

	document.getElementById("clear-enemy").addEventListener("click", e=>{
		e.preventDefault();
		if(confirm("적 입력칸을 비우시겠습니까?"))
		{
			clearEnemy();
		}
	}, false);
	
	document.getElementById("delete-skill").addEventListener("click", e=>{
	e.preventDefault();
		if(confirm("스킬이 완전히 삭제됩니다. 삭제하시겠습니까?"))
		{
			deleteSkill();
		}
	}, false);

	document.getElementById("clear-skill").addEventListener("click", e=>{
		e.preventDefault();
		if(confirm("스킬 입력칸을 비우시겠습니까?"))
		{
			clearSkill();
		}
	}, false);
	
	document.getElementById("download").addEventListener("click", e=>{
		e.preventDefault();
		saveFile(enemyDataList, "data-enemy.json");
		saveFile(skillDataList, "data-skill.json");
	}, false);
	
	document.querySelectorAll("input[type='text']").forEach(el=>{
		el.addEventListener("focus", e=>{
			e.preventDefault();
			el.select();
		}, false);
	});
	
	document.querySelectorAll("textarea:not(#input-result)").forEach(el=>{
		el.addEventListener("focus", e=>{
			e.preventDefault();
			el.select();
		}, false);
	});
};

function submitName()
{
	var name = document.getElementById("input-name").value;
	addDatalist(document.getElementById("index-list"), Object.entries(enemyDataList).filter(([key, value])=>value.name==name).map(([key, value])=>key));
}

function submitIndex()
{
	var index = document.getElementById("input-index").value;
	var enemyData = enemyDataList[index];
	
	var imgDiv = document.getElementById("img");
	if(!imgDiv.hasChildNodes())
	{
		imgDiv.appendChild(document.createElement("img"));
	}
	var imgElement = document.getElementById("img").childNodes[0];
	imgElement.src = `images/profile/${enemyData.img}.png`;
	
	if(!enemyData) imgDiv.removeChild(imgElement);
	
	var getEnemyValue = makeGetter(enemyData);
	document.getElementById("input-name").value = getEnemyValue("name");
	document.getElementById("input-img").value = getEnemyValue("img");
	document.getElementById("input-type").value = getEnemyValue("type");
	document.getElementById("input-info").value = getEnemyValue("info").replace(/<br\s*[\/]?>/gi, "\n");
	document.getElementById("input-HPbase").value = getEnemyValue("HP").base;
	document.getElementById("input-HPincrement").value = getEnemyValue("HP").increment;
	document.getElementById("input-ATKbase").value = getEnemyValue("ATK").base;
	document.getElementById("input-ATKincrement").value = getEnemyValue("ATK").increment;
	document.getElementById("input-DEFbase").value = getEnemyValue("DEF").base;
	document.getElementById("input-DEFincrement").value = getEnemyValue("DEF").increment;
	document.getElementById("input-AGI").value = getEnemyValue("AGI");
	document.getElementById("input-CRT").value = getEnemyValue("CRT");
	document.getElementById("input-HIT").value = getEnemyValue("HIT");
	document.getElementById("input-DOD").value = getEnemyValue("DOD");
	document.getElementById("input-resist").value = getEnemyValue("resist");
	
	document.getElementById("input-result").value = JSON.stringify(enemyDataList, null, 2);
}

function submitEnemy()
{
	var index = document.getElementById("input-index").value;
	var enemyData = enemyDataList[index];
	if(!enemyData)
	{
		enemyDataList[index]={};
		enemyData = enemyDataList[index];
		alert("새로운 철충을 추가합니다.");
	}
	else
	{
		if(!confirm("이미 있는 철충입니다. 덮어씌우겠습니까?")) return 0;
	}
	enemyData.name = document.getElementById("input-name").value;
	enemyData.img = document.getElementById("input-img").value;
	enemyData.type = document.getElementById("input-type").value;
	enemyData.info = document.getElementById("input-info").value.replace(/(?:\r\n|\r|\n)/g, '<br>');
	enemyData.HP = {};
	enemyData.HP.base = parseFloat(document.getElementById("input-HPbase").value);
	enemyData.HP.increment = parseFloat(document.getElementById("input-HPincrement").value);
	enemyData.ATK = {};
	enemyData.ATK.base = parseFloat(document.getElementById("input-ATKbase").value);
	enemyData.ATK.increment = parseFloat(document.getElementById("input-ATKincrement").value);
	enemyData.DEF = {};
	enemyData.DEF.base = parseFloat(document.getElementById("input-DEFbase").value);
	enemyData.DEF.increment = parseFloat(document.getElementById("input-DEFincrement").value);
	enemyData.AGI = parseFloat(document.getElementById("input-AGI").value);
	enemyData.CRT = parseFloat(document.getElementById("input-CRT").value);
	enemyData.HIT = parseFloat(document.getElementById("input-HIT").value);
	enemyData.DOD = parseFloat(document.getElementById("input-DOD").value);
	enemyData.resist = document.getElementById("input-resist").value.split(',').map(el=>parseFloat(el));
	
	addDatalist(document.getElementById("name-list"), Object.values(enemyDataList).map(data=>data.name));
	submitIndex();
}

function selectSkill()
{
	var skillData = findSkill();
	if(!skillData) 
	{
		skillData={};
		var index = document.getElementById("input-index").value+"_Skill"
		var order = ['askill1', 'askill2', 'pskill1', 'pskill2', 'pskill3'];
		for(let i=0;i<5;i++)
		{
			if(document.getElementById(order[i]).checked)
			{
				index+=(i+1).toString();
			}
		}
		skillData[index]={};
	}	
	var getSkillValue = makeGetter(Object.values(skillData)[0]);
	document.getElementById("input-skillindex").value = Object.keys(skillData)[0];
	document.getElementById("input-skillname").value = getSkillValue("name");
	document.getElementById("input-skillimage").value = getSkillValue("img");
	document.getElementById("input-skillrange").value = getSkillValue("range");
	document.getElementById("input-skillAP").value = getSkillValue("AP");
	document.getElementById("input-skillattr").value = getSkillValue("attr");
	document.getElementById("input-skilldesc").value = getSkillValue("description").replace(/<br\s*[\/]?>/gi, "\n");
	document.getElementById("input-skillarea").value = getSkillValue("areadata");
	
	document.getElementById("input-result").value = JSON.stringify(enemyDataList, null, 2);
}

function submitSkillIndex()
{
	var index = document.getElementById("input-skillindex").value;
	if(index in skillDataList)
	var getSkillValue = makeGetter(skillDataList[index]);
	document.getElementById("input-skillname").value = getSkillValue("name");
	document.getElementById("input-skillimage").value = getSkillValue("img");
	document.getElementById("input-skillrange").value = getSkillValue("range");
	document.getElementById("input-skillAP").value = getSkillValue("AP");
	document.getElementById("input-skillattr").value = getSkillValue("attr");
	document.getElementById("input-skilldesc").value = getSkillValue("description").replace(/<br\s*[\/]?>/gi, "\n");
	document.getElementById("input-skillarea").value = getSkillValue("areadata");
	
	setSelectedSkill(index);
	document.getElementById("input-result").value = JSON.stringify(enemyDataList, null, 2);
}

function submitSkill()
{
	var skillData = findSkill();
	if(!skillData)
	{
		skillData = addSkill(document.getElementById("input-skillindex").value);
		alert("새로운 스킬을 추가합니다.");
	}
	else
	{
		if(!confirm("이미 있는 스킬입니다. 덮어씌우겠습니까?")) return 0;
	}
	var skillDataValue = Object.values(skillData)[0];
	skillDataValue.title = getSelectedSkill();
	skillDataValue.type = skillDataValue.title.slice(0,-1)=="askill" ? "active" : "passive";
	skillDataValue.name = document.getElementById("input-skillname").value;
	skillDataValue.img = document.getElementById("input-skillimage").value;
	skillDataValue.range = document.getElementById("input-skillrange").value;
	skillDataValue.AP = document.getElementById("input-skillAP").value;
	skillDataValue.attr = document.getElementById("input-skillattr").value;
	skillDataValue.description = document.getElementById("input-skilldesc").value.replace(/(?:\r\n|\r|\n)/g, '<br>');
	skillDataValue.areadata = document.getElementById("input-skillarea").value.split(',').map(el=>parseFloat(el));
	if(skillDataValue.attr==="") delete skillDataValue.attr;

	selectSkill();
}

function deleteEnemy()
{
	var enemyIndex = document.getElementById("input-index").value;
	if(!(enemyIndex in enemyDataList))
	{
		alert("철충이 존재하지 않습니다!");
		throw "No enemy";
	}
	else delete enemyDataList[enemyIndex];
	addDatalist(document.getElementById("name-list"), Object.values(enemyDataList).map(data=>data.name));
	clearEnemy();
}

function clearEnemy()
{
	var imgDiv = document.getElementById("img");
	if(imgDiv.hasChildNodes())
	{
		imgDiv.removeChild(imgDiv.firstChild);
	}

	var getEnemyValue = makeGetter({});
	document.getElementById("input-index").value = getEnemyValue("index");
	document.getElementById("input-name").value = getEnemyValue("name");
	document.getElementById("input-img").value = getEnemyValue("img");
	document.getElementById("input-type").value = getEnemyValue("type");
	document.getElementById("input-info").value = getEnemyValue("info").replace(/<br\s*[\/]?>/gi, "\n");
	document.getElementById("input-HPbase").value = getEnemyValue("HP");
	document.getElementById("input-HPincrement").value = getEnemyValue("HP");
	document.getElementById("input-ATKbase").value = getEnemyValue("ATK");
	document.getElementById("input-ATKincrement").value = getEnemyValue("ATK");
	document.getElementById("input-DEFbase").value = getEnemyValue("DEF");
	document.getElementById("input-DEFincrement").value = getEnemyValue("DEF");
	document.getElementById("input-AGI").value = getEnemyValue("AGI");
	document.getElementById("input-CRT").value = getEnemyValue("CRT");
	document.getElementById("input-HIT").value = getEnemyValue("HIT");
	document.getElementById("input-DOD").value = getEnemyValue("DOD");
	document.getElementById("input-resist").value = getEnemyValue("resist");
}

function deleteSkill()
{
	var enemyindex = document.getElementById("input-index").value;
	var enemyData = enemyDataList[enemyindex];
	var index = document.getElementById("input-skillindex").value;
	if(index in skillDataList)
	{
		delete skillDataList[index];
		enemyData.skills.splice(enemyData.skills.indexOf(index), 1)
	}
	else
	{
		alert("스킬이 존재하지 않습니다!");
		throw "No skill";
	}
	clearSkill();
}

function clearSkill()
{
	var getSkillValue = makeGetter({});
	document.getElementById("input-skillindex").value = getSkillValue("index");
	document.getElementById("input-skillname").value = getSkillValue("name");
	document.getElementById("input-skillimage").value = getSkillValue("img");
	document.getElementById("input-skillrange").value = getSkillValue("range");
	document.getElementById("input-skillAP").value = getSkillValue("AP");
	document.getElementById("input-skillattr").value = getSkillValue("attr");
	document.getElementById("input-skilldesc").value = getSkillValue("description").replace(/<br\s*[\/]?>/gi, "\n");
	document.getElementById("input-skillarea").value = getSkillValue("areadata");
}

function addDatalist(element, data)
{
	while (element.firstChild)
	{
		element.removeChild(element.firstChild);
	}
	data.forEach(el=>{
		var newOption = document.createElement("option");
		newOption.value = el;
		element.appendChild(newOption);
	});
}

function saveFile(data, fileName)
{
	var a = document.getElementById("download-dummy");
	var json = JSON.stringify(data, null, 2);
	var blob = new Blob([json], {type: "octet/stream"});
	var url = window.URL.createObjectURL(blob);
	a.href = url;
	a.download = fileName;
	a.click();
	window.URL.revokeObjectURL(url);
}

function findSkill()
{
	var enemyindex = document.getElementById("input-index").value;
	var enemyData = enemyDataList[enemyindex];
	var skill = getSelectedSkill();
	if('skills' in enemyData)
	{
		console.log(enemyData.skills)
		var skillDataIndex = enemyData.skills.find(index => skillDataList[index].title==skill);
		if(!skillDataIndex) return false;
		else
		{
			var returnobj = {};
			returnobj[skillDataIndex] = skillDataList[skillDataIndex];
			return returnobj;
		}
	}
	else return false;
}

function addSkill(skillIndex)
{
	var order = ['askill1', 'askill2', 'pskill1', 'pskill2', 'pskill3'];
	var enemyindex = document.getElementById("input-index").value;
	var enemyData = enemyDataList[enemyindex];
	var arrindex = 0;

	if(!('skills' in enemyData)) enemyData['skills'] = [];
	for(let i=0;i<enemyData.skills.length;i++)
	{
		if(order.indexOf(skillDataList[enemyData.skills[i]].title)<order.indexOf(getSelectedSkill()))
		{
			arrindex=i+1;
		}
	}
	enemyData.skills.splice(arrindex, 0, skillIndex);
	if(!(skillIndex in skillDataList)) skillDataList[skillIndex] = {};

	var returnobj = {};
	returnobj[skillIndex] = skillDataList[skillIndex];
	return returnobj;
}

function getSelectedSkill()
{
	var order = ['askill1', 'askill2', 'pskill1', 'pskill2', 'pskill3'];
	for(let i=0;i<5;i++)
	{
		if(document.getElementById(order[i]).checked)
		{
			return document.getElementById(order[i]).value;
		}
	}
}

function setSelectedSkill(index)
{
	var order = ['askill1', 'askill2', 'pskill1', 'pskill2', 'pskill3'];
	var skillnum = index.slice(-1);
	for(let i=0;i<5;i++)
	{
		if(i==skillnum-1)
		{
			document.getElementById(order[i]).checked = true;
		}
		else document.getElementById(order[i]).checked = false;
	}
}

function makeGetter(obj)
{
	if(!obj) return function() { return ""; }
	return function(key)
	{
		return (key in obj ? obj[key] : "");
	}
}

function setData(str)
{
	try
	{
		enemyDataList = JSON.parse(str);
		document.getElementById("error-message").textContent = "";
	}
	catch(e)
	{
		document.getElementById("error-message").textContent = "Invalid JSON!";
		console.log(e);
	}
}