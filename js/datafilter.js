var obj = {};
var eData = [];
var enemyIMGData = {};


window.onload = async function() {
	enemyIMGData = await loadEnemyIMGData();
	var nameList = document.getElementById("name-list");
	var enemyNameData = enemyIMGData.map(data=>data.name);
	addDatalist(nameList, enemyNameData);
	
	document.getElementById("form-enemy").addEventListener("submit", e=>{ 
		e.preventDefault();
		submitEnemy();
	}, false);
};

async function submitEnemy()
{
	var type = ["mainstage", "bstage", "exstage"];
	var name = document.getElementById("input-name").value;
	
	for(let i=0;i<6;i++)
	{
		obj = await loadAreaData(i+1);
		for(let stype=0; stype<type.length; stype++)
		{
			if(obj[type[stype]])
			{
				for(let sindex=0; sindex<obj[type[stype]].length; sindex++)
				{
					if(obj[type[stype]][sindex].wave)
					{
						for(let windex=0; windex<obj[type[stype]][sindex].wave.length; windex++)
						{
							if(obj[type[stype]][sindex].wave[windex].enemy)
							{
								for(let eindex=0; eindex<obj[type[stype]][sindex].wave[windex].enemy.length; eindex++)
								{
									let enemyObj = obj[type[stype]][sindex].wave[windex].enemy[eindex];
									if(name==enemyObj.name)
									{
										eData.push([enemyObj.LVL,enemyObj.HP,enemyObj.ATK,enemyObj.DEF]);
									}
								}
							}
						}
					}
				}
			}
		}
	}
	saveFile(eData, document.getElementById("input-name").value+".csv");
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
	let csvContent = data.map(e => e.join(",")).join("\n");
	var blob = new Blob([csvContent], {type: "text/csv"});
	var url = window.URL.createObjectURL(blob);
	a.href = url;
	a.download = fileName;
	a.click();
	window.URL.revokeObjectURL(url);
}