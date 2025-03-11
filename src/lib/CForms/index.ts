import type { Snippet } from 'svelte'
import type { HTMLInputAttributes } from 'svelte/elements'

export type InputRule = (input: HTMLInputElement) => Promise<string | true> | string | true
export type InputRuleValidator = () => ReturnType<InputRule>
export type Props = {
	label?: string
	rules?: InputRule[]
	loading?: boolean
	children?: Snippet
	class?: string
} & HTMLInputAttributes
