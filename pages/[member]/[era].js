import _ from 'lodash'
import { useRouter } from 'next/router'
import { Row, Col, Divider } from 'antd'
import Header from 'components/header'
import Footer from 'components/footer'
import Breadcrumbs from 'components/breadcrumbs'
import db from 'data/db.json'
import { useState } from 'react'
import { useDoubleTap } from 'use-double-tap'

const CHUNK_SIZE = 3

export default function Era() {
  const router = useRouter()
  const { member, era } = router.query
  const eraSections = db.cards?.[member]?.[era] ?? []
  const sectionList = db.sections?.[era] ?? []
  const sortedSections = sectionList.map((section) => ({
    name: section.name,
    content: eraSections[section.code],
  }))

  const getSectionName = (code) =>
    _.find(db.sections?.[router.query?.era], {
      code,
    })?.name

  return (
    <>
      <Row justify="center">
        <Col span={22} offset={1}>
          <Header />
          <Breadcrumbs
            crumbs={[
              [
                _.find(db.members, { code: router.query?.member })?.name,
                `/${router.query?.member}`,
              ],
              [_.find(db.eras, { code: router.query?.era })?.name],
            ]}
          />
          <h2>Double tap to mark photos!</h2>
          <Row>
            <Col>
              {sortedSections.map(({ name, content }) => (
                <Row key={name}>
                  <Section name={name} content={content} />
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

function Section({ name, content }) {
  const [crossed, setCrossed] = useState(new Set(getIDs()))

  console.log('crs', crossed)

  const handleDoubleTap = (imgID) => {
    console.log('id', imgID)

    crossed.has(imgID) ? crossed.delete(imgID) : crossed.add(imgID)

    const updatedIDs = [...crossed]

    storeIDs(updatedIDs)
    return setCrossed(new Set(updatedIDs))
  }

  const chunkedContent = _.chunk(content ?? [], CHUNK_SIZE)

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
              />
            ))}
          </Row>
        ))}
      </Col>
    </>
  )
}

function Card({ card, isCrossed, onDoubleTap }) {
  const bindDoubleTap = useDoubleTap((e) => {
    return onDoubleTap(e?.target?.id)
  }, 800)

  return (
    <Col span={8} key={card.id} style={{ marginBottom: '1em' }}>
      <span
        style={{
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
          boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
        }}
        src={card.img}
        alt={card.name}
        {...bindDoubleTap}
      />
    </Col>
  )
}
