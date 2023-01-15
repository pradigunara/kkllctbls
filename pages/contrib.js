
import { Row, Col, Divider } from 'antd'
import Header from 'components/header'
import Footer from 'components/footer'
import { GROUP_DATA } from 'data/constants'

export default function Contrib() {
  return (
    <>
      <Row justify="center">
        <Col span={22}>
          <Header />
          <Divider
            orientation="center"
            style={{ fontWeight: '600', fontSize: '1.2em' }}
          >
            Credits & Collaborators
          </Divider>
          <Row>
            <ul>
                <li><a href="https://twitter.com/kiombocore">@kiombocore</a> (fromis_9 template source)</li>
                <li><a href="https://twitter.com/romsyeon_9">@romsyeon_9</a> (content collaborator)</li>
            </ul>
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
