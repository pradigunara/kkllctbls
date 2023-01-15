import _ from 'components/lodash'
import { useEffect, useState } from 'react'
import { useDoubleTap } from 'use-double-tap'
import { Row, Col, Divider, Radio, message } from 'antd'
import { StarFilled } from '@ant-design/icons'
import Header from 'components/header'
import Footer from 'components/footer'
import Breadcrumbs from 'components/breadcrumbs'
import { getDB } from 'data/db'
import { GROUP_DATA, GROUP_NAME } from 'data/constants'

const CROSSED_STORAGE_KEY = 'crossedIds'
const WISHLIST_STORAGE_KEY = 'wishlists'
const VERSION_KEY = 'version'

const storageMock = { getItem: _.noop, setItem: _.noop }
const localStorage =
  typeof window === 'undefined' ? storageMock : window.localStorage

function storeIDs(ids) {
  localStorage.setItem(CROSSED_STORAGE_KEY, JSON.stringify(ids))
}

function getIDs() {
  return new Set(JSON.parse(localStorage.getItem(CROSSED_STORAGE_KEY) || '[]'))
}

function storeWishlist(wishlist) {
  localStorage.setItem(VERSION_KEY, '2')
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist))
}

function getWishlist() {
  const wishlist = JSON.parse(
    localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]'
  )

  return new Map(wishlist.map(({ id, url, rounded }) => [id, { url, rounded }]))
}

export default function Era({ group, member, era, sortedSections }) {
  const [chunkSize, setChunkSize] = useState(era?.photosPerRow)
  const [showMark, setShowMark] = useState(true)
  const [showName, setShowName] = useState(true)
  const [crossed, setCrossed] = useState(new Set())
  const [wishlists, setWishlists] = useState(getWishlist())

  // fix hydration error (no localstorage on server)
  useEffect(() => setCrossed(getIDs()), [])

  const handleChunkChange = ({ target }) => setChunkSize(target?.value)
  const handleShowMarkChange = ({ target }) => setShowMark(target?.value)
  const handleShowNameChange = ({ target }) => setShowName(target?.value)

  const handleDoubleTap = (id, url, rounded) => {
    if (!wishlists.has(id)) {
      wishlists.set(id, { url, rounded })
      message.success({ content: 'Added to wishlist!', duration: 1 })
    } else {
      wishlists.delete(id)
      message.info({ content: 'Removed from wishlist', duration: 1 })
    }

    const updatedWishlists = _.map([...wishlists.entries()], ([k, v]) => ({
      id: k,
      ...v,
    }))

    storeWishlist(updatedWishlists)
    return setWishlists(new Map([...wishlists.entries()]))
  }

  const handleSingleTap = (imgID) => {
    crossed.has(imgID) ? crossed.delete(imgID) : crossed.add(imgID)

    const updatedIDs = [...crossed]

    storeIDs(updatedIDs)
    return setCrossed(new Set(updatedIDs))
  }

  return (
    <Container span={22}>
      <Header group={group} />
      <Breadcrumbs crumbs={[[GROUP_NAME[group], `/${group}`], [member.name, `/${group}/${member.code}`], [era.name]]} />
      <h4>
        <i>
          <b>Tap items to cross out, Double tap to add wishlist!</b>
        </i>
      </h4>

      <Row justify="end">
        <Col>Photos per row :</Col>
        <Col offset={1}>
          <Radio.Group onChange={handleChunkChange} value={chunkSize}>
            <Radio value={3}>3</Radio>
            <Radio value={4}>4</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row justify="end">
        <Col>Show marked :</Col>
        <Col offset={1}>
          <Radio.Group onChange={handleShowMarkChange} value={showMark}>
            <Radio value={true}>Y</Radio>
            <Radio value={false}>N</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row justify="end">
        <Col>Show name :</Col>
        <Col offset={1}>
          <Radio.Group onChange={handleShowNameChange} value={showName}>
            <Radio value={true}>Y</Radio>
            <Radio value={false}>N</Radio>
          </Radio.Group>
        </Col>
      </Row>

      <Container span={24}>
        {sortedSections.map(({ name, content }) => {
          const filteredContent = _.filter(content ?? [], (c) =>
            showMark ? true : !crossed.has(c.id)
          )
          const contentChunks = _.chunk(filteredContent, chunkSize)

          return (
            <Section name={name} key={name}>
              {contentChunks.map((cardChunk, idx) => (
                <CardRow key={`${name}-${idx}`} chunk={chunkSize}>
                  {cardChunk.map((card) => (
                    <Card
                      group={group}
                      key={card.id}
                      card={card}
                      isCrossed={crossed.has(card.id)}
                      isWishlist={wishlists.has(card.id)}
                      onDoubleTap={handleDoubleTap}
                      onSingleTap={handleSingleTap}
                      chunk={chunkSize}
                      showName={showName}
                    />
                  ))}
                </CardRow>
              ))}
            </Section>
          )
        })}
      </Container>
      <Footer group={group} />
    </Container>
  )
}

