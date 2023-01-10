import fromisDB from 'data/fromis/db.json';
import newjeansDB from 'data/newjeans/db.json';
import { GROUP } from 'data/constants';

export function getDB() {
  return {
    [GROUP.fromis]: fromisDB,
    [GROUP.newjeans]: newjeansDB
  }[process.env.GROUP]
}
