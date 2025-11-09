import Card from "./Card";
import Deck from "./Deck";
import { getOwnedDecksField } from "../storage/storestring";
export default class StudyMode
{
    private deck: Deck;

    constructor()
    {
        // getOwnedDecksField();
        // TEST ONLY CODE
        this.deck = new Deck();
        let card: Card = new Card();
        card.setQuestion("What is the total area of a field with length {number: x, 1, 10, 1} meters and width {number: y, 1, 10, 1} meters, added to a field with area {number: z, 0, 10)} meters squared?");
        card.setAnswer("{function: SUM(PRODUCT(x,y),z)} meters squared");
        card.reset();
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
        this.deck.getCurrentCard().reset();
        console.log(this.deck.getCurrentCard().getQuestion());
    }

    goToPrevious()
    {
        this.deck.moveToPrevious();
    }
}