import Card from "./Card";
import Deck from "./Deck";

export default class StudyMode
{
    private deck: Deck;

    constructor()
    {
        // TEST ONLY CODE
        this.deck = new Deck();
        let card: Card = new Card();
        card.setQuestion("What is 2+{number: x, 0, 10?");
        card.setAnswer("{function: SUM(2, x)}");
        card.reset();
        this.deck.addCard(card);
        card = new Card();
        card.setQuestion("TEST2");
        card.setAnswer("TEST2_ANSWER");
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


    evaluateAnswer(answer: string)
    {
        return this.deck.getCurrentCard().evaluateAnswer(answer);
    }

    goToNextCard()
    {
        console.log("moving to next");
        this.deck.moveToNext();
        console.log(this.deck.getCurrentCard().getQuestion());
    }

    goToPrevious()
    {
        this.deck.moveToPrevious();
    }
}