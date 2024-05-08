import CNotify from './CNotify.svelte'
import { BROWSER } from 'esm-env'

type CNotifierParamsObj = {
	title?: string
	text?: string
	html?: string
	timeout?: number
	target?: string
}

type CNotifierParams = CNotifierParamsObj | string

if (BROWSER) {
	if (!document.querySelector('.notifications-holder')) {
		const defaultContainer = document.createElement('div')
		defaultContainer.classList.add('notifications-holder')
		document.body.append(defaultContainer)
	}
}

const DEFAULT_TIMEOUT = 4000

function send({ title, text, html, timeout = DEFAULT_TIMEOUT, type, target = '.notifications-holder' }: CNotifierParamsObj & { type: string }) {
	const container = document.querySelector(target)
	if (!container) throw 'Missing target element for Display notifications'
	const noty = new CNotify({
		target: container,
		props: {
			title,
			text,
			type,
			html,
			visible: true
		},
		intro: true
	})
	let timer: ReturnType<typeof setTimeout>
	if (timeout) {
		timer = setTimeout(() => {
			noty.close()
		}, timeout)
	}
	noty.$on('close', () => {
		noty.$destroy()
		if (timer) {
			clearTimeout(timer)
		}
	})
}

function error(opt: CNotifierParams): void {
	send({ ...parseOpts(opt), type: 'error' })
}

function info(opt: CNotifierParams): void {
	send({ ...parseOpts(opt), type: 'brand' })
}

function success(opt: CNotifierParams): void {
	send({ ...parseOpts(opt), type: 'success' })
}

function parseOpts(opt: CNotifierParams): CNotifierParamsObj {
	if (typeof opt === 'string') {
		return {
			title: opt
		}
	}
	return opt
}

export const CNotifier = {
	error,
	info,
	success
}