import fs from 'fs'
import path from 'path'
import _ from 'components/lodash'
import { nanoid } from 'nanoid'
import YAML from 'yaml'
import { loadDB } from 'data/db'

const pt = (...p) => path.join(process.cwd(), ...p)
const dbPath = (group) => pt(`/data/${group}/db.yaml`)

const load = (group) => YAML.parse(fs.readFileSync(dbPath(group)).toString())
const write = (db, group) => fs.writeFileSync(dbPath(group), YAML.stringify(db, null, 2))
const writeImg = (base64image, imgPath, group) => {
  const buffer = new Buffer(base64image, 'base64')
  fs.writeFileSync(pt(`/public/${group}`, imgPath), buffer)
}
const delImg = (imgPath, group) => {
  fs.rmSync(pt(`/public/${group}`, imgPath))
}

export default function handler(req, res) {
  if (process.env.NODE_ENV !== 'development') {

    return res.status(200).json({ message: 'mwahahaha' })
  }

  switch(req.method) {
    case 'POST':
      return handlePOST(req, res)
    case 'DELETE':
      return handleDELETE(req, res)
  }
}

function handlePOST(req, res) {
  const {
    memberCode,
    eraCode,
    sectionCode,
    name,
    image,
    rounded,
    group
  } = req.body

  if (!memberCode || !eraCode || !sectionCode || !name || !image || !group) {
    return res.status(400).json({ message: `missing input data` })
  }

  const db = load(group)
  const storagePath = ['cards', memberCode, eraCode, sectionCode]
  const cards = _.get(db, storagePath, [])
  const imgPath = `/card/${memberCode}-${eraCode}-${sectionCode}-${_.kebabCase(name)}.jpg`

  const existing = _.find(cards, { name })
  if (existing) {
    return res.status(400).json({ message: `${imgPath} already exist :(` })
  }

  cards.push({
    id: nanoid(),
    code: _.kebabCase(name),
    name,
    memberCode,
    eraCode,
    sectionCode,
    img: imgPath,
    rounded
  })

  _.set(db, storagePath, cards)
  write(db, group)
  writeImg(image, imgPath, group)

  res.status(200).json({ status: 'OK' })
  loadDB()
}

function handleDELETE(req, res) {
  const {
    memberCode,
    eraCode,
    sectionCode,
    name,
    group
  } = req.body

  if (!memberCode || !eraCode || !sectionCode || !name || !group) {
    return res.status(400).json({ message: `missing input data` })
  }

  const db = load(group)
  const storagePath = ['cards', memberCode, eraCode, sectionCode]
  const cards = _.get(db, storagePath, [])
  const imgPath = `/card/${memberCode}-${eraCode}-${sectionCode}-${_.kebabCase(name)}.jpg`

  const existing = _.find(cards, { name })
  if (!existing) {
    return res.status(400).json({ message: `${imgPath} not exist :(` })
  }

  const filteredCards = _.filter(cards, c => c?.name != name)

  _.set(db, storagePath, filteredCards)
  write(db, group)
  delImg(imgPath, group)

  res.status(200).json({ status: 'OK' })
  loadDB()
}