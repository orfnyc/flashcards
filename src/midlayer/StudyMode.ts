import Card from "./Card";
import Deck from "./Deck";
import { GetCardArray } from "../storage/storestring";
export default class StudyMode
{
    private deck: Deck;

    constructor()
    {
        // getOwnedDecksField();
        // TEST ONLY CODE
        this.deck = new Deck();
    }

    async init()
    {
        const [deckDoc, id] =  await GetCardArray(); // get from db
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