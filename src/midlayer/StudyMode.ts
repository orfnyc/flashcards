import Card from "./Card";
import Deck from "./Deck";

export default class StudyMode
{
    private deck: Deck;

    constructor()
    {
        this.deck = new Deck();
        let card: Card = new Card();
        card.setQuestion("TEST");
        card.setAnswer("TEST_ANSWER");
        this.deck.addCard(card);
    }

    getCardQuestion(): String
    {
        return this.deck.getCurrentCard().getQuestion();
    }

    getCardAnswer()
    {
        return this.deck.getCurrentCard().getAnswer();
    }

    evaluateAnswer(answer: String)
    {
        console.log("gggggg");
        console.log(this.deck.getCurrentCard().evaluateAnswer(answer));
    }
}