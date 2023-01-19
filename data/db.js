import fs from 'fs'
import path from 'path'

import { GROUP } from 'data/constants'
import YAML from 'yaml'

const pt = (...p) => path.join(process.cwd(), ...p)
const dbPath = group => pt(`data/${group}/db.yaml`)
const load = (group) => YAML.parse(fs.readFileSync(dbPath(group)).toString())

let initiated = false
let fromisDB
let newjeansDB
let joyuriDB
let lesserafimDB

export function getDB(group) {
  if (!initiated) loadDB()

  return {
    [GROUP.fromis]: fromisDB,
    [GROUP.newjeans]: newjeansDB,
    [GROUP.joyuri]: joyuriDB,
    [GROUP.lesserafim]: lesserafimDB,
  }[group]
}

export function loadDB() {
  fromisDB = load(GROUP.fromis)
  newjeansDB = load(GROUP.newjeans)
  joyuriDB = load(GROUP.joyuri)
  lesserafimDB = load(GROUP.lesserafim)
}
