export type InputRule = (input: HTMLInputElement) => Promise<string> | string
export type InputRuleValidator = () => ReturnType<InputRule>
