import Link from 'next/link'
import { Row, Col, Divider } from 'antd'
import Header from 'components/header'
import Footer from 'components/footer'
import { getDB } from 'data/db'
import _ from 'components/lodash'
import { GROUP_DATA, GROUP_NAME } from 'data/constants'
import Breadcrumbs from 'components/breadcrumbs'
import Image from 'next/image'

export default function Home({ members, group }) {
  const CHUNK_SIZE = 3
  const chunkedContents = _.chunk(members ?? [], CHUNK_SIZE)

  return (
    <>
      <Row justify="center">
        <Col span={22}>
          <Header group={group} />
          <Breadcrumbs crumbs={[[GROUP_NAME[group]]]} />
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
                      <Link href={`/${group}/${member.code}`}>
                        <a style={{ color: 'inherit' }} className="group-member-image">
                          <div style={{ fontSize: '0.9em', marginBottom: '0.2em' }}>{member.name}</div>
                          <Image
                            width={400}
                            height={500}
                            src={`/${group}${member.img}`}
                            alt={member.name}
                            objectFit="cover"
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


export async function getStaticPaths() {
  const paths = _.map(GROUP_DATA, g => ({ params: { group: g.code } }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      members: getDB(params.group)?.members,
      group: params.group
    },
  }
}
