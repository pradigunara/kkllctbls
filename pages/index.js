import Link from 'next/link'
import { Row, Col, Divider } from 'antd'
import Header from 'components/header'
import Footer from 'components/footer'
import { GROUP_DATA } from 'data/constants'
import _ from 'components/lodash'

export default function Home({ groups }) {
  const CHUNK_SIZE = 2
  const chunkedContents = _.chunk(groups ?? [], CHUNK_SIZE)

  return (
    <>
      <Row justify="center">
        <Col span={22}>
          <Header />
          <Divider
            orientation="center"
            style={{ fontWeight: '600', fontSize: '1.2em' }}
          >
            Groups
          </Divider>
          <Row>
            <Col>
              {chunkedContents.map((chunk, idx) => (
                <Row
                  gutter={{ xs: 24, md: 36 }}
                  justify="center"
                  align="bottom"
                  key={idx}
                >
                  {chunk.map((group) => (
                    <Col
                      span={24 / CHUNK_SIZE}
                      key={group.code}
                      style={{ marginBottom: '1.5em' }}
                    >
                      <Link href={`/${group.code}`}>
                        <a style={{ color: 'inherit' }}>
                          <span style={{ fontSize: '0.9em' }}>{group.name}</span>
                          <img
                            style={{
                              maxHeight: '50vh',
                              width: '100%',
                              minWidth: 0,
                              borderRadius: '0.8em',
                              boxShadow:
                                '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
                            }}
                            src={`/${group.code}/group.jpg`}
                            alt={group.name}
                          />
                        </a>
                      </Link>
                    </Col>
                  ))}
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

export async function getStaticProps() {
  return {
    props: {
      groups: GROUP_DATA
    },
  }
}
