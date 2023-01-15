import fs from 'fs'
import path from 'path'
import _ from 'components/lodash'
import { nanoid } from 'nanoid'

const pt = (...p) => path.join(process.cwd(), ...p)
const dbPath = (group) => pt(`/data/${group}/db.json`)

const load = (group) => JSON.parse(fs.readFileSync(dbPath(group)).toString())
const write = (db, group) => fs.writeFileSync(dbPath(group), JSON.stringify(db, null, 2))
const writeImg = (base64image, imgPath, group) => {
  const buffer = new Buffer(base64image, 'base64')
  fs.writeFileSync(pt(`/public/${group}`, imgPath), buffer)
}

export default function handler(req, res) {
  if (req.method !== 'POST' && process.env.NODE_ENV !== 'development') {

    return res.status(200).json({ message: 'mwahahaha' })
  }

  const {
    memberCode,
    eraCode,
    sectionCode,
    name,
    image,
    rounded,
    group
  } = req.body

  fs.copyFileSync(dbPath(group), dbPath(group)+".bak")

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
}
