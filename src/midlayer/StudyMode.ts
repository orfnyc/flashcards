import Card from "./Card";
import Deck from "./Deck";

export default class StudyMode
{
    private deck: Deck;

    constructor()
    {
        this.deck = new Deck();
        let card: Card = new Card();
        card.setQuestion("What is 5 + 5");
        card.setAnswer("10");
        this.deck.addCard(card);
    }

    getCardQuestion(): String
    {
        return this.deck.getCurrentCard().getQuestion();
    }

    getCardAnswer(): String
    {
        return this.deck.getCurrentCard().getAnswer();
    }

    evaluateAnswer(answer: String)
    {
        return (answer === this.getCardAnswer())
    }
}