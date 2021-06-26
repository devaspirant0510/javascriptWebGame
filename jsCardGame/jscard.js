const rival_cost = document.querySelector("#rival-cost");
const my_cost = document.querySelector("#my-cost")

const my_cards = document.querySelector("#my-cards");
const rival_cards = document.querySelector("#rival-cards");

const my_deck = document.querySelector("#my-deck");
const rival_deck = document.querySelector("#rival-deck");

const my_hero = document.querySelector("#my-hero");
const rival_hero = document.querySelector("#rival-hero");

const turn_button = document.querySelector("#turn-button");

let turn = true;
let turnCount = 0;

// 내 손패 카드리스트
let myCardList = [];
// 상대 손패 카드 리스트
let rivalCardList = [];
// 내 필드 리스트
let myFieldList = [];
// 상대 필드 리스트
let rivalFieldList = []

/**
 * 화면에 UI 그려줌
 * @param tag UI 그려줄 부모 태그
 * @param card 카드 정보
 * @param rival
 * @returns {Node} 추가된 태그
 */
function uiUpdate(tag, card, rival) {
    // 카드에 관련된 속성 가져옴
    const card_tag = document.querySelector(".card-hidden .card").cloneNode(true);
    // 카드 정보에 hero 값이 true 인경우
    if (card.hero) {
        // hero 는 hp 만 있기때문에 공격력과 코스트는 삭제
        card_tag.querySelector(".card-cost").style.display = "none";
        card_tag.querySelector(".card-atk").style.display = "none";
        card_tag.querySelector(".card-hp").textContent = card.hp;
        // hero 의 이름 추가
        const div_name = document.createElement("div");
        div_name.textContent = card.name;
        div_name.style.fontSize = "12px";
        // 카드 속성에 이름 추가
        card_tag.appendChild(div_name);
    }
    // 일반 카드인경우 카드 속성에 있는값 그대로 업데이트 시킴
    else {
        if (rival) {
            card_tag.querySelector(".card-cost").style.display = "none";
            card_tag.querySelector(".card-atk").style.display = "none";
            card_tag.querySelector(".card-hp").style.display = "none";

        }
        card_tag.querySelector(".card-cost").textContent = card.cost;
        card_tag.querySelector(".card-hp").textContent = card.hp;
        card_tag.querySelector(".card-atk").textContent = card.atk;
    }
    // 부모태그에 자식 태그 추가
    tag.appendChild(card_tag);
    // 자식 태그 추가
    return card_tag;
}

/**
 * 내 카드 필드에 추가
 * @param len 추가할 개수
 */
const eventList = [];
function addMyCard(len) {
    for (let i = 0; i < len; i++) {
        const newCard = createCard(false);
        myCardList.push(newCard);
    }
    for (let i = 0; i < len; i++) {
        // UI 에 업데이트 시키고 업데이트 시킨 정보 리턴받음
        const cardEvent = uiUpdate(my_deck, myCardList[i], false);
        eventList.push(cardEvent);
        // 리턴받은 카드에 이벤트 처리
        // 내턴일때만 이벤트 처리

    }
    updateEvent(eventList);
}

function updateEvent(list) {
    for (let i = 0; i < list.length; i++) {
        list[i].addEventListener('click', () => {
            if (turn) {
                let currentCost = Number(my_cost.textContent);
                currentCost -= list[i].querySelector(".card-cost").textContent;
                if (currentCost < 0) {
                    alert("코스트가 부족합니다.")
                } else {
                    my_cost.textContent = currentCost.toString();
                    myFieldList.push(list[i]);
                    uiUpdate(my_cards, myCardList[i]);
                    myCardList.splice(i, 1);
                    my_deck.innerHTML = "";
                    const eventList = [];
                    for (let j = 0; j < myCardList.length; j++) {

                        const getEvent = uiUpdate(my_deck, myCardList[j], false);
                        eventList.push(getEvent);


                    }
                    updateEvent(eventList);
                }
            }

        })

    }
}

/**
 * 상대카드 필드에 추가
 * @param len 추가할 개수
 */
function addRivalCard(len) {
    for (let i = 0; i < len; i++) {
        const newCard = createCard(false);
        rivalCardList.push(newCard);
        const cardEvent = uiUpdate(rival_deck, newCard, true);
        cardEvent.addEventListener("click", evt => {
        });
    }
}

/**
 * 내 영웅 추가
 * @param name 영웅 이름
 */
function addMyHero(name) {
    // 카드 생성시 hero 는 true 로 주고 이름값도 같이 넘겨줌
    const newCard = createCard(true, name);
    const heroCard = uiUpdate(my_hero, newCard, false);
    heroCard.addEventListener("click", evt => {
    });
}

/**
 * 상대 영웅 추가
 * @param name 상대 영웅 이름
 */
function addRivalHero(name) {
    const newCard = createCard(true, name);
    console.log(newCard.hero);
    uiUpdate(rival_hero, newCard, false);
}

function Card(hero, name, rival) {
    // hero 값이 True 일경우
    if (hero) {
        // 체력 범위 늘림
        this.hp = Math.ceil(Math.random() * 5) + 15;
        // hero 값 true name 값 지정
        this.hero = true;
        this.name = name
    }
    // 일반 카드인 경우
    else {
        this.atk = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = (this.atk + this.hp) / 2;
    }
}

// 팩토리 패턴
function createCard(hero, name) {
    return new Card(hero, name);
}

/**
 * 내패에 카드 추가
 * @param tag 추가시킬 필드
 * @param num 추가시킬 카드 장수
 */
function drawCard(tag, num) {
    for (let i = 0; i < num; i++) {
        const newCard = createCard(false, null);
        const eventList = [];
        if (tag === my_deck) {
            const myCardEvent = uiUpdate(tag, newCard, false);
            myCardList.push(newCard);
            eventList.push(myCardEvent);

        } else {

        }
        updateEvent(eventList);

    }

}

/**
 * 초기화면 세팅
 */
function init() {
    addMyCard(3);
    addRivalCard(3);
    addMyHero("내영웅");
    addRivalHero("상대영웅")

}

init();
console.log(turn)
turn_button.addEventListener("click", () => {
    turn = !turn
    if (turn) {
        addMyCard(1);
    } else {
        drawCard(rival_deck, 1);
    }


})