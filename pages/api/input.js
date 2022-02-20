import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import { nanoid } from 'nanoid'

const pt = (p) => path.join(process.cwd(), p)
const dbPath = pt('/data/db.json')

const load = () => JSON.parse(fs.readFileSync(dbPath).toString())
const write = (db) => fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))
const writeImg = (base64image, imgPath) => {
  const buffer = new Buffer(base64image, 'base64')
  fs.writeFileSync(pt(imgPath), buffer)
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
    rounded
  } = req.body

  fs.copyFileSync(dbPath, pt('/data/db.json.bak'))

  const db = load()
  const storagePath = ['cards', memberCode, eraCode, sectionCode]
  const cards = _.get(db, storagePath, [])

  const imgPath = `/card/${memberCode}-${eraCode}-${sectionCode}-${_.kebabCase(name)}.jpg`
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
  write(db)
  writeImg(image, imgPath)

  res.status(200).json({ status: 'OK' })
}
