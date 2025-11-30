import Token from './Token'

export default class FunctionToken extends Token
{
    // Has two attributes
    // String, the function type ie SUM, PRODUCT, SIN, etc
    // Array of Tokens: can be sub-functions, number, variable, text (? not for current functions)
}