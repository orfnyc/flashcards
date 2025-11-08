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
                if (parameters.length <= 3)
                {
                    parameters.push("0");
                }
                this.variables[parameters[0].trim()] = (Math.random()*(max-min+1)+min).toFixed(parseInt(parameters[3])).toString();
            }
        }
        console.log(this.variables);
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

    evalFunction(str: string): string
    {
        console.log("HERE"+str);
        console.log("HEWWO");
        let func = str.substring(0,str.indexOf("("));
        let parameters: string[] = [];
        let current = '';
        let depth = 0;
        for (let char of str.substring(str.indexOf("(")+1, str.length-1))
        {
            if (char === '(')
            {
                depth++;
                current += char;
            }
            else if (char === ')')
            {
                depth--;
                current += char;
            }
            else if (char === ',' && depth === 0) 
            {
                parameters.push(current.trim());
                current = '';
            } 
            else 
            {
                current += char;
            }

        }
        parameters.push(current);
        console.log(func);
        console.log("PARAMS: " + parameters);
        
        // process variable and function parameters
        for (let i in parameters)
        {
            if (parameters[i].includes("("))
            {
                parameters[i] = this.evalFunction(parameters[i]);
            }
            if (parameters[i] in this.variables)
            {
                parameters[i] = this.variables[parameters[i]];
            }
        }

        console.log(func);
        console.log("POSTPARAM: " + parameters);
        if (func === "SUM")
        {
            let res: number = 0;
            for (let i in parameters)
            {
                res += parseFloat(parameters[i]);
            }
            console.log(res);
            return parseFloat(res.toFixed(8)).toString();
        }
        else if (func === "PRODUCT")
        {
            let res: number = 1;
            for (let i in parameters)
            {
                res *= parseFloat(parameters[i]);
            }
            return parseFloat(res.toFixed(8)).toString();
        }
        else if (func === "DIVIDE")
        {
            return (parseInt(parameters[0]) / parseInt(parameters[1])).toString();
        }
        else if (func === "SUBTRACT")
        {
            return (parseInt(parameters[0]) - parseInt(parameters[1])).toString();
        }
        else if (func === "AVERAGE")
        {
            if (parameters.length === 0)
            {
                return (0).toString();
            }
            let total = 0;
            for (let i in parameters)
            {
                total += parseInt(parameters[i]);
            }
            return (total / parameters.length).toString();
        }
        return "";
    }

    getQuestion(): string
    {
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
        return this.arrayToString(this.answer);
    }

    getAnswerRaw(): string
    {
        let result: string = "";
        for (let i in this.answer)
        {
            let token = this.answer[i];
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

    evaluateAnswer(a: string)
    {
        return this.arrayToString(this.answer) === a;
    }
}