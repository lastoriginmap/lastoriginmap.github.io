//페이지 시작시 실행할 함수
window.onload = async function ()
{
	//URL에서 스테이지명 확인
	var stageTitle = getURLParameter('stagetitle');

	//해당 스테이지 데이터 및 철충 이미지 데이터 로드
	var stageLoadData = loadStageData(stageTitle);
	var groupData = loadgroupData(stageTitle);
	var enemyDataList = loadEnemyDataList();
	//var enemyIMGData = loadEnemyIMGData();

	//페이지 그리기
	drawPage(await stageLoadData, await groupData, await enemyDataList);

	//웨이브 표시 클릭시 웨이브 이동
	$('.carousel-indicators').on('click', '.carousel-indicator', async function (e)
	{
		changeWave(Number(e.currentTarget.hash.slice(5)));
		e.preventDefault();
	});

	// 좌우 화살표 클릭시 웨이브 이동
	$('.carousel-control-wave').on('click', async function (e)
	{
		changeWave(Number(e.currentTarget.hash.slice(5)));
		e.preventDefault();
	});

	// 상하 화살표 클릭시 웨이브 이동
	for(var i=0; i<(await stageLoadData).stageData.wave.length;i++)
	{
		$('.carousel-slide').eq(i).find('.carousel-control-group').on('click', async function (e)
		{
			changeGroup(Number(e.currentTarget.hash.slice(6)));
			e.preventDefault();
		});
	}
};

async function drawPage(stageLoadData, groupData, enemyDataList)
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
	document.title = stageName;
	//뒤로가기 버튼, 상단 제목
	$("a.btn-back").attr("href", "areaEW.html?areanum=" + getAreaByStageTitle(stageData.title));
	$('#stage-title').html(stageName);

	//스테이지 화살표 설정
	//첫 스테이지일 시 왼쪽 화살표 숨기고, 아니면 이전 스테이지로 링크
	if (getIndexByStageTitle(stageData.title) == stageList[0])
	{
		$(".stage-control.control-left").addClass("control-end");
	}
	else
	{
		$(".stage-control.control-left").attr("href", "stageEW.html?stagetitle=" + getAreaByStageTitle(stageData.title) + "-" + stageList[stageList.indexOf(getIndexByStageTitle(stageData.title)) - 1] + getTypeByStageTitle(stageData.title));
	}
	//마지막 스테이지일 시 오른쪽 화살표 숨기고, 아니면 다음 스테이지로 링크
	if (getIndexByStageTitle(stageData.title) == stageList[stageList.length - 1])
	{
		$(".stage-control.control-right").addClass("control-end");
	}
	else
	{
		$(".stage-control.control-right").attr("href", "stage.html?stagetitle=" + getAreaByStageTitle(stageData.title) + "-" + stageList[stageList.indexOf(getIndexByStageTitle(stageData.title)) + 1] + getTypeByStageTitle(stageData.title));
	}

	//웨이브 그리기
	for (var waveIndex = 0; waveIndex < stageData.wave.length; waveIndex++)
	{
		//더미 웨이브 표시를 복사해 번호 부여
		$('.carousel-indicator').first().clone().appendTo('.carousel-indicators');
		$('.carousel-indicator').last().attr('href', '#wave' + waveIndex);

		//더미 웨이브 슬라이드를 복사
		$('.carousel-slide').first().clone().appendTo('.carousel-track-wave');

		for (var groupIndex = 0; groupIndex < groupData[stageData.wave[waveIndex]].length; groupIndex++)
		{
			//더미 그리드를 복사
			if(groupIndex>0)
			{
				$('.wave-grid').first().clone().appendTo($('.carousel-track-vertical').last());
			}


			//철충 위치 그리기
			for (var posIndex = 0; posIndex < groupData[stageData.wave[waveIndex]][groupIndex].enemylist.length; posIndex++)
			{
				//현재 철충 위치
				var pos = posIndex;

				//해당 위치에 철충이 존재할 경우
				if (groupData[stageData.wave[waveIndex]][groupIndex].enemylist[posIndex].index != "")
				{
					//적 인덱스, 레벨
					var enemyIndex = groupData[stageData.wave[waveIndex]][groupIndex].enemylist[posIndex].index;
					var enemyLVL = groupData[stageData.wave[waveIndex]][groupIndex].enemylist[posIndex].level;

					var enemyData = enemyDataList[enemyIndex];

					//적 이름, 이미지
					var enemyName = enemyData.name;
					var enemyIMG = enemyData.img;

					//해당 위치에 적 이름과 사진, 링크 추가
					$('div:nth-of-type(' + (pos + 1) + ')', '.carousel-slide:last-child .wave-grid:last-child').html('<a href=\"javascript:show_enemynew(\'new\', \'' + enemyIndex + '\', ' + enemyLVL + ')\"><img src=\"images/profile/' + enemyIMG + '.png\" /><p>' + enemyName + '</p></a>');

					//PC 키패드 숫자면 아래를 사용
					//$('div:nth-of-type(' + ((row - 1) * 3 + column) + ')', '.carousel-slide:last-child > .wave-grid').html('<a href=\"javascript:show_enemynew(\'new\', \'' + enemyIndex + '\', ' + enemyLVL + ')\"><img src=\"images/profile/' + enemyIMG + '.png\" /><p>' + enemyName + '</p></a>');
				}
			}
		}
	}

	//모든 작업이 완료되면 맨 처음의 더미 웨이브를 제거
	$('.carousel-indicator').first().remove();
	$('.carousel-slide').first().remove();

	//역순으로 각 웨이브마다 첫번째 그룹 초기화
	for(var i=0; i<stageData.wave.length; i++)
	{
		$('.carousel-slide').eq(2-i).addClass('carousel-slide-active');
		changeGroup(0);
		$('.carousel-slide').eq(2-i).removeClass('carousel-slide-active');
	}
	
	//초기위치인 웨이브 1으로 이동
	changeWave(0);
}

