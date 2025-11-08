import Card from "./Card";
import Deck from "./Deck";
import { getOwnedDecksField } from "../storage/storestring";
export default class StudyMode
{
    private deck: Deck;

    constructor()
    {
        getOwnedDecksField();
        // TEST ONLY CODE
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