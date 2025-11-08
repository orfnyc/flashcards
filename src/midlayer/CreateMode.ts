import Deck from './Deck';
import Card from './Card';
import AddToFlashcardArr from "../storage/storestring"
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
        AddToFlashcardArr();
    }

    getDeck()
    {
        return this.deck;
    }
}