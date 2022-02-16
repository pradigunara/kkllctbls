import _ from 'lodash'
import { useState } from 'react'
import { useDoubleTap } from 'use-double-tap'
import style from './segment.module.css'

const CHUNK_SIZE = 3
const STORAGE_KEY = 'crossedIds'

const localStorage = typeof window === "undefined"
  ? { getItem: _.noop, setItem: _.noop }
  : window?.localStorage

function storeIDs(ids) {
  console.log('aa', ids)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

function getIDs() {
  return localStorage.getItem(STORAGE_KEY)
}

export default function Segment({ segment }) {
  const [crossed, setCrossed] = useState(new Set(getIDs()))

  const bindDoubleTap = useDoubleTap((e) => {
    const imgID = e?.target?.name

    if (crossed.has(imgID)) {
      crossed.delete(imgID)
      const updatedIDs = [...crossed]

      storeIDs(updatedIDs)
      return setCrossed(new Set(updatedIDs))
    }


    const updatedIDs = [...crossed, imgID]

    storeIDs(updatedIDs)
    return setCrossed(new Set(updatedIDs))
  })

  const chunkedContents = _.chunk(segment?.contents ?? [], CHUNK_SIZE)

  return (
    <>
      {chunkedContents.map((chunk) => (
        <div className={style.container}>
          {chunk.map((content) => (
            <div className={style.item}>
              <p style={{ fontSize: '0.6em', textDecoration: crossed.has(`${content.id}`) && 'line-through' }}>{content.name}</p>
              <img
                name={content.id}
                src={`/card/${content.id}.png`}
                alt={content.name}
                className={style.img}
                {...bindDoubleTap}
                style={{ opacity: crossed.has(`${content.id}`) && '0.3' }}
              />
            </div>
          ))}
        </div>
      ))}
    </>
  )
}
