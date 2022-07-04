import Link from 'next/link'
import { Row, Col, Divider } from 'antd'
import Header from 'components/header'
import Footer from 'components/footer'
import db from 'data/db.json'
import _ from 'lodash'

const CHUNK_SIZE = 3

export default function Home({ members }) {
  const chunkedContents = _.chunk(members ?? [], CHUNK_SIZE)

  return (
    <>
      <Row justify="center">
        <Col span={22}>
          <Header />
          <Divider
            orientation="center"
            style={{ fontWeight: '600', fontSize: '1.2em' }}
          >
            Select Member
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
                  {chunk.map((member) => (
                    <Col
                      span={8}
                      key={member.code}
                      style={{ marginBottom: '1em' }}
                    >
                      <Link href={`/${member.code}`}>
                        <a style={{ color: 'inherit' }}>
                          <span>{member.name}</span>
                          <img
                            style={{
                              maxHeight: '50vh',
                              width: '100%',
                              minWidth: 0,
                              borderRadius: '0.8em',
                              boxShadow:
                                '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                            }}
                            src={member.img}
                            alt={member.name}
                          />
                        </a>
                      </Link>
                    </Col>
                  ))}
                </Row>
              ))}
            </Col>
          </Row>

          <br />

          <a
            target="_blank"
            href="https://twitter.com/bucinakko/status/1544081335593365506"
            rel="noreferrer"
          >
            looking for wishlist?
          </a>
        </Col>
        <Footer />
      </Row>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: { members: db?.members },
  }
}
