import Deck from './Deck';
import Card from './Card';
import { GetCardArray } from '../storage/storestring';
import { overRideArr } from '../storage/storestring';
export default class CreateMode
{
    private deck: Deck;
    private deckid: string;
    
    constructor()
    {
        this.deck = new Deck();
        this.deckid = "";
    }

    async init()
    {
        const [deckDoc, id] =  await GetCardArray(); // get from db
        this.deckid = id;
        GetCardArray().then((deckDoc: string[]) => {
            console.log(deckDoc);
        })
        for (let i in deckDoc)
        {
            let card = new Card();
            card.setQuestion(deckDoc[i].substring(0, deckDoc[i].indexOf("&@")));
            card.setAnswer(deckDoc[i].substring(deckDoc[i].indexOf("&@")+2));
            this.deck.addCard(card);
        }
    }

    addCard(question: string, answer: string)
    {
        let card: Card = new Card();
        card.setQuestion(question);
        card.setAnswer(answer);
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

    getCardQuestionRaw(): string
    {
        return this.deck.getCurrentCard().getQuestionRaw();
    }

    getCardAnswerRaw(): string
    {
        return this.deck.getCurrentCard().getAnswerRaw();
    }

    setCardQuestion(str: string)
    {
        this.deck.getCurrentCard().setQuestion(str);
    }

    setCardAnswer(str: string)
    {
        this.deck.getCurrentCard().setAnswer(str);
    }

    goToNextCard()
    {
        this.deck.moveToNext();
    }

    goToPrevious()
    {
        this.deck.moveToPrevious();
    }

    getDeck()
    {
        return this.deck;
    }

    saveCard()
    {
        console.log(this.getCardQuestionRaw())
        console.log(this.getCardAnswerRaw())
        if (this.getCardQuestionRaw().length !== 0 && this.getCardAnswerRaw().length !== 0)
        {
            let c_arr: string[] = [];
            let cards = this.deck.getCards();
            for (let i in cards)
            {
                if (cards[i].getQuestionRaw().length !== 0 && cards[i].getAnswerRaw().length !== 0)
                {
                    c_arr.push(cards[i].getQuestionRaw()+"&@"+cards[i].getAnswerRaw());
                }
            }
            overRideArr(this.deckid, c_arr);
        }
    }
}