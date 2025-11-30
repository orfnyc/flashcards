import Card from './Card';

export default class Deck
{
    private title: string
    private cards: Card[]
    private index: number

    constructor()
    {
        this.cards = [];
        this.title = "";
        this.index = 0;
    }

    /**
     * Accessor for the cards array
     * @returns array of Card elements
     */
    getCards()
    {
        return this.cards;
    }

    /**
     * Accessor for the title attribute
     * @returns title string
     */
    getTitle()
    {
        return this.title;
    }

    /**
     * Increments current card index, looping to front if necessary
     */
    moveToNext()
    {
        this.index++;
        if (this.index >= this.cards.length) { this.index = 0 };
        return this.index;
    }

    /**
     * Decrements current card index, looping to back if necessary
     */
    moveToPrevious()
    {
        this.index--;
        if (this.index < 0) { this.index = this.cards.length-1 };
    }

    /**
     * Accessor for the Card element at the current index
     * @returns current Card element
     */
    getCurrentCard(): Card
    {
        return this.cards[this.index];
    }

    /**
     * Adds a card to the deck
     * @param c the card to be added
     */
    addCard(c: Card)
    {
        this.cards.push(c);
    } 
}