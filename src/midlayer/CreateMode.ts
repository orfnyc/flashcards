import Deck from './Deck';
import Card from './Card';
export default class CreateMode
{
    private deck: Deck;
    
    constructor()
    {
        this.deck = new Deck();
    }

    addCard(question: string, answer: string)
    {
        let card: Card = new Card();
        card.setQuestion(question);
        card.setAnswer(answer);
        this.deck.addCard(card);
        
    }

    getCardQuestion(): string
    {
        return this.deck.getCurrentCard().getQuestion();
    }

    getCardAnswer(): String
    {
        return this.deck.getCurrentCard().getAnswer();
    }

    goToNextCard()
    {
        this.deck.moveToNext();
    }

    goToPrevious()
    {
        this.deck.moveToPrevious();
    }

    getDeck()
    {
        return this.deck;
    }
}