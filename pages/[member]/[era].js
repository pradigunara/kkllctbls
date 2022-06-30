import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDoubleTap } from 'use-double-tap'
import { Row, Col, Divider, Radio, Button, Modal } from 'antd'
import { StarOutlined, StarFilled } from '@ant-design/icons'
import Header from 'components/header'
import Footer from 'components/footer'
import Breadcrumbs from 'components/breadcrumbs'
import db from 'data/db.json'

const CROSSED_STORAGE_KEY = 'crossedIds'
const WISHLIST_STORAGE_KEY = 'wishlists'

const storageMock = { getItem: _.noop, setItem: _.noop }
const localStorage =
  typeof window === 'undefined' ? storageMock : window.localStorage
const sessionStorage =
  typeof window === 'undefined' ? storageMock : window.sessionStorage

function storeIDs(ids) {
  localStorage.setItem(CROSSED_STORAGE_KEY, JSON.stringify(ids))
}

function getIDs() {
  return new Set(JSON.parse(localStorage.getItem(CROSSED_STORAGE_KEY) || '[]'))
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

export default function Era({ member, era, sortedSections }) {
  if (era?.code === 'fmb') {
      return <Fmb member={member} era={era} />
  }

  const [chunkSize, setChunkSize] = useState(era?.photosPerRow)
  const [wishlistMode, setWishlistMode] = useState(false)
  const [showMark, setShowMark] = useState(true)
  const [showName, setShowName] = useState(true)
  const [crossed, setCrossed] = useState(new Set())
  const [wishlists, setWishlists] = useState(getWishlist())

  // fix hydration error (no localstorage on server)
  useEffect(() => setCrossed(getIDs()), [])

  const handleChunkChange = ({ target }) => setChunkSize(target?.value)
  const handleShowMarkChange = ({ target }) => setShowMark(target?.value)
  const handleShowNameChange = ({ target }) => setShowName(target?.value)

  const handleWishlistMode = () => {
    !sessionStorage.getItem('wlguide') &&
      !wishlistMode &&
      Modal.info({
        title: 'Wishlist Mode',
        content: (
          <div>
            <p>
              In this mode, double-tapping the item will add that item to your
              wishlist.
              <br />
              You can access your wishlist from the bottom of homepage (below
              member selection)
            </p>
          </div>
        ),
        onOk() {
          sessionStorage.setItem('wlguide', '1')
        },
      })

    setWishlistMode((wl) => !wl)
  }

  const handleToggleWishlist = (id, url, rounded) => {
    wishlists.has(id)
      ? wishlists.delete(id)
      : wishlists.set(id, { url, rounded })

    const updatedWishlists = _.map([...wishlists.entries()], ([k, v]) => ({
      id: k,
      ...v,
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
            onClick={handleWishlistMode}
          />
        }
      />
      <Breadcrumbs crumbs={[[member.name, `/${member.code}`], [era.name]]} />

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
          const filteredContent = _.filter(content ?? [], (c) =>
            wishlistMode || showMark ? true : !crossed.has(c.id)
          )
          const contentChunks = _.chunk(filteredContent, chunkSize)

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

export async function getStaticPaths() {
  const paths = []
  for (const member of db.members) {
    for (const era of db.eras) {
      if (member.code === 'jgr' && era.code === 'td') {
        continue
      }

      paths.push({ params: { member: member.code, era: era.code } })
    }
  }

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const foundMember = _.find(db.members, { code: params?.member })
  const foundEra = _.find(db.eras, { code: params?.era })

  const eraSections = db.cards?.[params?.member]?.[params?.era] ?? {}
  const sectionList = db.sections?.[params?.era] ?? []

  const sortedSections = sectionList.map((section) => ({
    name: section.name,
    content: eraSections[section.code] ?? null,
  }))

  return {
    props: { member: foundMember, era: foundEra, sortedSections },
  }
}

function Fmb({ member, era }) {
    return (
        <Container span={22}>
            <Header/>
            <Breadcrumbs crumbs={[[member.name, `/${member.code}`], [era.name]]} />
            <br />

            <Container span={24}>
                <Row justify="center">
                    <Col>
                        <video width="320" height="240" autoPlay muted loop src="/megan.webm" />
                        <h1 style={{ textAlign: 'center' }}>BURU BURU AMAT</h1>
                    </Col>
                </Row>
            </Container>
            <br />
            <Footer />

        </Container>
    )
}