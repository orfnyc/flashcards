import Card from './Card'

export default class Deck
{
    private title: String
    private cards: Card[]
    private index: number
    private id: number
    private owner: String

    constructor()
    {
        this.id = 0;
        this.cards = [];
        this.title = "";
        this.owner = "";
        this.index = 0;
    }

    getCards()
    {
        return this.cards;
    }

    getTitle()
    {
        return this.title;
    }

    moveToNext()
    {
        this.index++;
        if (this.index >= this.cards.length) { this.index = 0 };
        return this.index;
    }

    getCurrentCard()
    {
        return this.cards[this.index];
    }

    addCard(card: Card)
    {
        this.cards.push(card);
    }

    
}