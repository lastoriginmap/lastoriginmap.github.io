window.onload = async function() {
	var src = "data/data-enemy.js";
	await loadData(src);
	
	var inputName = document.getElementById("input-name");
	var inputLVL = document.getElementById("input-LVL");
	
	inputName.addEventListener("change", showData, false);
	inputLVL.addEventListener("change", showData, false);
};

function showData()
{
	var enemyData = enemyDataArr.find(data => data.name==inputName.value);
	var LVL = inputLVL.value;
	if(enenyData!=undefined && LVL>0)
	{
		calculate(enemyData, LVL);
	}
}