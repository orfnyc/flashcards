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
        card.setQuestion("TEST");
        card.setAnswer("TEST_ANSWER");
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

    getCardAnswer()
    {
        return this.deck.getCurrentCard().getAnswer();
    }

    evaluateAnswer(answer: string)
    {
        console.log(this.deck.getCurrentCard().evaluateAnswer(answer));
    }

    goToNextCard()
    {
        this.deck.moveToNext();
        console.log(this.deck.getCurrentCard().getQuestion());
    }

    goToPrevious()
    {
        this.deck.moveToPrevious();
    }
}