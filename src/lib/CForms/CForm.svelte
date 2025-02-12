<script lang="ts">
	import { setContext, tick } from 'svelte'

	let { children } = $props()

	const validator = new Set<() => string | Promise<string>>()
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
		}
		// keep with normal submit event
	}

	// function setup (form: HTMLFormElement): ActionReturn {
	//   form.addEventListener('submit', handleSubmit)
	//   return {
	//     destroy() {
	//       form.removeEventListener('submit', handleSubmit)
	//     },
	//   }
	// }
</script>

<form novalidate bind:this={form} onsubmit={handleSubmit}>
	{@render children?.()}
</form>
