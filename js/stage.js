//페이지 시작시 실행할 함수
window.onload = async function ()
{
	//URL에서 스테이지명 확인
	var stageTitle = getURLParameter('stagetitle');

	//해당 스테이지 데이터 및 철충 이미지 데이터 로드
	var stageLoadData = loadStageData(stageTitle);
	var enemyDataList = loadEnemyDataList();
	//var enemyIMGData = loadEnemyIMGData();

	//페이지 그리기
	drawPage(await stageLoadData, await enemyDataList);

	//웨이브 표시 클릭시 웨이브 이동
	$('.carousel-indicators').on('click', '.carousel-indicator', async function (e)
	{
		changeWave(Number(e.currentTarget.hash.slice(5)), (await stageLoadData).stageData.wave.length);
		e.preventDefault();
	});

	// 좌우 화살표 클릭시 웨이브 이동
	$('.carousel-control').on('click', async function (e)
	{
		changeWave(Number(e.currentTarget.hash.slice(5)), (await stageLoadData).stageData.wave.length);
		e.preventDefault();
	});
};

async function drawPage(stageLoadData, enemyDataList)
{
	//해당 스테이지 데이터 및 전후 스테이지 목록 저장
	var stageData = stageLoadData.stageData;
	var stageList = stageLoadData.stageList;

	var stageName = stageData.title;
	if (stageData.name != undefined)
	{
		stageName = stageData.name;
	}

	//문서 제목
	document.title = stageName + ' 스테이지 정보';
	//뒤로가기 버튼, 상단 제목
	if (stageData.title.includes("Daily"))
	{
		$("a.btn-back").attr("href", "index.html");
		$('#stage-title').html(stageName);
	}
	else
	{
		$("a.btn-back").attr("href", "area.html?areanum=" + getAreaByStageTitle(stageData.title));
		$('#stage-title').html(stageName + ' 스테이지');
	}

	//스테이지 화살표 설정
	//첫 스테이지일 시 왼쪽 화살표 숨기고, 아니면 이전 스테이지로 링크
	if (stageList[0]===null)
	{
		$(".stage-control.control-left").addClass("control-end");
	}
	else
	{
		$(".stage-control.control-left").attr("href", "stage.html?stagetitle=" + stageList[0]);
	}
	//마지막 스테이지일 시 오른쪽 화살표 숨기고, 아니면 다음 스테이지로 링크
	if (stageList[1]===null)
	{
		$(".stage-control.control-right").addClass("control-end");
	}
	else
	{
		$(".stage-control.control-right").attr("href", "stage.html?stagetitle=" + stageList[1]);
	}

	//웨이브 그리기
	for (var i = 0; i < stageData.wave.length; i++)
	{
		//더미 웨이브 표시를 복사해 번호 부여
		$('.carousel-indicator').first().clone().appendTo('.carousel-indicators');
		$('.carousel-indicator').last().attr('href', '#wave' + i);

		//더미 웨이브 슬라이드를 복사
		$('.carousel-slide').first().clone().appendTo('.carousel-track');

		//철충 위치 그리기
		for (var j = 0; j < stageData.wave[i].enemylist.length; j++)
		{
			//현재 철충 위치
			var pos = j;

			//위치가 PC 키패드 숫자로 표시되어 있으면 핸드폰 숫자 위치로 변환
			//현재는 사용하지 않음
			//var row = 3 - parseInt(pos / 3);
			//var column = pos + 1 - parseInt(pos / 3) * 3;

			if (stageData.wave[i].enemylist[j].index != "")
			{
				var enemyIndex = stageData.wave[i].enemylist[j].index;
				var enemyLVL = stageData.wave[i].enemylist[j].level;

				var enemyData = enemyDataList[enemyIndex];

				//적 이름, 이미지
				var enemyName = enemyData.name;
				var enemyIMG = enemyData.img;

				//해당 위치에 적 이름과 사진, 링크 추가				
				$('div:nth-of-type(' + (pos+1) + ')', '.carousel-slide:last-child > .wave-grid').html('<a href=\"javascript:show_enemynew(\'new\', \'' + enemyIndex + '\', ' + enemyLVL + ')\"><img src=\"images/profile/' + enemyIMG + '.png\" /><p>' + enemyName + '</p></a>');
				
				//PC 키패드 숫자면 아래를 사용
				//$('div:nth-of-type(' + ((row - 1) * 3 + column) + ')', '.carousel-slide:last-child > .wave-grid').html('<a href=\"javascript:show_enemynew(\'new\', \'' + enemyIndex + '\', ' + enemyLVL + ')\"><img src=\"images/profile/' + enemyIMG + '.png\" /><p>' + enemyName + '</p></a>');
			}
		}
	}

	//모든 작업이 완료되면 맨 처음의 더미 웨이브를 제거
	$('.carousel-indicator').first().remove();
	$('.carousel-slide').first().remove();
	//초기위치인 웨이브 1으로 이동
	changeWave(0, stageData.wave.length)
}

//웨이브 이동 함수
function changeWave(index, length)
{
	//현재 웨이브 슬라이드의 활성화 삭제, 이동할 웨이브 슬라이드 활성화
	$('.carousel-slide-active').removeClass('carousel-slide-active');
	$('.carousel-slide').eq(index).addClass('carousel-slide-active');
	//상단 웨이브 표시도 똑같이 활성화
	$('.carousel-indicator-active').removeClass('carousel-indicator-active');
	$('.carousel-indicator').eq(index).addClass('carousel-indicator-active');
	//비활성화된 좌우 화살표가 있을 경우 비활성화 해제
	$('.carousel-control.control-end').removeClass('control-end');
	//좌우 화살표 링크 재지정
	$('.carousel-control.control-left').attr("href", "#wave" + (index - 1));
	$('.carousel-control.control-right').attr("href", "#wave" + (index + 1));
	//첫 웨이브일 시 왼쪽 화상표 비활성화
	if ($('.carousel-control.control-left').attr("href") == "#wave-1")
	{
		$('.carousel-control.control-left').addClass("control-end");
	}
	//마지막 화살표일 시 오른쪽 화살표 비활성화
	if ($('.carousel-control.control-right').attr("href") == "#wave" + length)
	{
		$('.carousel-control.control-right').addClass("control-end");
	}
	//현재 웨이브 위치로 애니메이션 이동
	$('.carousel-track').css("transform", "translateX(" + (-100 * index) + "%)");
}

//적 정보 팝업 띄우는 함수
function show_enemynew(type, enemyIndex, LVL)
{
	var popupX = (window.screen.width / 2) - (540 / 2);
	var popupY = (window.screen.height / 2) - (450 / 2);
	window.open('enemy.html?type=' + type + '&enemy=' + enemyIndex + '&lvl=' + LVL, "popup_enemy", 'status=no, height=450, width=540, left=' + popupX + ', top=' + popupY + ', screenX=' + popupX + ', screenY= ' + popupY);
}

//적 정보 팝업 띄우는 함수 구버전
function show_enemy(stage, wave, enemy) {
    var popupX = (window.screen.width / 2) - (540 / 2);
    var popupY= (window.screen.height /2) - (450 / 2);
    window.open('enemy.html?stage='+stage+'&wave='+wave+'&enemy='+enemy, "popup_enemy", 'status=no, height=450, width=540, left='+ popupX + ', top='+ popupY + ', screenX='+ popupX + ', screenY= '+ popupY);
}