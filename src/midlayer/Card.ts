export default class Card
{
    private question: String
    private answer: String

    constructor()
    {
        this.answer = "";
        this.question = "";
    }

    setQuestion(q: String)
    {
        this.question = q;
    }

    setAnswer(a: String)
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

    evaluateAnswer(answer: String)
    {
        return this.answer = answer;
    }
}