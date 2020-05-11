window.onload = async function() {
	document.getElementById("form-area").addEventListener("submit", async e=>{ 
		e.preventDefault();
		
		setting = document.getElementById("json").checked ? '' : '.min';
		
		var type = checkType();
		if(type=="area")
		{
			var filetitle = "data-area"+document.getElementById("input-area").value;
			var obj = await loadAreaData(document.getElementById("input-area").value);
		}
		else if(type=="enemy")
		{
			var filetitle = "data-enemy";
			var obj = await loadEnemyDataList();
		}
		else if(type=="skill")
		{
			var filetitle = "data-skill";
			var obj = await loadSkillDataList();
		}
		else return alert("오류가 발생했습니다!");
		
		if(document.getElementById("json").checked)
		{
			document.getElementById("input-result").value = JSON.stringify(obj);
			saveFile(obj, filetitle+".min.json");
		}
		else
		{
			document.getElementById("input-result").value = JSON.stringify(obj, null, 2);
			saveFile(obj, filetitle+".json");
		}
	}, false);
	
	document.getElementById("area").addEventListener("change", e => {
		e.preventDefault();
		document.getElementById("label-input").textContent = "지역: ";
		document.getElementById("input-area").disabled = false;
	}, false);
	document.getElementById("enemy").addEventListener("change", e => {
		e.preventDefault();
		document.getElementById("label-input").textContent = "적";
		document.getElementById("input-area").disabled = true;
	}, false);
	document.getElementById("skill").addEventListener("change", e => {
		e.preventDefault();
		document.getElementById("label-input").textContent = "스킬";
		document.getElementById("input-area").disabled = true;
	}, false);
};

function saveFile(data, fileName)
{
	var a = document.getElementById("download-dummy");
	if(fileName.includes(".min.json"))
		var js = JSON.stringify(data);
	else
		var js = JSON.stringify(data, null, 2);
	var blob = new Blob([js], {type: "octet/stream"});
	var url = window.URL.createObjectURL(blob);
	a.href = url;
	a.download = fileName;
	a.click();
	window.URL.revokeObjectURL(url);
}

function checkType()
{
	var area = document.getElementById("area");
	var enemy = document.getElementById("enemy");
	var skill = document.getElementById("skill");
	if(area.checked) return "area";
	else if(enemy.checked) return "enemy";
	else if(skill.checked) return "skill";
	else return "error";
}