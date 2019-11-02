window.onload = async function() {
	document.getElementById("form-area").addEventListener("submit", async e=>{ 
		e.preventDefault();
		var obj = await loadAreaData(document.getElementById("input-area").value);
		if(document.getElementById("js").checked)
		{
			document.getElementById("input-result").value = JSON.stringify(obj);
			saveFile(obj, "data-area"+document.getElementById("input-area").value+".min.js");
		}
		else
		{
			document.getElementById("input-result").value = JSON.stringify(obj, null, 2);
			saveFile(obj, "data-area"+document.getElementById("input-area").value+".js");
		}	
	}, false);
};

function saveFile(data, fileName)
{
	var a = document.getElementById("download-dummy");
	if(fileName.includes(".min.js"))
		var js = "var areaData="+JSON.stringify(data)+";";
	else
		var js = "var areaData = "+JSON.stringify(data, null, 2)+";";
	var blob = new Blob([js], {type: "octet/stream"});
	var url = window.URL.createObjectURL(blob);
	a.href = url;
	a.download = fileName;
	a.click();
	window.URL.revokeObjectURL(url);
}