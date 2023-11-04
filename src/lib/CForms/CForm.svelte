<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte'

	const validator = new Set<() => string>()
	setContext('validators', validator)

	const dispatch = createEventDispatcher<{ submit: SubmitEvent }>()

	function onSubmit(e: SubmitEvent) {
		let submiter = e.submitter
		if (!submiter) {
			const target = e.target as HTMLFormElement
			const selector = target.querySelector('[type="submit"]') as HTMLElement
			if (!selector) return
		} else if (submiter.getAttribute('type') !== 'submit') return
		let invalidForm = false
		validator.forEach((f) => {
			const invalidInput = f()
			if (invalidInput) {
				invalidForm = true
			}
		})
		if (!invalidForm) {
			dispatch('submit', e)
		} else {
			requestAnimationFrame(() => {
				const firstInputError = document.querySelector('.error-state')
				if (firstInputError) {
					firstInputError.scrollIntoView({ behavior: 'smooth', block: 'center' })
				}
			})
		}
	}
</script>

<form novalidate on:submit|preventDefault={onSubmit}>
	<slot />
</form>
