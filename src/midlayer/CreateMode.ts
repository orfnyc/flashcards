import Deck from './Deck';
import Card from './Card';

export default class CreateMode
{
    private deck: Deck;
    
    constructor()
    {
        this.deck = new Deck();
        let sampleCard = new Card();
    }

    addCard(question: string, answer: string)
    {
        let card: Card = new Card();
        card.setQuestion(question);
        card.setAnswer(answer);
        this.deck.addCard(card);
    }

    getDeck()
    {
        return this.deck;
    }
}