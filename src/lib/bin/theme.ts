#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import { generateTheme } from '../theme.js'

async function generate({ cwd = process.cwd() } = {}) {
  const config_file = path.join(cwd, 'theme.js')
  if (!fs.existsSync(config_file)) throw new Error('theme.js not found!!')
  const configModule = (await import(
    `${url.pathToFileURL(config_file).href}?ts=${Date.now()}`
  ))
  const { config, pathToSave } = configModule.default
  const useConf = config || {}
  const result = generateTheme(useConf)
  fs.writeFileSync(`${pathToSave}/theme.scss`, result)
  console.log(`File generated in ${pathToSave}/theme.scss`)
}

generate()