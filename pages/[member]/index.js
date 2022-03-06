import _ from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Row, Col, Divider } from 'antd'
import Header from 'components/header'
import Footer from 'components/footer'
import Breadcrumbs from 'components/breadcrumbs'
import db from 'data/db.json'

const CHUNK_SIZE = 3

export default function Member() {
  const router = useRouter()
  const eras =
    router.query?.member === 'jgr'
      ? _.reject(db?.eras, { code: 'td' })
      : db?.eras
  const chunkedContents = _.chunk(eras ?? [], CHUNK_SIZE)

  return (
    <>
      <Row justify="center">
        <Col span={22}>
          <Header />
          <Breadcrumbs
            crumbs={[
              [_.find(db.members, { code: router.query?.member })?.name],
            ]}
          />

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
                      <Link href={`${router.query?.member}/${era.code}`}>
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
