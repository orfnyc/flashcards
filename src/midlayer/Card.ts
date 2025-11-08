import { stringLength } from "@firebase/util";

export default class Card
{
    private question: string[];
    private answer: string[];
    private variables: Record<string, string> = {}

    constructor()
    {
        this.answer = [];
        this.question = [];
    }

    reset()
    {
        for (let i in [...this.question,...this.answer])
        {
            let token = [...this.question,...this.answer][i];
            let splitIndex = token.indexOf(":");
            let type = token.substring(0, splitIndex);
            if (type === "number")
            {
                let parameters = token.substring(splitIndex+1).split(",");
                let max = parseInt(parameters[2]);
                let min = parseInt(parameters[1]);
                console.log(parameters[0]);
                this.variables[parameters[0].trim()] = Math.floor(Math.random()*(max-min+1)+min).toString();
                console.log(this.variables);
            }
        }
    }

    setQuestion(q: string)
    {
        this.question = this.strToArray(q);
    }

    setAnswer(a: string)
    {
        this.answer = this.strToArray(a);
    }

    strToArray(str: string)
    {
        let tokens: string[] = str.split(/\{|\}/);
        return tokens;
    }

    arrayToString(arr: string[])
    {
        let result: string = "";
        for (let i in arr)
        {
            let token = arr[i];
            let splitIndex = token.indexOf(":");
            let type = token.substring(0, splitIndex);
            if (type === "text")
            {
                result += token.substring(splitIndex+1)
            }
            else if (type === "number")
            {
                result += this.variables[token.substring(splitIndex+1).split(",")[0].trim()];
            }
            else if (type === "function")
            {
                result += this.evalFunction(token.substring(splitIndex+1).replace(/\s/g,''));
            }
            else if (type === "var")
            {
                result += this.variables[token.substring(splitIndex+1).trim()];
            }
            else
            {
                result += token;
            }
        }
        return result;
    }

    evalFunction(str: string)
    {
        console.log(str);
        let func = str.substring(0,str.indexOf("("));
        let parameters = str.substring(str.indexOf("(")+1, str.indexOf(")")).split(",");
        console.log(func);
        console.log(parameters);
        if (func === "SUM")
        {
            let res: number = 0;
            for (let i in parameters)
            {
                if (parseInt(parameters[i]).toString() !== parameters[i])
                {
                    parameters[i] = this.variables[parameters[i]];
                }
                res += parseInt(parameters[i]);
            }
            return res;
        }
        if (func === "PRODUCT")
        {
            let res: number = 1;
            for (let i in parameters)
            {
                if (parseInt(parameters[i]).toString() !== parameters[i])
                {
                    parameters[i] = this.variables[parameters[i]];
                }
                res *= parseInt(parameters[i]);
            }
            return res;
        }
        if (func === "DIVIDE")
        {
            for (let i in parameters)
            {
                if (parseInt(parameters[i]).toString() !== parameters[i])
                {
                    parameters[i] = this.variables[parameters[i]];
                }
            }
            return (parseInt(parameters[0]) / parseInt(parameters[1])).toString();
        }
        return "";
    }

    getQuestion(): string
    {
        console.log("getQuestion");
        return this.arrayToString(this.question);
    }

    getQuestionRaw(): string
    {
        let result: string = "";
        for (let i in this.question)
        {
            let token = this.question[i];
            let splitIndex = token.indexOf(":");
            let type = token.substring(0, splitIndex);
            if (type === "text")
            {
                result += token.substring(splitIndex+1);
            }
            else
            {
                result += "{" + token + "}";
            }
        }
        return result; 
    }

    getAnswer(): string
    {
        console.log("getAnswer");
        return this.arrayToString(this.answer);
    }

    evaluateAnswer(a: string)
    {
        return this.arrayToString(this.answer) === a;
    }
}