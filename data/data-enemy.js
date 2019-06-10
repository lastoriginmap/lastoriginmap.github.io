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
                "description": "머신건 견제 사격으로 <span id='askillpower1'></span>피해를 줍니다. 일정 확률로 2라운드 동안 대상의 회피를 낮춥니다.",
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
                "description": "머신건을 조준 사격해 <span id='askillpower2'></span>피해를 줍니다. 대상이 회피 감소 상태인 경우, 피해량이 증가합니다.",
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
                "description": "방패로 내리쳐 <span id='askillpower1'></span>피해를 줍니다.",
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
                "description": "미사일을 발사해 <span id='askillpower1'></span>피해를 줍니다. 대상이 이동 불가 상태면 직격해 피해량이 증가합니다.",
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
                "description": "미사일 근접 사격으로 <span id='askillpower2'></span>피해를 줍니다. 대상이 이동 불가 상태면 직격해 피해량이 증가합니다.",
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
                "description": "목표를 공격 대상으로 지정해 <span id='askillpower1'></span>피해를 주고, 2라운드 동안 표식 상태로 만듭니다. 표식 상태인 대상인 추가 피해를 받으며, 회피가 감소합니다.",
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
        "name": "빅 칙",
        "img": "BigChick",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "중 기관총 사격",
                "img": "MGShot",
                "range": 4,
                "description": "중 기관총으로 <span id='askillpower1'></span>피해를 줍니다. 대상이 방어력 감소 상태인 경우, 피해량이 증가합니다.",
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
                "description": "중 기관총 근접 사격으로 <span id='askillpower2'></span>피해를 줍니다. 대상의 방어력을 일정 비율 무시하며, 방어력 감소 상태인 경우 피해량이 증가합니다.",
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
                "img": "ChargeShot",
                "range": 6,
                "description": "레일건 저격으로 <span id='askillpower1'></span>피해를 줍니다.",
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
        "name": "강화형 나이트 칙",
        "img": "NightChick",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "강화 머신건 사격",
                "img": "ARShot",
                "range": 4,
                "description": "머신건 사격으로 <span id='askillpower1'></span>피해를 줍니다. 2라운드 동안 대상의 회피를 낮춥니다.",
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
                "description": "머신건을 조준 사격해 <span id='askillpower2'></span>피해를 줍니다. 대상이 회피 감소 상태인 경우, 피해량이 증가합니다.",
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
        "name": "강화형 칙 런처",
        "img": "NightChickM",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "강화 미사일 공격",
                "img": "Missile",
                "range": 2,
                "description": "미사일을 발사해 <span id='askillpower1'></span>피해를 줍니다. 대상이 이동 불가 상태면 직격으로 피해량이 증가합니다.",
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
                "description": "미사일 근접 사격으로 <span id='askillpower2'></span>피해를 줍니다. 대상이 이동 불가 상태면 직격으로 피해량이 증가합니다.",
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
                "description": "방패로 강타해 <span id='askillpower1'></span>피해를 줍니다. 대상이 회피 감소 상태면 일정 확률로 행동 불가 상태로 만듭니다.",
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
        "name": "칙 스나이퍼",
        "img": "NightChickSP",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "정조준 저격",
                "img": "Snipe",
                "range": 4,
                "description": "보호 효과를 무시하는 저격으로 <span id='askillpower1'></span>피해를 줍니다. 대상이 이동 불가 상태면 정밀 사격으로 피해량이 증가합니다.",
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
        "name": "시작형 빅 칙",
        "img": "BigChick",
        "skills": [
            {
                "title": "askill1",
                "type": "active",
                "name": "칙 중 기관포 발사",
                "img": "MGShot",
                "range": 4,
                "description": "중 기관총으로 <span id='askillpower1'></span>피해를 줍니다. 대상이 방어력 감소 상태인 경우, 피해량이 증가합니다.",
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
                "description": "중 기관총 근접 사격으로 방어력을 일정 비율 무시하는 <span id='askillpower2'></span>피해를 줍니다. 대상이 방어력 감소 상태인 경우, 피해량이 증가합니다.",
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
                "description": "1라운드 후 착탄하여 <span id='askillpower1'></span>피해를 주는 미사일을 발사합니다. 대상이 이동 불가 상태인 경우, 직격해 피해량이 증가합니다.",
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
                "description": "지정 범위에 <span id='askillpower2'></span>피해를 주는 마이크로 미사일을 발사합니다. 보호 효과를 무시하며 대상이 이동 불가 상태인 경우, 직격해 피해량이 증가합니다.",
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
    }
];
