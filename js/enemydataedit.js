var enemyDataArr = [];

window.onload = async function() {
	var formEnemy = document.getElementById("form-enemy");
	var inputSkillSelect = document.getElementsByName("skill-select");
	var formSkill = document.getElementById("form-skill");
	var formResult = document.getElementById("form-result");
	var inputResult = document.getElementById("input-result");
	
	enemyDataArr = await loadEnemyData();
	addDatalist();
	
	inputResult.value = JSON.stringify(enemyDataArr, null, 2);
	
	formEnemy.addEventListener("submit", async e=>{ e.preventDefault(); submitEnemy(); }, false);
	inputSkillSelect.forEach(el=>el.addEventListener("change", async e=>{ e.preventDefault(); selectSkill(); }, false));
	formSkill.addEventListener("submit", async e=>{ e.preventDefault(); submitSkill(); }, false);
	formResult.addEventListener("submit", e=>{ setData(inputResult.value); e.preventDefault(); }, false);
	document.getElementById("button-name").addEventListener("click", e=>{ e.preventDefault(); submitName(); }, false);

	document.getElementById("delete-name").addEventListener("click", e=>{
		e.preventDefault();
		if(confirm("철충이 완전히 삭제됩니다. 삭제하시겠습니까?"))
		{
			deleteEnemy();
		}
	}, false);
	document.getElementById("copy-name").addEventListener("click", e=>{
		e.preventDefault();
		if(confirm("해당 철충을 복사하시겠습니까?"))
		{
			copyEnemy();
		}
	}, false);
	
	document.getElementById("delete-skill").addEventListener("click", e=>{
	e.preventDefault();
		if(confirm("스킬이 완전히 삭제됩니다. 삭제하시겠습니까?"))
		{
			deleteSkill();
		}
	}, false);
	document.getElementById("copy-skill").addEventListener("click", e=>{
		e.preventDefault();
		if(confirm("해당 스킬을 복사하시겠습니까?"))
		{
			copySkill();
		}
	}, false);
	
	document.getElementById("download").addEventListener("click", e=>{
		e.preventDefault();
		saveFile(enemyDataArr, "data-enemy.js");
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

function submitName(name)
{
	var enemyData = findEnemy(name);
	
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
	document.getElementById("input-type").value = getEnemyValue("type");
	document.getElementById("input-img").value = getEnemyValue("img");
	document.getElementById("input-resist").value = getEnemyValue("resist");
	document.getElementById("input-CRT").value = getEnemyValue("CRT");
	document.getElementById("input-info").value = getEnemyValue("info").replace(/<br\s*[\/]?>/gi, "\n");
	
	document.getElementById("input-result").value = JSON.stringify(enemyDataArr, null, 2);
	document.getElementById("copy-name").enemyIndex = enemyDataArr.findIndex(el=> el.name==enemyData.name);
}

function submitEnemy()
{
	var enemyData = findEnemy();
	if(!enemyData)
	{
		enemyDataArr.push({});
		enemyData = enemyDataArr[enemyDataArr.length-1];
		alert("새로운 철충을 추가합니다.");
	}
	else
	{
		if(!confirm("이미 있는 철충입니다. 덮어씌우겠습니까?")) return 0;
	}
	enemyData.name = document.getElementById("input-name").value;
	enemyData.type = document.getElementById("input-type").value;
	enemyData.img = document.getElementById("input-img").value;
	enemyData.resist = document.getElementById("input-resist").value.split(',').map(el=>parseInt(el));
	enemyData.CRT = document.getElementById("input-CRT").value;
	enemyData.info = document.getElementById("input-info").value.replace(/(?:\r\n|\r|\n)/g, '<br>');
	if(enemyData.resist.length==1) delete enemyData.resist;
	if(enemyData.CRT=='') delete enemyData.CRT;
	
	addDatalist();
	submitName();
}

function selectSkill()
{
	var skillData = findSkill();
	if(!skillData) skillData={};
	var getSkillValue = makeGetter(skillData);
	document.getElementById("input-skillname").value = getSkillValue("name");
	document.getElementById("input-skillimage").value = getSkillValue("img");
	document.getElementById("input-skillrange").value = getSkillValue("range");
	document.getElementById("input-skillAP").value = getSkillValue("AP");
	document.getElementById("input-skillattr").value = getSkillValue("attr");
	document.getElementById("input-skilldesc").value = getSkillValue("description").replace(/<br\s*[\/]?>/gi, "\n");
	document.getElementById("input-skillarea").value = getSkillValue("areadata");
	
	document.getElementById("input-result").value = JSON.stringify(enemyDataArr, null, 2);
}

function submitSkill()
{
	var skillData = findSkill();
	if(!skillData)
	{
		skillData = addSkill();
		alert("새로운 스킬을 추가합니다.");
	}
	else
	{
		if(!confirm("이미 있는 스킬입니다. 덮어씌우겠습니까?")) return 0;
	}
	skillData.title = getSelectedSkill();
	skillData.type = skillData.title.slice(0,-1)=="askill" ? "active" : "passive";
	skillData.name = document.getElementById("input-skillname").value;
	skillData.img = document.getElementById("input-skillimage").value;
	skillData.range = document.getElementById("input-skillrange").value;
	skillData.AP = document.getElementById("input-skillAP").value;
	skillData.attr = document.getElementById("input-skillattr").value;
	skillData.description = document.getElementById("input-skilldesc").value.replace(/(?:\r\n|\r|\n)/g, '<br>');
	skillData.areadata = document.getElementById("input-skillarea").value.split(',').map(el=>parseFloat(el));
	if(skillData.attr==="") delete skillData.attr;
	
	selectSkill();
}

function deleteEnemy()
{
	var enemyName = document.getElementById("input-name").value;
	var enemyDataIndex = enemyDataArr.findIndex(data => data.name==enemyName);
	if(enemyDataIndex == -1)
	{
		alert("철충이 존재하지 않습니다!");
		throw "No enemy";
	}
	else enemyDataArr.splice(enemyDataIndex,1);
	addDatalist();
	submitName();
}

function copyEnemy()
{
	var enemyData = enemyDataArr[document.getElementById("copy-name").enemyIndex];
	if(!enemyData)
	{
		alert("철충이 존재하지 않습니다!");
		throw "No enemy";
	}
	else
	{
		var newEnemyData = Object.assign({}, enemyData);
		newEnemyData.name = document.getElementById("input-name").value;
		newEnemyData.type = document.getElementById("input-type").value;
		newEnemyData.img = document.getElementById("input-img").value;
		newEnemyData.resist = document.getElementById("input-resist").value.split(',').map(el=>parseInt(el));
		newEnemyData.CRT = document.getElementById("input-CRT").value;
		newEnemyData.info = document.getElementById("input-info").value.replace(/(?:\r\n|\r|\n)/g, '<br>');
		if(newEnemyData.resist.length==1) delete newEnemyData.resist;
		if(newEnemyData.CRT=='') delete newEnemyData.CRT;
		enemyDataArr.push(newEnemyData);
		addDatalist();
		submitName(newEnemyData.name);
		return alert(`${newEnemyData.name}으로 복사되었습니다.`);
	}
}

function deleteSkill()
{
	var enemyData = findEnemy();
	var skill = getSelectedSkill();
	var skillDataIndex = enemyData.skills.findIndex(data => data.title==skill);
	if(skillDataIndex == -1)
	{
		alert("스킬이 존재하지 않습니다!");
		throw "No skill";
	}
	else enemyData.skills.splice(skillDataIndex,1);
	selectSkill();
}

function copySkill()
{
	var enemyData = findEnemy();
	var skill = getSelectedSkill();
	var skillData = enemyData.skills.find(data => data.title==skill);
	if(!skillData)
	{
		alert("스킬이 존재하지 않습니다!");
		throw "No skill";
	}
	else
	{
		var skillIndex = enemyData.skills.reduce((acc,data) => {
			if(data.title.slice(0,-1) == skillData.title.slice(0,-1)) acc.push(+data.title.slice(6));
			return acc;
		},[]);
		skillIndex.sort();
		
		var newIndex = [1,2,3].filter(n => {
			let m = skillIndex.indexOf(n);
			return m == -1 ? true : (skillIndex.splice(m, 1), false);
		})[0];

		if(!newIndex || (newIndex==3 && skillData.title.slice(0,-1)=='askill')) return alert('스킬이 복사될 자리가 없습니다!');
		else
		{
			var newSkillData = Object.assign({}, skillData);
			newSkillData.title = skillData.title.slice(0,-1)+newIndex;
			addSkill(newSkillData);
			alert(`${newSkillData.title}으로 복사되었습니다.`);
		}
		selectSkill();
	}
}

function addDatalist()
{
	var nameList = document.getElementById("name-list");
	var enemyNameData = enemyDataArr.map(data=>data.name);
	while (nameList.firstChild) nameList.removeChild(nameList.firstChild);
	enemyNameData.forEach(el=>{
		var newOption = document.createElement("option");
		newOption.value = el;
		nameList.appendChild(newOption);
	});
}

function saveFile(data, fileName)
{
	var a = document.getElementById("download-dummy");
	var json = "var enemyDataArr = "+JSON.stringify(data, null, 2)+";";
	var blob = new Blob([json], {type: "octet/stream"});
	var url = window.URL.createObjectURL(blob);
	a.href = url;
	a.download = fileName;
	a.click();
	window.URL.revokeObjectURL(url);
}

function findEnemy(enemyName)
{
	if(!enemyName) enemyName = document.getElementById("input-name").value;
	var enemyDataIndex = enemyDataArr.findIndex(data => data.name==enemyName);
	if(enemyDataIndex == -1) return false;
	else return enemyDataArr[enemyDataIndex];
}

function findSkill()
{
	var enemyData = findEnemy();
	var skill = getSelectedSkill();
	if('skills' in enemyData)
	{
		var skillDataIndex = enemyData.skills.findIndex(data => data.title==skill);
		if(skillDataIndex == -1) return false;
		else return enemyData.skills[skillDataIndex];
	}
	else return false;
}

function addSkill(skillData)
{
	var order = ['askill1', 'askill2', 'pskill1', 'pskill2', 'pskill3'];
	var enemyData = findEnemy();
	var skill = skillData ? skillData.title : getSelectedSkill();
	var skillOrder = order.indexOf(skill);
	var index = 0;
	
	if(!('skills' in enemyData)) enemyData['skills'] = [];
	for(let i=0;i<enemyData.skills.length;i++)
	{
		if(order.indexOf(enemyData.skills[i].title)<skillOrder)
		{
			index=i+1;
		}
	}
	if(skillData) enemyData.skills.splice(index, 0, skillData);
	else enemyData.skills.splice(index, 0, {});
	return enemyData.skills[index];
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
		enemyDataArr = JSON.parse(str);
		document.getElementById("error-message").textContent = "";
	}
	catch(e)
	{
		document.getElementById("error-message").textContent = "Invalid JSON!";
		console.log(e);
	}
}