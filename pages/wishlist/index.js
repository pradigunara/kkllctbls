import _ from 'lodash'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Col, Divider, Radio, Row } from 'antd'
import Header from 'components/header'
import Footer from 'components/footer'
import Breadcrumbs from 'components/breadcrumbs'
import { useDoubleTap } from 'use-double-tap'

const CHUNK_SIZE = 6

const WISHLIST_STORAGE_KEY = 'wishlists'

const localStorage =
  typeof window === 'undefined'
    ? { getItem: _.constant('[]'), setItem: _.noop }
    : window?.localStorage

function storeWishlist(wishlist) {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist))
}

function getWishlist() {
  return JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]')
}

const chunkSizeSelection = [2, 3, 4, 6]

export default function Wishlist() {
  const [chunkSizeIdx, setChunkSizeIdx] = useState(2)
  const [wishlists, setWishlists] = useState(getWishlist())
  const [selectedId, setSelectedId] = useState('')

  const handleChangeChunk = () =>
    setChunkSizeIdx((chunkSizeIdx + 1) % chunkSizeSelection.length)

  const handleDoubleTap = (id) =>
    id !== selectedId ? setSelectedId(id) : setSelectedId('')

  const doSwap = (index, movement) => {
    const cloneWishlist = _.cloneDeep(wishlists)
    const temp = cloneWishlist[index + movement]
    cloneWishlist[index + movement] = cloneWishlist[index]
    cloneWishlist[index] = temp

    storeWishlist(cloneWishlist)
    setWishlists(cloneWishlist)
  }

  const handleLeft = (index) => {
    if (index - 1 < 0) return

    doSwap(index, -1)
  }

  const handleRight = (index) => {
    if (index + 1 >= wishlists.length) return

    doSwap(index, 1)
  }

  const handleDelete = (index) => {
    const slicedWishlist = wishlists
      .slice(0, index)
      .concat(wishlists.slice(index + 1))

    storeWishlist(slicedWishlist)
    setWishlists(slicedWishlist)
  }

  const selectedChunkSize = chunkSizeSelection[chunkSizeIdx]
  const chunkedCards = _.chunk(wishlists, selectedChunkSize)

  return (
    <>
      <Row justify="center">
        <Col span={22}>
          <Header />
          <Breadcrumbs crumbs={[['Wishlist']]} />
          <h2>Double tap to move wishlist!</h2>

          <Row justify="end">
            <Col>
              Photos per row :{' '}
              <Button size="small" onClick={handleChangeChunk}>
                {selectedChunkSize}
              </Button>
            </Col>
          </Row>

          <Divider
            orientation="center"
            style={{ fontWeight: '600', fontSize: '1.2em' }}
          >
            * WISHLIST *
          </Divider>
          {chunkedCards.map((chunk, idx) => (
            <CardRow key={_.uniqueId()} chunk={selectedChunkSize}>
              {chunk.map((card, cardIndex) => (
                <Card
                  key={card?.id}
                  index={idx * selectedChunkSize + cardIndex}
                  card={card}
                  selected={card?.id === selectedId}
                  onDoubleTap={handleDoubleTap}
                  onLeft={handleLeft}
                  onRight={handleRight}
                  onDelete={handleDelete}
                  chunk={selectedChunkSize}
                />
              ))}
            </CardRow>
          ))}
        </Col>
        <Footer />
      </Row>
    </>
  )
}

function CardRow({ children, chunk }) {
  const base = 24 / chunk

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
  index,
  onDoubleTap,
  selected,
  onLeft,
  onRight,
  onDelete,
  chunk = 3,
}) {
  const bindDoubleTap = useDoubleTap((e) => {
    return onDoubleTap(e?.target?.id)
  }, 800)

  return (
    <Col span={24 / chunk} key={card.id} style={{ marginBottom: '1em' }}>
      {selected && (
        <span style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            size="small"
            type="primary"
            danger
            onClick={() => onDelete(index)}
            style={{ marginBottom: '-30%', marginTop: '5%', zIndex: 500 }}
          >
            Delete
          </Button>
        </span>
      )}
      <img
        id={card.id}
        style={{
          maxHeight: '70vh',
          width: '100%',
          minWidth: 0,
          cursor: 'pointer',
          opacity: selected && '0.5',
          borderRadius: card.rounded && `${2.4 / chunk}em`,
          boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        }}
        src={card.url}
        data-url={card.url}
        {...bindDoubleTap}
      />
      {selected && (
        <span style={{ display: 'flex', justifyContent: 'space-between' }}>
          <MoveButton onClick={() => onLeft(index)}>{'<'}</MoveButton>
          <MoveButton onClick={() => onRight(index)}>{'>'}</MoveButton>
        </span>
      )}
    </Col>
  )
}

function MoveButton({ children, onClick }) {
  return (
    <Button
      shape="circle"
      size="small"
      style={{ marginTop: '-60%', marginLeft: '5%', marginRight: '5%' }}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
