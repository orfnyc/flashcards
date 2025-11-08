export default class Card
{
    private question: string
    private answer: string

    constructor()
    {
        this.answer = "";
        this.question = "";
    }

    setQuestion(q: string)
    {
        this.question = q;
    }

    setAnswer(a: string)
    {
        this.answer = a;
    }

    getQuestion()
    {
        return this.question;
    }

    getAnswer()
    {
        return this.answer;
    }

    evaluateAnswer(a: string)
    {
        return this.answer === a;
    }
}