import _ from 'lodash'
import Link from 'next/link'
import { Row, Col, Divider } from 'antd'
import Header from 'components/header'
import Footer from 'components/footer'
import Breadcrumbs from 'components/breadcrumbs'
import { getDB } from 'data/db'
import { GROUP_DATA, GROUP_NAME } from 'data/constants'

const CHUNK_SIZE = 3

export default function Member({ group, eras, memberCode, memberName }) {
  const chunkedContents = _.chunk(eras ?? [], CHUNK_SIZE)

  return (
    <>
      <Row justify="center">
        <Col span={22}>
          <Header />
          <Breadcrumbs crumbs={[[GROUP_NAME[group], `/${group}`], [memberName]]} />

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
                      <Link href={`/${group}/${memberCode}/${era.code}`}>
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
                            src={`/${group}/${era.img}`}
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
        <Footer group={group} />
      </Row>
    </>
  )
}

export async function getStaticPaths() {
  const paths = []

  for (const group of GROUP_DATA) {
    for (const member of getDB(group.code).members) {
      paths.push({ params: { member: member.code, group: group.code } })     
    }
  }

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const group = params.group
  const db = getDB(group)
  const availEra = {
    'fromis-jgr': new Set(['th', 'fr9', 'ff', 'mls', '9wt', 'tnt', 'mg', 'fmb'])
  }

  const memberCode = params?.member
  const eras = availEra?.[`${group}-${memberCode}`]
    ? _.filter(db?.eras, e => availEra[`${group}-${memberCode}`]?.has(e?.code))
    : db?.eras

  const memberName = _.find(db?.members, { code: memberCode })?.name

  return {
    props: {
      eras,
      memberName,
      memberCode,
      group
    },
  }
}
