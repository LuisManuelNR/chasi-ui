<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte'

	const validator: Array<() => string> = []
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
		for (let i = 0; i < validator.length; i++) {
			const f = validator[i]
			const invalidInput = f()
			if (invalidInput) {
				invalidForm = true
			}
		}
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
