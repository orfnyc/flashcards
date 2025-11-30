import Card from "./Card";
import Deck from "./Deck";
import { GetCardArray } from "../storage/storestring";
export default class StudyMode
{
    private deck: Deck;

    /**
     * Constructor creates a blank and empty deck
     */
    constructor()
    {
        this.deck = new Deck();
    }

    /**
     * Initializes the deck from DB data
     */
    async init()
    {
        const [deckDoc] =  await GetCardArray(); // get from db
        GetCardArray().then((deckDoc: string[]) => {
            console.log(deckDoc);
        })
        for (let i in deckDoc)
        {
            let card = new Card();
            card.setQuestion(deckDoc[i].substring(0, deckDoc[i].indexOf("&@")));
            card.setAnswer(deckDoc[i].substring(deckDoc[i].indexOf("&@")+2));
            this.deck.addCard(card);
            card.reset();
        }
    }

    /**
     * Accessor for the current cards question
     * @returns the question on the Card at the current index
     */
    getCardQuestion(): string
    {
        return this.deck.getCurrentCard().getQuestion();
    }

     /**
     * Accessor for the current cards answer
     * @returns the answer on the Card at the current index
     */
    getCardAnswer(): String
    {
        return this.deck.getCurrentCard().getAnswer();
    }

    /**
     * Evaluates the inputted answer
     * @returns True if the answer matches the card answer, false otherwise
     */
    evaluateAnswer(answer: string)
    {
        return this.deck.getCurrentCard().evaluateAnswer(answer);
    }

    /**
     * Increments the current index and rerolls variables on the new current card
     */
    goToNextCard()
    {
        this.deck.moveToNext();
        this.deck.getCurrentCard().reset();
        console.log(this.deck.getCurrentCard().getQuestion());
    }

    /**
     * Decrements the current index
     */
    goToPrevious()
    {
        this.deck.moveToPrevious();
    }
}