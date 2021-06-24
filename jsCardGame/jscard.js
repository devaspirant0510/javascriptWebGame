
const rival_cost = document.querySelector("#rival-cost");
const my_cost = document.querySelector("#my-cost")

const my_cards = document.querySelector("#my-cards");
const rival_cards = document.querySelector("#rival-cards");

const my_deck = document.querySelector("#my-deck");
const rival_deck = document.querySelector("#rival-deck");

const my_hero = document.querySelector("#my-hero");
const rival_hero = document.querySelector("#rival-hero");

// 내 손패 카드리스트
myCardList =[];
// 상대 손패 카드 리스트
rivalCardList = [];

/**
 * 화면에 UI 그려줌
 * @param tag UI 그려줄 부모 태그
 * @param card 카드 정보
 * @returns {Node} 추가된 태그
 */
function uiUpdate(tag,card){
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
    else{
        card_tag.querySelector(".card-cost").textContent = card.cost;
        card_tag.querySelector(".card-hp").textContent = card.hp;
        card_tag.querySelector(".card-atk").textContent = card.atk;
    }
    // 부모태그에 자식 태그 추가
    tag.appendChild(card_tag);
    // 자식 태그 추가
    return card_tag;
}
function addMyCard(len){
    for (let i = 0; i < len; i++) {
        const newCard = createCard(false);
        myCardList.push(newCard);
        const cardEvent = uiUpdate(my_deck,newCard);
        cardEvent.addEventListener("click",evt=>{
            console.log(cardEvent);
        })
    }
}
function addRivalCard(len){
    for (let i = 0; i < len; i++) {
        const newCard = createCard(false);
        rivalCardList.push(newCard);
        const cardEvent = uiUpdate(rival_deck,newCard);
        cardEvent.addEventListener("click",evt => {

        });
    }
}

function addMyHero(name){
    const newCard = createCard(true,name);
    console.log(newCard.hero);
    console.log(newCard.name)
    uiUpdate(my_hero,newCard);


}
function addRivalHero(name){
    const newCard = createCard(true,name);
    console.log(newCard.hero);
    uiUpdate(rival_hero,newCard);

}
function init(){
    addMyCard(5);
    addRivalCard(5);
    addMyHero("내영웅");
    addRivalHero("상대영웅")

}
function Card(hero,name){
    if (hero){
        this.hp = Math.ceil(Math.random()*5)+15;
        this.hero = true;
        this.name = name
    }else{
        this.atk = Math.ceil(Math.random()*5);
        this.hp = Math.ceil(Math.random()*5);
        this.cost = (this.atk+this.hp)/2;
    }
}
function createCard(hero,name){
    return new Card(hero,name);
}

init();