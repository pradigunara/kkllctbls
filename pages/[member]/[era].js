import _ from 'lodash'
import { useRouter } from 'next/router'
import { Row, Col, Divider, Radio } from 'antd'
import Header from 'components/header'
import Footer from 'components/footer'
import Breadcrumbs from 'components/breadcrumbs'
import db from 'data/db.json'
import { useState } from 'react'
import { useDoubleTap } from 'use-double-tap'

export default function Era() {
  const router = useRouter()
  const { member, era } = router.query
  const foundMember = _.find(db.members, { code: router.query?.member })
  const foundEra = _.find(db.eras, { code: router.query?.era })

  const [chunkSize, setChunkSize] = useState(foundEra?.photosPerRow ?? 3)

  const eraSections = db.cards?.[member]?.[era] ?? []
  const sectionList = db.sections?.[era] ?? []
  const sortedSections = sectionList.map((section) => ({
    name: section.name,
    content: eraSections[section.code],
  }))

  const handleChunkChange = ({ target }) => {
    setChunkSize(target?.value)
  }

  return (
    <>
      <Row justify="center">
        <Col span={22}>
          <Header />
          <Breadcrumbs
            crumbs={[
              [foundMember?.name, `/${router.query?.member}`],
              [foundEra?.name],
            ]}
          />

          <h2>Double tap to mark photos!</h2>

          <Row justify="end">
            <Col>Photos per row :</Col>
            <Col offset={1}>
              <Radio.Group onChange={handleChunkChange} value={chunkSize}>
                <Radio value={3}>3</Radio>
                <Radio value={4}>4</Radio>
              </Radio.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              {sortedSections.map(({ name, content }) => (
                <Row key={name}>
                  <Section name={name} content={content} chunk={chunkSize} />
                </Row>
              ))}
            </Col>
          </Row>
        </Col>
        <Footer />
      </Row>
    </>
  )
}

const STORAGE_KEY = 'crossedIds'

const localStorage =
  typeof window === 'undefined'
    ? { getItem: _.noop, setItem: _.noop }
    : window?.localStorage

function storeIDs(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

function getIDs() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY))
}

function Section({ name, content, chunk = 3 }) {
  const [crossed, setCrossed] = useState(new Set(getIDs()))

  const handleDoubleTap = (imgID) => {
    crossed.has(imgID) ? crossed.delete(imgID) : crossed.add(imgID)

    const updatedIDs = [...crossed]

    storeIDs(updatedIDs)
    return setCrossed(new Set(updatedIDs))
  }

  const chunkedContent = _.chunk(content ?? [], chunk)

  return (
    <>
      <Divider />
      <h1>{name}</h1>
      <Col>
        {chunkedContent.map((cardChunk, idx) => (
          <Row
            gutter={{ xs: 16, md: 24 }}
            justify="space-evenly"
            align="bottom"
            key={idx}
          >
            {cardChunk.map((card) => (
              <Card
                card={card}
                isCrossed={crossed.has(card.id)}
                onDoubleTap={handleDoubleTap}
                chunk={chunk}
              />
            ))}
          </Row>
        ))}
      </Col>
    </>
  )
}

function Card({ card, isCrossed, onDoubleTap, chunk = 3 }) {
  const bindDoubleTap = useDoubleTap((e) => {
    return onDoubleTap(e?.target?.id)
  }, 800)

  return (
    <Col span={24 / chunk} key={card.id} style={{ marginBottom: '1em' }}>
      <span
        style={{
          fontSize: `${3 / chunk}em`,
          textDecoration: isCrossed && 'line-through',
        }}
      >
        {card.name}
      </span>
      <img
        id={card.id}
        style={{
          maxHeight: '50vh',
          width: '100%',
          minWidth: 0,
          cursor: 'pointer',
          borderRadius: card.rounded && '0.8em',
          opacity: isCrossed && '0.3',
          boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        }}
        src={card.img}
        alt={card.name}
        {...bindDoubleTap}
      />
    </Col>
  )
}
