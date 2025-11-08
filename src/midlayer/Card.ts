export default class Card
{
    private question: String
    private answer: String

    constructor()
    {
        this.answer = "";
        this.question = "";
    }

    evaluateAnswer(answer: String)
    {
        return this.answer = answer;
    }
}