function Container({ children, span }) {
  return (
    <Row justify="center">
      <Col span={span}>{children}</Col>
    </Row>
  )
}

function Section({ name, children }) {
  return (
    <Container span={24}>
      <Divider
        orientation="left"
        style={{ fontWeight: '600', fontSize: '1.2em' }}
      >
        {name}
      </Divider>
      {children}
    </Container>
  )
}

function CardRow({ children, chunk }) {
  const base = chunk === 3 ? 8 : chunk === 4 ? 4 : 8

  return (
    <Row
      gutter={{ xs: base * 2, md: base * 3 }}
      justify="space-evenly"
      align="bottom"
    >
      {children}
      <Col span={(24 / chunk) * (chunk - children.length)} />
    </Row>
  )
}

function Card({
  group,
  card,
  isCrossed,
  isWishlist = false,
  onDoubleTap,
  onSingleTap,
  chunk = 3,
  showName,
}) {
  const bindDoubleTap = useDoubleTap(
    (e) =>
      onDoubleTap(
        e?.target?.id,
        e?.target?.getAttribute('data-url'),
        e?.target?.getAttribute('data-rounded') === 'true'
      ),
    400,
    {
      onSingleTap: (e) => onSingleTap(e?.target?.id),
    }
  )

  return (
    <Col span={24 / chunk} key={card.id} style={{ marginBottom: '1em' }}>
      <span
        style={{
          fontSize: `${3 / chunk}em`,
          textDecoration: isCrossed && 'line-through',
          display: !showName && 'none',
        }}
      >
        {card.name}
      </span>
      {isWishlist && (
        <span style={{ display: 'flex', justifyContent: 'start' }}>
          <StarFilled
            style={{
              fontSize: `${6 / chunk}em`,
              color: 'goldenrod',
              marginBottom: '-1em',
              zIndex: 500,
            }}
          />
        </span>
      )}
      <img
        id={card.id}
        style={{
          maxHeight: '50vh',
          width: '100%',
          minWidth: 0,
          cursor: 'pointer',
          borderRadius: card.rounded && `${2.4 / chunk}em`,
          opacity: isCrossed && '0.3',
          boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        }}
        src={`/${group}/${card.img}`}
        alt={card.name}
        data-url={`/${group}/${card.img}`}
        data-rounded={card.rounded}
        {...bindDoubleTap}
      />
    </Col>
  )
}

export async function getStaticPaths() {
  const paths = []

  for (const group of GROUP_DATA) {
    for (const member of getDB(group.code).members) {
      for (const era of getDB(group.code).eras) {
        paths.push({ params: { group: group.code, member: member.code, era: era.code } })
      }
    }
  }

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const db = getDB(params.group)
  const foundMember = _.find(db.members, { code: params?.member })
  const foundEra = _.find(db.eras, { code: params?.era })

  const eraSections = db.cards?.[params?.member]?.[params?.era] ?? {}
  const sectionList = db.sections?.[params?.era] ?? []

  const sortedSections = sectionList.map((section) => ({
    name: section.name,
    content: eraSections[section.code] ?? null,
  }))

  return {
    props: {
      group: params.group,
      member: foundMember,
      era: foundEra,
      sortedSections
    },
  }
}
