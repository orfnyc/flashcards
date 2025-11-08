import Deck from './Deck';
import Card from './Card';
export default class CreateMode
{
    private deck: Deck;
    
    constructor()
    {
        this.deck = new Deck();
        let card: Card = new Card();
        card.setQuestion("What is {function: PRODUCT(y, 2)}/2?");
        card.setAnswer("{number: y, 0, 10}");
        card.reset();
        this.deck.addCard(card);
        card = new Card();
        card.setQuestion("What is 3+{number: y, 0, 10}?");
        card.setAnswer("{function: SUM(3, y)}");
        card.reset();
        this.deck.addCard(card);
        card = new Card();
        card.setQuestion("What is {number: x, 0, 10}*{number: y, 0, 10}?");
        card.setAnswer("{function: PRODUCT(x, y)}");
        card.reset();
        this.deck.addCard(card);        
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