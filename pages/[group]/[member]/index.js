import _ from 'components/lodash'
import Link from 'next/link'
import { Row, Col, Divider } from 'antd'
import Header from 'components/header'
import Footer from 'components/footer'
import Breadcrumbs from 'components/breadcrumbs'
import { getDB } from 'data/db'
import { GROUP_DATA, GROUP_NAME, GROUP_LINK } from 'data/constants'
import Image from 'next/image'

const CHUNK_SIZE = 3

export default function Member({ group, eras, memberCode, memberName }) {
  const chunkedContents = _.chunk(eras ?? [], CHUNK_SIZE)

  return (
    <>
      <Row justify="center">
        <Col span={22}>
          <Header />
          <Breadcrumbs crumbs={[[GROUP_NAME[group], `/${GROUP_LINK[group]}`], [memberName]]} />

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
                        <a style={{ color: 'inherit' }} className="era-image">
                          <div style={{ marginBottom: '0.2em' }}>{era.name}</div>
                          <Image
                            width={500}
                            height={500}
                            src={`/${group}${era.img}`}
                            alt={era.name}
                            objectFit="cover"
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

  if (process.env.NODE_ENV === 'development') {
    return { paths, fallback: 'blocking' }
  }

  for (const group of _.filter(GROUP_DATA, { disabled: false })) {
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
