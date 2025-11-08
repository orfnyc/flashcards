import Card from './Card';

export default class Deck
{
    private title: string
    private cards: Card[]
    private index: number
    private id: number
    private owner: string

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

    moveToPrevious()
    {
        this.index--;
        if (this.index < 0) { this.index = this.cards.length-1 };
    }

    getCurrentCard(): Card
    {
        return this.cards[this.index];
    }

    addCard(c: Card)
    {
        this.cards.push(c);
    } 
}