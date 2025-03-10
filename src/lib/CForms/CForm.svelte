<script lang="ts">
	import { setContext, tick, type Snippet } from 'svelte'
	import type { InputRuleValidator } from './index.js'

	type Props = {
		children?: Snippet
		onsubmit?: (e: SubmitEvent) => void
	}
	let p: Props = $props()

	const validator = new Set<InputRuleValidator>()
	setContext('validators', validator)

	let form: HTMLFormElement
	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault()
		let submiter = e.submitter || form.querySelector<HTMLElement>('[type="submit"]')
		if (!submiter) return
		if (submiter.getAttribute('type') !== 'submit') return
		let invalid = false
		for (const func of validator) {
			if (await func()) invalid = true
		}
		if (invalid) {
			await tick()
			const firstInvalid = form.querySelector('.error-state')
			if (firstInvalid) {
				firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' })
			}
		} else {
			p.onsubmit?.(e)
		}
	}
</script>

<form novalidate bind:this={form} onsubmit={handleSubmit}>
	{@render p.children?.()}
</form>
