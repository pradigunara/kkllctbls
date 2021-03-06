import _ from 'lodash'
import Link from 'next/link'
import { Row, Col, Divider } from 'antd'
import Header from 'components/header'
import Footer from 'components/footer'
import Breadcrumbs from 'components/breadcrumbs'
import db from 'data/db.json'

const CHUNK_SIZE = 3

export default function Member({ eras, memberCode, memberName }) {
  const chunkedContents = _.chunk(eras ?? [], CHUNK_SIZE)

  return (
    <>
      <Row justify="center">
        <Col span={22}>
          <Header />
          <Breadcrumbs crumbs={[[memberName]]} />

          <Divider
            orientation="center"
            style={{ fontWeight: '600', fontSize: '1.2em' }}
          >
            Select Era
          </Divider>
          <Row>
            <Col>
              {chunkedContents.map((chunk, idx) => (
                <Row
                  gutter={{ xs: 16, md: 24 }}
                  justify="space-evenly"
                  align="bottom"
                  key={idx}
                >
                  {chunk.map((era) => (
                    <Col
                      span={8}
                      key={era.code}
                      style={{ marginBottom: '1em' }}
                    >
                      <Link href={`${memberCode}/${era.code}`}>
                        <a style={{ color: 'inherit' }}>
                          <span>{era.name}</span>
                          <img
                            style={{
                              maxHeight: '50vh',
                              width: '100%',
                              minWidth: 0,
                              boxShadow:
                                '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                            }}
                            src={era.img}
                            alt={era.name}
                          />
                        </a>
                      </Link>
                    </Col>
                  ))}
                  <Col span={8 * (CHUNK_SIZE - chunk.length)} />
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

export async function getStaticPaths() {
  _.map(db.members, (m) => ({ params: { member: m.code } }))

  return {
    paths: _.map(db.members, (m) => ({ params: { member: m.code } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const code = params?.member
  const eras = code === 'jgr' ? _.reject(db?.eras, { code: 'td' }) : db?.eras
  const memberName = _.find(db?.members, { code })?.name

  return {
    props: { eras, memberName, memberCode: code },
  }
}
