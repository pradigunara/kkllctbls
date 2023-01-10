import Link from 'next/link'
import { Row, Col, Divider } from 'antd'
import Header from 'components/header'
import Footer from 'components/footer'
import { getDB } from 'data/db'
import { GROUP } from 'data/constants'
import _ from 'lodash'

export default function Home({ members, group }) {
  const CHUNK_SIZE = 3
  const chunkedContents = _.chunk(members ?? [], CHUNK_SIZE)

  return (
    <>
      <Row justify="center">
        <Col span={22}>
          <Header group={group} />
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
                  gutter={{ xs: 24, md: 36 }}
                  justify="center"
                  align="bottom"
                  key={idx}
                >
                  {chunk.map((member) => (
                    <Col
                      span={24 / CHUNK_SIZE}
                      key={member.code}
                      style={{ marginBottom: '1.5em' }}
                    >
                      <Link href={`/${member.code}`}>
                        <a style={{ color: 'inherit' }}>
                          <span style={{ fontSize: '0.9em' }}>{member.name}</span>
                          <img
                            style={{
                              maxHeight: '50vh',
                              width: '100%',
                              minWidth: 0,
                              borderRadius: '0.8em',
                              boxShadow:
                                '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
                            }}
                            src={`/${group}/${member.img}`}
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
        <Footer group={group} />
      </Row>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      members: getDB()?.members,
      group: process.env.GROUP || GROUP.fromis
    },
  }
}
