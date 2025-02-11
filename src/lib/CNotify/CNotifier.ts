import { mount, unmount } from 'svelte'
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

function notify({
  title,
  text,
  html,
  timeout = 4000,
  type,
  target = '.notifications-holder'
}: CNotifierParamsObj & { type: string }) {
  const container = document.querySelector(target)
  if (!container) throw new Error('Missing target element for Display notifications')
  const props: ListenerParams = {
    title,
    text,
    html
  }
  let timer: number
  const dissmiss = () => {
    if (timer) clearTimeout(timer)
    unmount(n, { outro: true })
  }

  const n = mount(CNotify, {
    target: container,
    props: {
      ...props,
      class: type,
      dissmiss
    }
  })

  if (timeout) {
    timer = setTimeout(dissmiss, timeout)
  }
  window.dispatchEvent(new CustomEvent(`notifier-${type}`, { detail: props }))
}

function error(opt: CNotifierParams): void {
  notify({ ...parseOpts(opt), type: 'error' })
}

function info(opt: CNotifierParams): void {
  notify({ ...parseOpts(opt), type: 'brand' })
}

function success(opt: CNotifierParams): void {
  notify({ ...parseOpts(opt), type: 'success' })
}

function parseOpts(opt: CNotifierParams): CNotifierParamsObj {
  if (typeof opt === 'string') {
    return {
      title: opt
    }
  }
  return opt
}


type ListenerParams = { title?: string; text?: string; html?: string }
function onSend(
  type: 'error' | 'success' | 'info',
  callback: (data: ListenerParams) => void,
  opts?: AddEventListenerOptions | boolean
) {
  if (!BROWSER) return () => { }
  const trigger = (e: CustomEvent<ListenerParams>) => callback(e.detail)
  //@ts-ignore
  window.addEventListener(`notifier-${type}`, trigger, opts)
  return () => {
    //@ts-ignore
    window.removeEventListener(`notifier-${type}`, trigger, opts)
  }
}

export const CNotifier = {
  error,
  info,
  success,
  on: onSend
}
