import fromisDB from 'data/fromis/db.json'
import newjeansDB from 'data/newjeans/db.json'
import { GROUP } from 'data/constants'

export function getDB(group) {
  return {
    [GROUP.fromis]: fromisDB,
    [GROUP.newjeans]: newjeansDB
  }[group]
}
