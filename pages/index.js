import Link from 'next/link'
import { Row, Col } from 'antd'
import Header from 'components/header'
import Footer from 'components/footer'
import db from 'data/db.json'
import _ from 'lodash'

const CHUNK_SIZE = 3

export default function Home() {
  const chunkedContents = _.chunk(db?.members ?? [], CHUNK_SIZE)

  return (
    <>
      <Row justify="center">
        <Col span={22} offset={1}>
          <Header />

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
        </Col>
        <Footer />
      </Row>
    </>
  )
}
