export type InputRule = (input: HTMLInputElement) => Promise<string | true> | string | true
export type InputRuleValidator = () => ReturnType<InputRule>
