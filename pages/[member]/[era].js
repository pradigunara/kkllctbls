import _ from 'lodash'
import { useState, useEffect } from 'react'
import { useDoubleTap } from 'use-double-tap'
import { useRouter } from 'next/router'
import { Row, Col, Divider, Radio, Button } from 'antd'
import { StarOutlined, StarFilled } from '@ant-design/icons'
import Header from 'components/header'
import Footer from 'components/footer'
import Breadcrumbs from 'components/breadcrumbs'
import db from 'data/db.json'

const CROSSED_STORAGE_KEY = 'crossedIds'
const WISHLIST_STORAGE_KEY = 'wishlists'

const localStorage =
  typeof window === 'undefined'
    ? { getItem: _.constant('[]'), setItem: _.noop }
    : window?.localStorage

function storeIDs(ids) {
  localStorage.setItem(CROSSED_STORAGE_KEY, JSON.stringify(ids))
}

function getIDs() {
  return new Set(JSON.parse(localStorage.getItem(CROSSED_STORAGE_KEY)))
}

function storeWishlist(wishlist) {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist))
}

function getWishlist() {
  const wishlist = JSON.parse(
    localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]'
  )

  return new Map(wishlist.map(({ id, url, rounded }) => [id, { url, rounded }]))
}

export default function Era() {
  const router = useRouter()
  const { member, era } = router.query
  const foundMember = _.find(db.members, { code: router.query?.member })
  const foundEra = _.find(db.eras, { code: router.query?.era })

  const [chunkSize, setChunkSize] = useState(3)
  useEffect(() => {
    // era can be delayed
    setChunkSize(foundEra?.photosPerRow)
  }, [foundEra])

  const [wishlistMode, setWishlistMode] = useState(false)
  const [showMark, setShowMark] = useState(true)
  const [showName, setShowName] = useState(true)
  const [crossed, setCrossed] = useState(getIDs())
  const [wishlists, setWishlists] = useState(getWishlist())

  const eraSections = db.cards?.[member]?.[era] ?? []
  const sectionList = db.sections?.[era] ?? []
  const sortedSections = sectionList.map((section) => ({
    name: section.name,
    content: eraSections[section.code],
  }))

  const handleChunkChange = ({ target }) => setChunkSize(target?.value)
  const handleShowMarkChange = ({ target }) => setShowMark(target?.value)
  const handleShowNameChange = ({ target }) => setShowName(target?.value)

  const handleToggleWishlist = (id, url, rounded) => {
    wishlists.has(id) ? wishlists.delete(id) : wishlists.set(id, { url, rounded })

    const updatedWishlists = _.map([...wishlists.entries()], ([k, v]) => ({
      id: k,
      ...v
    }))

    storeWishlist(updatedWishlists)
    return setWishlists(new Map([...wishlists.entries()]))
  }

  const handleDoubleTap = (imgID, imgUrl, rounded) => {
    if (wishlistMode) {
      return handleToggleWishlist(imgID, imgUrl, rounded)
    }

    crossed.has(imgID) ? crossed.delete(imgID) : crossed.add(imgID)

    const updatedIDs = [...crossed]

    storeIDs(updatedIDs)
    return setCrossed(new Set(updatedIDs))
  }

  return (
    <Container span={22}>
      <Header
        slotRight={
          <Button
            type="primary"
            shape="circle"
            icon={wishlistMode ? <StarFilled /> : <StarOutlined />}
            size="large"
            onClick={() => setWishlistMode((wl) => !wl)}
          />
        }
      />
      <Breadcrumbs
        crumbs={[
          [foundMember?.name, `/${router.query?.member}`],
          [foundEra?.name],
        ]}
      />

      <h3>Double tap to {wishlistMode ? 'add wishlist' : 'mark photos'}!</h3>

      <Row justify="end">
        <Col>Photos per row :</Col>
        <Col offset={1}>
          <Radio.Group onChange={handleChunkChange} value={chunkSize}>
            <Radio value={3}>3</Radio>
            <Radio value={4}>4</Radio>
          </Radio.Group>
        </Col>
      </Row>
      {!wishlistMode && (
        <>
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
        </>
      )}

      <Container span={24}>
        {sortedSections.map(({ name, content }) => {
          const contentChunks = _.chain(content ?? [])
            .filter((c) => ((wishlistMode || showMark) ? true : !crossed.has(c.id)))
            .chunk(chunkSize)
            .value()

          return (
            <Section name={name} key={name}>
              {contentChunks.map((cardChunk, idx) => (
                <CardRow key={`${name}-${idx}`} chunk={chunkSize}>
                  {cardChunk.map((card) => (
                    <Card
                      key={card.id}
                      card={card}
                      isCrossed={crossed.has(card.id)}
                      isWishlist={wishlists.has(card.id)}
                      onDoubleTap={handleDoubleTap}
                      chunk={chunkSize}
                      showName={!wishlistMode && showName}
                      wishlistMode={wishlistMode}
                    />
                  ))}
                </CardRow>
              ))}
            </Section>
          )
        })}
      </Container>
      <Footer />
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
    </Row>
  )
}

function Card({
  card,
  isCrossed,
  isWishlist = false,
  onDoubleTap,
  chunk = 3,
  showName,
  wishlistMode,
}) {
  const bindDoubleTap = useDoubleTap((e) => {
    return onDoubleTap(
      e?.target?.id,
      e?.target?.getAttribute('data-url'),
      e?.target?.getAttribute('data-rounded') === 'true'
    )
  }, 800)

  const isOpaque = wishlistMode ? !isWishlist : isCrossed

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
      <img
        id={card.id}
        style={{
          maxHeight: '50vh',
          width: '100%',
          minWidth: 0,
          cursor: 'pointer',
          borderRadius: card.rounded && `${2.4 / chunk}em`,
          opacity: isOpaque && '0.3',
          boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        }}
        src={card.img}
        alt={card.name}
        data-url={card.img}
        data-rounded={card.rounded}
        {...bindDoubleTap}
      />
    </Col>
  )
}
