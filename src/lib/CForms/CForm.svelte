<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte'
	import type { FormValidator } from './rules'

	const validator: Array<FormValidator> = []
	setContext('validators', validator)

	const dispatch = createEventDispatcher<{ submit: SubmitEvent }>()

	async function onSubmit(e: SubmitEvent) {
		let submiter = e.submitter
		if (!submiter) {
			const target = e.target as HTMLFormElement
			const selector = target.querySelector('[type="submit"]') as HTMLElement
			if (selector) {
				submiter = selector
			}
		}
		if (!submiter || submiter.getAttribute('type') !== 'submit') return
		let invalidForm = false
		for (let i = 0; i < validator.length; i++) {
			const f = validator[i]
			const invalidInput = await f()
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
