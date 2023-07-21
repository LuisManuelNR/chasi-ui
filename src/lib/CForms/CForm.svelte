<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte'

	const validator: Array<() => string> = []
	setContext('validators', validator)

	const dispatch = createEventDispatcher<{ submit: SubmitEvent }>()

	function onSubmit(e: SubmitEvent) {
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
