// part 1

let two = document.getElementById('2');

let three = document.getElementById('3');

async function getNumberFact(num){
    const {data} = await axios.get(`http://www.numbersapi.com/${num}?json`)
    console.log(data.text)
}

async function getMultipleNumbers(min, max){
    try{
        const {data} = await axios.get(`http://www.numbersapi.com/${min}..${max}?json`)
        for(let fact in data){
            newLi = document.createElement('li');
            newLi.innerText = data[fact];
            two.append(newLi);
        }
    } catch (e) {
        console.log('Error: ' + e)
    }
}

async function getMultipleFacts(num){
    let promises = []

    try{
        for(let i = 0; i < 5; i++){
            promises.push(axios.get(`http://www.numbersapi.com/${num}?json`))
        }

        let facts = await Promise.all(promises)

        for(let fact of facts){
            newLi = document.createElement('li');
            newLi.innerText = fact.data.text;
            three.append(newLi);        
    } 
    }catch (e) {
        console.log('Error: ', e)   
    }
}

getNumberFact(5)
getMultipleNumbers(1, 20)
getMultipleFacts(56)

// part 2

const cardPile = document.getElementById('card-pile')
const drawBtn = document.getElementById('draw-button')

class Deck {
    constructor() {
        this.deckID = null
    }

    async generateDeck() {
        const { data: deck } = await axios.get('https://deckofcardsapi.com/api/deck/new/')
        this.deckID = deck.deck_id
        await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckID}/shuffle/`)

    }

    async drawCard() {
        const { data: { cards, remaining } } = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckID}/draw/?count=1`)

        if (remaining === 0) { drawBtn.remove() }
        else {

            const imgURL = cards[0].image;

            const cardImg = document.createElement('img');
            cardImg.setAttribute('src', imgURL);
            cardImg.setAttribute('class', 'card')

            cardPile.append(cardImg)
        }
    }
}


window.addEventListener("load", async function () {

    const deck = new Deck()
    await deck.generateDeck()

    drawBtn.addEventListener('click', async function () {
        await deck.drawCard()
    })
})