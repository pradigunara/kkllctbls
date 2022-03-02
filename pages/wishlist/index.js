import _ from 'lodash'
import { useState } from 'react'
import { Button, Col, Divider, Row } from 'antd'
import Header from 'components/header'
import Footer from 'components/footer'
import Breadcrumbs from 'components/breadcrumbs'
import { useDoubleTap } from 'use-double-tap'
import { CrownFilled } from '@ant-design/icons'
import { useLocalStorageValue } from '@mantine/hooks'

const WISHLIST_STORAGE_KEY = 'wishlists'
const PRIO_STORAGE_KEY = 'wlprio'

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
  const [prioIds, setPrioIds] = useLocalStorageValue({
    key: PRIO_STORAGE_KEY,
    defaultValue: '[]',
  })
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

  const prioSet = new Set(JSON.parse(prioIds))
  const handlePrio = (id) => {
    prioSet.has(id) ? prioSet.delete(id) : prioSet.add(id)

    setPrioIds(JSON.stringify([...prioSet.values()]))
  }

  const handleDelete = (id, index) => {
    const slicedWishlist = wishlists
      .slice(0, index)
      .concat(wishlists.slice(index + 1))

    prioSet.delete(id)
    setPrioIds(JSON.stringify([...prioSet.values()]))

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
          <h2>Double tap to edit wishlist!</h2>

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
            style={{ fontWeight: '600', fontSize: '1.5em', marginTop: '2.5em' }}
          >
            * WISHLIST *
          </Divider>
          {prioSet.size > 0 && (
            <div style={{ marginBottom: '1em', marginTop: '-1em' }}>
              <CrownFilled style={{ color: 'goldenrod' }} /> = priority
            </div>
          )}
          {chunkedCards.map((chunk, idx) => (
            <CardRow key={idx} chunk={selectedChunkSize}>
              {chunk.map((card, cardIndex) => (
                <Card
                  key={card?.id}
                  index={idx * selectedChunkSize + cardIndex}
                  card={card}
                  selected={card?.id === selectedId}
                  priority={prioSet.has(card?.id)}
                  onDoubleTap={handleDoubleTap}
                  onLeft={handleLeft}
                  onRight={handleRight}
                  onDelete={handleDelete}
                  onPrio={handlePrio}
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
  priority,
  onLeft,
  onRight,
  onDelete,
  onPrio,
  chunk = 3,
}) {
  const bindDoubleTap = useDoubleTap((e) => {
    return onDoubleTap(e?.target?.id)
  }, 800)

  return (
    <Col span={24 / chunk} key={card?.id} style={{ marginBottom: '1em' }}>
      {priority && (
        <span style={{ display: 'flex', justifyContent: 'end' }}>
          <CrownFilled
            style={{
              fontSize: `${8 / chunk}em`,
              textAlign: 'right',
              color: 'goldenrod',
              transform: 'rotate(35deg)',
              marginBottom: '-0.5em',
              marginRight: '-0.2em'
            }}
          />
        </span>
      )}
      {selected && (
        <span style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            size="small"
            type="primary"
            danger
            onClick={() => onDelete(card?.id, index)}
            style={{ marginBottom: '5%' }}
          >
            Delete
          </Button>
        </span>
      )}
      <img
        id={card?.id}
        style={{
          maxHeight: '70vh',
          width: '100%',
          minWidth: 0,
          cursor: 'pointer',
          opacity: selected && '0.5',
          borderRadius: card?.rounded && `${2.4 / chunk}em`,
          boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        }}
        src={card?.url}
        {...bindDoubleTap}
      />
      {selected && (
        <>
          <span style={{ display: 'flex', justifyContent: 'space-between' }}>
            <MoveButton onClick={() => onLeft(index)}>{'<'}</MoveButton>
            <MoveButton onClick={() => onRight(index)}>{'>'}</MoveButton>
          </span>
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '5%',
            }}
          >
            <Button
              type={priority && 'primary'}
              size="small"
              onClick={() => onPrio(card?.id)}
            >
              Prio
            </Button>
          </span>
        </>
      )}
    </Col>
  )
}

function MoveButton({ children, onClick }) {
  return (
    <Button
      shape="circle"
      size="small"
      style={{ marginTop: '-60%', marginLeft: '-15%', marginRight: '-15%' }}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
