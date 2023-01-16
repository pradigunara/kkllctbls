import { Row, Col, Divider } from 'antd'
import Header from 'components/header'
import Footer from 'components/footer'

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
                <li><a href="https://twitter.com/romsyeon_9">@romsyeon_9</a> (newjeans content collaborator)</li>
                <li><a href="https://twitter.com/kkotocola">@kkotocola</a> (jo yuri content collaborator)</li>
            </ul>
          </Row>
        </Col>
        <Footer />
      </Row>
    </>
  )
}