//웨이브 이동 함수
function changeWave(index)
{
	//현재 웨이브 슬라이드의 활성화 삭제, 이동할 웨이브 슬라이드 활성화
	$('.carousel-slide-active').removeClass('carousel-slide-active');
	$('.carousel-slide').eq(index).addClass('carousel-slide-active');
	//상단 웨이브 표시도 똑같이 활성화
	$('.carousel-indicator-active').removeClass('carousel-indicator-active');
	$('.carousel-indicator').eq(index).addClass('carousel-indicator-active');
	//비활성화된 좌우 화살표가 있을 경우 비활성화 해제
	$('.carousel-control-wave.control-end').removeClass('control-end');
	//좌우 화살표 링크 재지정
	$('.carousel-control-wave.carousel-control-left').attr("href", "#wave" + (index - 1));
	$('.carousel-control-wave.carousel-control-right').attr("href", "#wave" + (index + 1));
	//첫 웨이브일 시 왼쪽 화상표 비활성화
	if ($('.carousel-control-wave.carousel-control-left').attr("href") == "#wave-1")
	{
		$('.carousel-control-wave.carousel-control-left').addClass("control-end");
	}
	//마지막 화살표일 시 오른쪽 화살표 비활성화
	if ($('.carousel-control-wave.carousel-control-right').attr("href") == "#wave" + $('.carousel-slide').length)
	{
		$('.carousel-control-wave.carousel-control-right').addClass("control-end");
	}
	//현재 웨이브 위치로 애니메이션 이동
	$('.carousel-track-wave').css("transform", "translateX(" + (-100 * index) + "%)");
}

//그룹 이동 함수
function changeGroup(index)
{
	var wave = $('.carousel-slide-active').index();
	//현재 그리드의 활성화 삭제, 이동할 그리드 활성화
	$('.wave-grid-active').removeClass('wave-grid-active');
	$('.carousel-slide').eq(wave).find('.wave-grid').eq(index).addClass('wave-grid-active');
	//비활성화된 상하 화살표가 있을 경우 비활성화 해제
	$('.carousel-slide').eq(wave).find('.carousel-control-group.control-end').removeClass('control-end');
	//상하 화살표 링크 재지정
	$('.carousel-slide').eq(wave).find('.carousel-control-group.carousel-control-top').attr("href", "#group" + (index - 1));
	$('.carousel-slide').eq(wave).find('.carousel-control-group.carousel-control-bottom').attr("href", "#group" + (index + 1));
	//첫 그룹일 시 위쪽 화상표 비활성화
	if ($('.carousel-slide').eq(wave).find('.carousel-control-group.carousel-control-top').attr("href") == "#group-1")
	{
		$('.carousel-slide').eq(wave).find('.carousel-control-group.carousel-control-top').addClass("control-end");
	}
	//마지막 그룹일 시 아래쪽 화살표 비활성화
	if ($('.carousel-slide').eq(wave).find('.carousel-control-group.carousel-control-bottom').attr("href") == "#group" + $('.carousel-slide').eq(wave).find('.wave-grid').length)
	{
		$('.carousel-slide').eq(wave).find('.carousel-control-group.carousel-control-bottom').addClass("control-end");
	}
	//현재 그룹 위치로 애니메이션 이동
	var translateheight = window.innerWidth>540 ? 500 : window.innerWidth*0.925;
	$('.carousel-slide').eq(wave).find('.carousel-track-vertical').css("transform", "translateY(" + (-translateheight * index) + "px)");
}

//적 정보 팝업 띄우는 함수
function show_enemynew(type, enemyIndex, LVL)
{
	var popupX = (window.screen.width / 2) - (540 / 2);
	var popupY = (window.screen.height / 2) - (450 / 2);
	window.open('enemy.html?type=' + type + '&enemy=' + enemyIndex + '&lvl=' + LVL, "popup_enemy", 'status=no, height=450, width=540, left=' + popupX + ', top=' + popupY + ', screenX=' + popupX + ', screenY= ' + popupY);
}