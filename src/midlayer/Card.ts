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
    /**
     * Rerolls all variables in card question and answer
     */
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

    /**
     * Converts the user inputted question into the proper format and sets the question attribute to the result
     * @param q - the user inputted question string
     */
    setQuestion(q: string)
    {
        this.question = this.strToArray(q);
    }

    /**
     * Converts the user inputted answer into the proper format and sets the answer attribute to the result
     * @param q - the user inputted answer string
     */
    setAnswer(a: string)
    {
        this.answer = this.strToArray(a);
    }

    /**
     * Uses formatting rules to split a string into usable tokens
     * @param str the string to be converted
     * @returns an array of tokens representing text, variables, or functions
     */
    strToArray(str: string)
    {
        let tokens: string[] = str.split(/\{|\}/);
        for (let i in tokens)
        {
            if (!tokens[i].includes(":"))
            {
                tokens[i] = "text:" + tokens[i];
            }
        }
        return tokens;
    }

    /**
     * Processes an array of tokens into a simple string by evaluating variables and functions
     * @param arr the array of tokens
     * @returns A simple string with the appropriate elements
     */
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


    /**
     * Evaluates function tokens, including nested function tokens
     * Supports SUM, PRODUCT, SUBTRACT, DIVIDE, AVERAGE, COS, and SIN functions
     * TODO: Fix decimal imprecision issues.
     * @param str the function token to be evaluated
     * @returns a result string
     */
    evalFunction(str: string): string
    {
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
        else if (func === "SIN")
        {
            return Math.sin(parseFloat(parameters[0])*Math.PI/180).toFixed(3);
        }
        else if (func === "COS")
        {
            console.log(parameters[0]);
            return Math.cos(parseFloat(parameters[0])*Math.PI/180).toFixed(3);
        }        
        return "";
    }

    /**
     * Accessor for the question string with all tokens evaluated
     * @returns string
     */
    getQuestion(): string
    {
        return this.arrayToString(this.question);
    }
    /**
     * Accessor for the raw question string, with no tokens evaluated
     * @returns string
     */
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

    /**
     * Accessor for the answer string with all tokens evaluated
     * @returns string
     */
    getAnswer(): string
    {
        return this.arrayToString(this.answer);
    }

    /**
     * Accessor for the raw answer string, with no tokens evaluated
     * @returns string
     */
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

     /**
     * Checks if the given string matches the evaluated answer string
     * @returns True if the answer matches, false otherwise
     */
    evaluateAnswer(a: string)
    {
        return this.arrayToString(this.answer) === a;
    }
}