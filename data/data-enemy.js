var enemyDataArr = [
    {
        "name": "나이트 칙",
        "img": "NightChick",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "머신건 견제 사격",
                "img": "ARShot",
                "range": 3,
                "description": "머신건 견제 사격으로 <span id='askillpower1'></span> 피해를 줍니다. 일정 확률로 2라운드 동안 대상의 회피를 낮춥니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "머신건 연사",
                "img": "ARShot",
                "range": 2,
                "description": "머신건을 조준 사격해 <span id='askillpower2'></span> 피해를 줍니다. 대상이 회피 감소 상태인 경우, 피해량이 증가합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "정조준",
                "img": "Snipe",
                "range": 0,
                "description": "대기 시, 적을 조준해 2라운드 동안 적중과 사거리가 증가합니다.",
                "areadata": [
                    5
                ]
            }
        ]
    },
    {
        "name": "나이트 칙 실더",
        "img": "NightChickS",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "방패 내려치기",
                "img": "MeleeAttack",
                "range": 2,
                "description": "방패로 내리쳐 <span id='askillpower1'></span> 피해를 줍니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "칙 방패 방어술",
                "img": "SelfDefBuff",
                "range": 6,
                "description": "방패를 올려 3라운드 동안 받는 피해가 감소합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "칙 커버링",
                "img": "TeamDefBuff",
                "range": 0,
                "description": "라운드 개시 시, 칙 방패 방어술이 적용된 상태면 바로 뒤에 있는 아군 1기를 보호합니다.",
                "areadata": [
                    6
                ]
            }
        ]
    },
    {
        "name": "나이트 칙 런처",
        "img": "NightChickM",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "미사일 공격",
                "img": "Missile",
                "range": 2,
                "description": "미사일을 발사해 <span id='askillpower1'></span> 피해를 줍니다. 대상이 이동 불가 상태면 직격해 피해량이 증가합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "미사일 집중 공격",
                "img": "Missile",
                "range": 1,
                "description": "미사일 근접 사격으로 <span id='askillpower2'></span> 피해를 줍니다. 대상이 이동 불가 상태면 직격해 피해량이 증가합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "목표 록온",
                "img": "Snipe",
                "range": 0,
                "description": "대기 시, 주변의 적을 록온해 2라운드 동안 사거리가 증가합니다.",
                "areadata": [
                    5
                ]
            }
        ]
    },
    {
        "name": "나이트 칙 디텍터",
        "img": "NightChickDE",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "약점 포착",
                "img": "ARShot",
                "range": 4,
                "description": "목표를 공격 대상으로 지정해 <span id='askillpower1'></span> 피해를 주고, 2라운드 동안 표식 상태로 만듭니다. 표식 상태인 대상인 추가 피해를 받으며, 회피가 감소합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "섬광 탄막",
                "img": "Beam",
                "range": 4,
                "description": "지정한 위치에 섬광탄을 발사해 2라운드 동안 적중을 낮추고, 대상의 AP를 감소시킵니다.",
                "areadata": [
                    4,5
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "레이더 공유",
                "img": "TeamSpdBuff",
                "range": 0,
                "description": "피격 시, 일정 확률로 인접한 아군에게 경보를 울리며 전황을 공유합니다. 레이더를 공유 받은 경우, AP가 증가하며 2라운드 동안 사거리외 적중률이 증가합니다.",
                "areadata": [
                    2,4,6,8
                ]
            },
            {
                "title": "pskill2",
                "type": "passive",
                "name": "레이더 재밍",
                "img": "TeamAtkDeBuff",
                "range": 0,
                "description": "자신이 사망하는 경우, 주변 철충의 센서에 오류를 일으킵니다. 오류가 일어난 대상들은 적중이 크게 감소하며, 적중 강화 효과가 해제됩니다.",
                "areadata": [
                    2,4,6,8
                ]
            }
        ]
    },
	{
        "name": "스카우트",
        "img": "Scout",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "충격 미사일",
                "img": "Missile",
                "range": 2,
                "description": "충격 미사일을 발사해 <span id='askillpower1'></span> 피해를 주며, 일정 확률로 대상의 AP를 감소시킵니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "색적 보고",
                "img": "SelfSpdBuff",
                "range": 6,
                "description": "목표 아군에게 적 발견 경보를 울려 대상의 AP와 사거리를 증가시킵니다.",
                "areadata": [
                    5
                ]
            }
        ]
    },
    {
        "name": "하베스터",
        "img": "Harvester",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "폐기물 분쇄",
                "img": "MeleeAttack",
                "range": 1,
                "description": "근접 공격으로 <span id='askillpower1'></span> 피해를 줍니다. 대상이 이동 불가 상태인 경우, 대상을 강타해 피해량이 증가하며 일정 확률로 2라운드 동안 행동 불가로 만듭니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "폐기물 수거",
                "img": "Hang",
                "range": 4,
                "description": "집게로 목표 대상을 포획해 <span id='askillpower2'></span> 피해를 주며 2칸 앞으로 당깁니다. 적중 시, 2라운드 동안 행동력이 감소하며 일정 확률로 이동 불가 상태가 됩니다.",
                "areadata": [
                    5
                ]
            }
        ]
    },
    {
        "name": "나이트 칙 캐논",
        "img": "NightChickC",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "플레임 버너",
                "img": "WideFireShot",
                "range": 2,
                "description": "화염 방사로 <span id='askillpower1'></span> 화염 속성 피해를 주며, 일정 확률로 3라운드 동안 지속 화염 피해를 입는 점화 상태로 만듭니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "곡사포",
                "img": "CannonShotDelay",
                "range": 5,
                "description": "1라운드 후에 착탄하는 곡사포를 발사해 목표 범위에 <span id='askillpower2'></span>의 피해를 줍니다. 대상이 이동 불가 상태면 피해량이 증가합니다.",
                "areadata": [
                    0,0.5,0,0.5,1,0.5,0,0.5,0
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "연료 탱크 유폭",
                "img": "SuiceideBomb",
                "range": 0,
                "description": "사망 시, 연료 탱크가 유폭해 주변에 괴멸적인 피해를 주고 피해 감소 효과를 해제합니다.",
                "areadata": [
                    2,4,5,6,8
                ]
            }
        ]
    },
    {
        "name": "저거너트",
        "img": "Juggernaut",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "스턴 펀치",
                "img": "MeleeAttack",
                "range": 1,
                "description": "대상을 강타해 <span id='askillpower1'></span> 피해를 주고, 일정 확률로 행동 불가 상태로 만듭니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "몸통 박치기",
                "img": "AssaultAttack",
                "range": 2,
                "description": "대상에게 돌진해 <span id='askillpower2'></span> 피해를 주고, 뒤로 1칸 밀어냅니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "방벽 전환",
                "img": "TeamDefBuff",
                "range": 0,
                "description": "아군이 사망한 경우, 방어 태세로 전환해 2라운드 동안 행 보호와 열 보호 효과를 활성화합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill2",
                "type": "passive",
                "name": "방어 프로토콜",
                "img": "SelfDefBuff",
                "range": 0,
                "description": "피격시, 일정 확률로 방어력이 대폭 증가합니다.",
                "areadata": [
                    5
                ]
            }
        ]
    },
    {
        "name": "레기온",
        "img": "Legion",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "GAU 미니건",
                "img": "ARShot",
                "range": 4,
                "description": "미니건을 발사해 <span id='askillpower1'></span> 피해를 줍니다. 대상이 기동형인 경우, 피해량이 증가합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "점착탄",
                "img": "SlowShot",
                "range": 4,
                "description": "점착탄을 던져 <span id='askillpower2'></span> 피해를 줍니다.  적중한 대상을 2라운드 동안 이동 불가 상태로 만들고, 일정 확률로 회피 / 행동력을 감소 시킵니다. 해당 감소 효과는 강화 효과를 해제하고 적용됩니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "경계 태세",
                "img": "TeamSpdBuff",
                "range": 0,
                "description": "아군이 처치되면 경계 태세로 전환해, 양 옆의 아군의 행동력을 감소시키며 대상의 공격을 지원합니다.",
                "areadata": [
                    2,8
                ]
            }
        ]
    },
    {
        "name": "재퍼",
        "img": "Zapper",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "전격 방사",
                "img": "Shock",
                "range": 3,
                "description": "전격을 방사해 <span id='askillpower1'></span> 전기 속성 피해를 주고 일정 확률로 대상의 회피와 AP를 감소시킵니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "고압 전류",
                "img": "Shock",
                "range": 1,
                "description": "고압 전류로 <span id='askillpower2'></span> 전기 속성 피해를 주고, 일정 확률로 대상을 행동 불능 상태로 만들고 회피를 감소시킵니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "경계 모드",
                "img": "SelfDefBuff",
                "range": 0,
                "description": "적과 인접하거나 공격당하기 전까지 경계 상태로 대기합니다. 해당 상태에선 받는 피해와 행동력이 감소합니다.",
                "areadata": [
                    5
                ]
            }
        ]
    },
    {
        "name": "팔랑스",
        "img": "Phalangites",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "머신건 속사",
                "img": "ARShot",
                "range": 4,
                "description": "머신건을 발사해 <span id='askillpower1'></span> 피해를 줍니다. 대상이 기동형인 경우, 피해량이 증가합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "대열 방어",
                "img": "TeamDefBuff",
                "range": 6,
                "description": "3라운드 동안 같은 열의 아군을 보호하며, 받는 피해가 감소합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "경계 모드",
                "img": "TeamDefBuff",
                "range": 0,
                "description": "라운드 개시 시, 같은 열에 인접한 아군에게 피해 감소 효과를 부여합니다. 해당 효과는 중첩됩니다.",
                "areadata": [
                    2,8
                ]
            }
        ]
    },
    {
        "name": "센츄리온",
        "img": "Centurion",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "XM 유탄 발사기",
                "img": "GrenadeAttack_2",
                "range": 4,
                "description": "유탄을 발사해 목표 행에 <span id='askillpower1'></span> 피해를 줍니다. 대상이 이동 불가 상태인 경우, 직격해 피해량이 증가합니다.",
                "areadata": [
                    4,5,6
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "일제 공격 개시",
                "img": "Snipe",
                "range": 5,
                "description": "2라운드 동안 대상을 목표로 지정해 <span id='askillpower2'></span> 피해를 주고 표식을 남기며, 받는 피해가 증가하는 상태로 만듭니다. 보호 효과를 무시합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "반격 태세",
                "img": "DefCounter",
                "range": 0,
                "description": "아군 사망 시, 3라운드 동안 공격력과 치명타가 증가하며 반격합니다. 공격력과 치명타 증가 효과는 중첩됩니다.",
                "areadata": [
                    5
                ]
            }
        ]
    },
    {
        "name": "빅 칙",
        "img": "BigChick",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "중 기관총 사격",
                "img": "MGShot",
                "range": 4,
                "description": "중 기관총으로 <span id='askillpower1'></span> 피해를 줍니다. 대상이 방어력 감소 상태인 경우, 피해량이 증가합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "영거리 중 기관총",
                "img": "MGShot",
                "range": 1,
                "description": "중 기관총 근접 사격으로 <span id='askillpower2'></span> 피해를 줍니다. 대상의 방어력을 일정 비율 무시하며, 방어력 감소 상태인 경우 피해량이 증가합니다.",
                "areadata": [
                    5
                ]
            }
        ]
    },
    {
        "name": "풀아머 빅 칙",
        "img": "FABigChick",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "칙 중 기관포",
                "img": "MGShot",
                "range": 4,
                "description": "기관포로 <span id='askillpower1'></span> 피해를 줍니다. 대상의 방어력을 일정 비율 무시합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "듀얼 칙 캐논",
                "img": "CannonShot",
                "range": 1,
                "description": "캐논포를 연사해 목표 열에 <span id='askillpower2'></span> 피해를 줍니다. 피해 감소 효과를 무효화합니다.",
                "areadata": [
                    2,5,8
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "칙 반응 장갑",
                "img": "SelfDefBuff",
                "range": 0,
                "description": "반응 장갑으로 인해 받는 피해가 감소합니다.",
                "areadata": [
                    5
                ]
            }
        ]
    },
    {
        "name": "스토커",
        "img": "Stalker_B0108",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "저격",
                "img": "Chargeshot",
                "range": 6,
                "description": "레일건 저격으로 <span id='askillpower1'></span> 피해를 줍니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "챠지",
                "img": "SelfAtkBuff",
                "range": 6,
                "description": "레일건을 충전해, 다음 공격이 치명타로 적용되며 일정 라운드 동안 공격력이 크게 증가합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "리액터 폭발",
                "img": "SuiceideBomb",
                "range": 0,
                "description": "사망 시, 리액터가 폭발에 주변에 매우 높은 물리 피해를 줍니다.",
                "areadata": [
                    1,2,3,4,6,7,8,9
                ]
            }
        ]
    },
	{
        "name": "프레데터",
        "img": "Predator_B0208",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "후려치기",
                "img": "MeleeAttack",
                "range": 1,
                "description": "대상을 강타해 <span id='askillpower1'></span> 피해를 주고, 1칸 뒤로 밀어내며 일정 확률로 2라운드 동안 행동 불가 상태로 만듭니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "부식 용액",
                "img": "TeamDefDeBuff",
                "range": 3,
                "description": "부식 용액으로 목표 대상들에게 <span id='askillpower2'></span> 피해를 주며, 2라운드 동안 부식 상태로 만듭니다. 부식 상태인 대상은 방어력과 행동력이 감소하며, 지속 물리 피해를 입습니다. 보호 효과를 무시합니다.",
                "areadata": [
                    4,5,6
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "생존 본능",
                "img": "SelfSpdBuff",
                "range": 0,
                "description": "HP 25% 이하가 되면 받는 피해가 감소하며, 행동력 / 적중 / 효과 저항이 크게 증가합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill2",
                "type": "passive",
                "name": "마무리 공격",
                "img": "SelfAtkBuff",
                "range": 0,
                "description": "생존 본능이 발동한 상태로 공격하는 경우, 방어막과 피해 감소 효과를 무시하며 대상의 방어력을 일정 비율 무시합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill3",
                "type": "passive",
                "name": "멈출 수 없는 본능",
                "img": "SelfDefBuff",
                "range": 0,
                "description": "피격 시, 일정 확률로 이동 불가 / 행동 불가 / 행동력 감소 효과를 해제합니다.",
                "areadata": [
                    5
                ]
            }
        ]
    },
	{
        "name": "트릭스터",
        "img": "Kidnapper_B0308",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "클로 돌진",
                "img": "AssaultAttack",
                "range": 4,
                "description": "클로 돌진으로 목표와 바로 뒤의 대상에게 <span id='askillpower1'></span> 피해를 줍니다. 5라운드 동안 공격 대상의 방어력을 감소시킵니다. 최대 5번까지 중첩됩니다.",
                "areadata": [
                    4,5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "광란의 학살",
                "img": "AssaultAttack",
                "range": 5,
                "description": "순식간에 대상에게 접근해 <span id='askillpower2'></span> 피해를 줍니다. 방어막 / 피해 감소 / 보호 효과를 무시하며, 대상의 HP가 낮을수록 피해량이 증가합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "살육 쾌감",
                "img": "SelfAtkBuff",
                "range": 0,
                "description": "도발 상태일 때 공격 적중 시, 5라운드 동안 공격력이 증가합니다. 해당 효과는 5번까지 중첩됩니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill2",
                "type": "passive",
                "name": "위협 감지",
                "img": "SelfSpdBuff",
                "range": 0,
                "description": "피격 시, 위협을 감지해 해당 라운드 동안 회피가 증가하며 공격력이 감소합니다. 해당 효과는 중첩됩니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill3",
                "type": "passive",
                "name": "멈출 수 없는 본능",
                "img": "SelfSpdBuff",
                "range": 0,
                "description": "적을 처치한 경우, 3라운드 동안 행동력과 치명타가 증가합니다. 해당 효과는 중첩됩니다.",
                "areadata": [
                    5
                ]
            }
        ]
    },
    {
        "name": "강화형 나이트 칙",
        "img": "NightChick",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "강화 머신건 사격",
                "img": "ARShot",
                "range": 4,
                "description": "머신건 사격으로 <span id='askillpower1'></span> 피해를 줍니다. 2라운드 동안 대상의 회피를 낮춥니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "강화 머신건 연사",
                "img": "ARShot",
                "range": 1,
                "description": "머신건을 조준 사격해 <span id='askillpower2'></span> 피해를 줍니다. 대상이 회피 감소 상태인 경우, 피해량이 증가합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "칙 정밀 조준",
                "img": "Snipe",
                "range": 0,
                "description": "대기 시, 3라운드 동안 적중 / 사거리 / 치명타가 증가합니다.",
                "areadata": [
                    5
                ]
            }
        ]
    },
    {
        "name": "강화형 칙 런쳐",
        "img": "NightChickM",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "강화 미사일 공격",
                "img": "Missile",
                "range": 2,
                "description": "미사일을 발사해 <span id='askillpower1'></span> 피해를 줍니다. 대상이 이동 불가 상태면 직격으로 피해량이 증가합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "강화 미사일 난사",
                "img": "Missile",
                "range": 1,
                "description": "미사일 근접 사격으로 <span id='askillpower2'></span> 피해를 줍니다. 대상이 이동 불가 상태면 직격으로 피해량이 증가합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "기동 사격",
                "img": "SelfAtkBuff",
                "range": 0,
                "description": "이동 시, 4라운드 동안 사거리 / 공격력 / 행동력이 증가합니다.",
                "areadata": [
                    5
                ]
            }
        ]
    },
    {
        "name": "나이트 칙 실더 개",
        "img": "NightChickSI",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "방패 강타",
                "img": "MeleeAttack",
                "range": 2,
                "description": "방패로 강타해 <span id='askillpower1'></span> 피해를 줍니다. 대상이 회피 감소 상태면 일정 확률로 행동 불가 상태로 만듭니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "칙 가드 올리기",
                "img": "ShieldWall",
                "range": 6,
                "description": "3라운드 동안 같은 행의 뒤에 있는 아군을 보호합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "강화 방패",
                "img": "SelfDefBuff",
                "range": 0,
                "description": "방패 장갑이 강화되어 받는 피해가 감소합니다.",
                "areadata": [
                    6
                ]
            }
        ]
    },
	{
        "name": "강습형 스카우트",
        "img": "Scout",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "강화 충격탄",
                "img": "Missile",
                "range": 2,
                "description": "충격 미사일을 발사해 <span id='askillpower1'></span> 피해를 주고 대상의 AP를 감소시킵니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "색적 경보",
                "img": "Scan",
                "range": 6,
                "description": "목표 아군에게 적 발견 경보를 울려 대상의 AP와 사거리를 증가시킵니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "강습 대열",
                "img": "TeamAtkBuff",
                "range": 0,
                "description": "이동 시, 3라운드 동안 인접한 공격기의 공격을 지원하며 AP를 증가시킵니다.",
                "areadata": [
                    2,8
                ]
            }
        ]
    },
    {
        "name": "헤비 스카우트",
        "img": "Scout_V2",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "대 장갑 기관포",
                "img": "AntiArmorShot",
                "range": 2,
                "description": "대 장갑 기관포를 발사해 <span id='askillpower1'></span> 피해를 줍니다. 대상의 방어력을 일정 비율 무시하며, 방어 감소 상태인 경우 피해량이 증가합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "공습 준비",
                "img": "SelfSpdBuff",
                "range": 6,
                "description": "3라운드 동안 회피 / 치명타 / 행동력이 증가합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "공격 포메이션",
                "img": "TeamAtkBuff",
                "range": 0,
                "description": "대기 시, 같은 열에 인접한 공격기의 AP / 치명타 / 사거리 / 방어 관통을 증가시킵니다.",
                "areadata": [
                    2,5,8
                ]
            }
        ]
    },
    {
        "name": "칙 스나이퍼",
        "img": "NightChickSP",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "정조준 저격",
                "img": "Snipe",
                "range": 4,
                "description": "보호 효과를 무시하는 저격으로 <span id='askillpower1'></span> 피해를 줍니다. 대상이 이동 불가 상태면 정밀 사격으로 피해량이 증가합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "위장",
                "img": "SelfSpdBuff",
                "range": 6,
                "description": "위장 파장을 발산해 3라운드 동안 회피 / 치명타가 증가하며 받는 피해가 증가합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "대응 저격",
                "img": "DefCounter",
                "range": 0,
                "description": "라운드 개시 시, 위장 상태인 경우 반격을 활성화합니다.",
                "areadata": [
                    5
                ]
            }
        ]
    },
	{
        "name": "케미컬 칙",
        "img": "NightChickCM",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "화학탄 발사",
                "img": "Missile",
                "range": 4,
                "description": "화학 탄두를 발사해 <span id='askillpower1'></span> 피해를 줍니다. 3라운드 동안 대상을 부식 상태로 만듭니다. 부식 상태가 된 대상은 방어력 / 행동력이 감소하며 매 라운드 지속 피해를 입습니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "화학탄 난사",
                "img": "MultiMissile",
                "range": 2,
                "description": "화학 탄두를 난사해 지정 범위에 <span id='askillpower1'></span> 피해를 줍니다. 3라운드 동안 대상을 부식 상태로 만듭니다. 부식 상태가 된 대상은 방어력 / 행동력이 감소하며 매 라운드 지속 피해를 입습니다.",
                "areadata": [
                    2,5,8
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "적응 시스템",
                "img": "TeamDefBuff",
                "range": 0,
                "description": "라운드 개시 시, 자신과 인접한 아군에게 걸린 방해 효과를 해제합니다.",
                "areadata": [
                    2,4,5,6,8
                ]
            }
        ]
    },
    {
        "name": "아머드 하베스터",
        "img": "Harvester",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "폐기물 파쇄",
                "img": "MeleeAttack",
                "range": 1,
                "description": "근접 공격으로 <span id='askillpower1'></span> 피해를 줍니다. 대상이 이동 불가 상태인 경우, 대상을 강타해 피해량이 증가하며 2라운드 동안 행동 불가로 만듭니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "폐기물 수집",
                "img": "Hang",
                "range": 4,
                "description": "집게로 목표 대상을 포획해 <span id='askillpower2'></span> 피해를 주며 2칸 앞으로 당깁니다. 적중 시, 2라운드 동안 행동력이 감소하며 이동 불가 상태가 됩니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "초합금 플레이팅",
                "img": "SelfDefBuff",
                "range": 0,
                "description": "견고한 장갑으로 인해, 일정 위력 이하의 공격은 통하지 않습니다.",
                "areadata": [
                    5
                ]
            }
        ]
    },
	{
        "name": "개량형 칙 캐논",
        "img": "NightChickC",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "네이팜 분사",
                "img": "WideFireShot",
                "range": 2,
                "description": "화염 방사로 <span id='askillpower1'></span> 화염 속성 피해를 주며, 3라운드 동안 지속 화염 피해를 입는 점화 상태로 만듭니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "강화 곡사 포격",
                "img": "CannonShotDelay",
                "range": 6,
                "description": "1라운드 후에 착탄하는 곡사포를 발사해 목표 범위에 <span id='askillpower2'></span>의 피해를 줍니다. 대상이 이동 불가 상태면 피해량이 증가합니다.",
                "areadata": [
                    0,0.75,0,0.75,1,0.75,0,0.75,0
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "연료 탱크 유폭",
                "img": "SuiceideBomb",
                "range": 0,
                "description": "사망 시, 높은 확률로 연료 탱크가 유폭해 주변에 괴멸적인 피해를 주고 피해 감소 효과를 해제합니다.",
                "areadata": [
                    2,4,5,6,8
                ]
            },
            {
                "title": "pskill2",
                "type": "passive",
                "name": "조준 보정",
                "img": "SelfAtkBuff",
                "range": 0,
                "description": "공격 시, 3라운드 동안 적중이 증가합니다.",
                "areadata": [
                    2,4,5,6,8
                ]
            }
        ]
    },
    {
        "name": "정예 레기온",
        "img": "Legion",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "GAU 대공 미니건",
                "img": "ARShot",
                "range": 4,
                "description": "미니건을 발사해 <span id='askillpower1'></span> 피해를 줍니다. 대상이 기동형인 경우, 피해량이 증가합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "강화 점착탄",
                "img": "SlowShot",
                "range": 4,
                "description": "점착탄을 던져 <span id='askillpower2'></span> 피해를 주고, 일정 확률로 적중한 대상을 3라운드 동안 이동 불가 / 회피 / 행동력 감소 상태로 만듭니다. 각 효과는 해당 강화 상태를 해제합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "경계 경보",
                "img": "TeamSpdBuff",
                "range": 0,
                "description": "아군이 처치되면 경계 태세로 전환해 양 옆의 아군의 행동력을 올려주며 대상의 공격을 지원합니다.",
                "areadata": [
                    2,8
                ]
            }
        ]
    },
    {
        "name": "엘리트 센츄리온",
        "img": "Centurion",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "XM 로켓 런쳐",
                "img": "GrenadeAttack_2",
                "range": 4,
                "description": "유탄을 발사해 목표 대상들에게 <span id='askillpower1'></span> 피해를 줍니다. 대상이 이동 불가 상태인 경우, 직격해 피해량이 증가합니다.",
                "areadata": [
                    4,5,6
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "일제 공격 표식",
                "img": "Scan",
                "range": 5,
                "description": "2라운드 동안 대상을 목표로 지정해 <span id='askillpower2'></span> 피해를 주고 표식을 남기며, 받는 피해가 증가하는 상태로 만듭니다. 보호 효과를 무시합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "역습 태세",
                "img": "DefCounter",
                "range": 0,
                "description": "아군 사망 시, 3라운드 동안 공격력과 치명타가 증가하며 반격합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill2",
                "type": "passive",
                "name": "부대 재 정비",
                "img": "TeamSpdBuff",
                "range": 0,
                "description": "라운드 개시 시 역습 태세인 경우, 인접한 아군들의 행동력과 적중을 증가시킵니다.",
                "areadata": [
                    2,4,6,8
                ]
            }
        ]
    },
    {
        "name": "시작형 빅 칙",
        "img": "BigChick",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "칙 중 기관포 발사",
                "img": "MGShot",
                "range": 4,
                "description": "중 기관총으로 <span id='askillpower1'></span> 피해를 줍니다. 대상이 방어력 감소 상태인 경우, 피해량이 증가합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "영거리 중 기관포",
                "img": "MGShot",
                "range": 1,
                "description": "중 기관총 근접 사격으로 방어력을 일정 비율 무시하는 <span id='askillpower2'></span> 피해를 줍니다. 대상이 방어력 감소 상태인 경우, 피해량이 증가합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "근접 조준 사격",
                "img": "SelfAtkBuff",
                "range": 0,
                "description": "적 진영에 가까울수록, 라운드 개시 시 적중이 증가합니다.",
                "areadata": [
                    5
                ]
            }
        ]
    },
    {
        "name": "빅 칙 런쳐",
        "img": "BigChickM",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "고폭 미사일",
                "img": "CruiseMissile",
                "range": 5,
                "description": "1라운드 후 착탄하여 <span id='askillpower1'></span> 피해를 주는 미사일을 발사합니다. 대상이 이동 불가 상태인 경우, 직격해 피해량이 증가합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "마이크로 미사일",
                "img": "MultiMissile",
                "range": 1,
                "description": "지정 범위에 <span id='askillpower2'></span> 피해를 주는 마이크로 미사일을 발사합니다. 보호 효과를 무시하며 대상이 이동 불가 상태인 경우, 직격해 피해량이 증가합니다.",
                "areadata": [
                    1,4,5,7
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "유도 미사일",
                "img": "SelfAtkBuff",
                "range": 0,
                "description": "공격 대상이 기동형인 경우, 피해량이 증가합니다.",
                "areadata": [
                    5
                ]
            }
        ]
    },
    {
        "name": "FA 빅 칙 II",
        "img": "FABigChick",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "강화 중 기관포",
                "img": "MGShot",
                "range": 4,
                "description": "중 기관포로 <span id='askillpower1'></span> 피해를 줍니다. 대상의 방어력을 일정 비율 무시합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "askill2",
                "type": "active",
                "name": "듀얼 칙 캐논포",
                "img": "CannonShotWide",
                "range": 2,
                "description": "캐논포를 연사해 목표 열에 <span id='askillpower2'></span> 피해를 줍니다. 대상의 피해 감소 효과를 해제합니다.",
                "areadata": [
                    2,5,8
                ]
            },
            {
                "title": "pskill1",
                "type": "passive",
                "name": "빅 칙 반응 장갑",
                "img": "SelfDefBuff",
                "range": 0,
                "description": "반응 장갑으로 인해 받는 피해가 감소합니다.",
                "areadata": [
                    5
                ]
            },
            {
                "title": "pskill2",
                "type": "passive",
                "name": "작열탄두",
                "img": "SelfAtkBuff",
                "range": 0,
                "description": "작열탄두를 장비해 경장형에게 주는 피해가 증가합니다.",
                "areadata": [
                    5
                ]
            }
        ]
    }
];