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
            <h3>Template References</h3>
            <ul>
              <li><a href="https://twitter.com/kiombocore">@kiombocore</a></li>
              <li><a href="https://twitter.com/kepispace">@kepispace</a></li>
            </ul>
          </Row>
          <Row>
            <h3>Content Collaborators</h3>
            <ul>
              <li><a href="https://twitter.com/romsyeon_9">@romsyeon_9</a></li>
              <li><a href="https://twitter.com/kkotocola">@kkotocola</a></li>
              <li><a href="https://twitter.com/tedinosaurus">@tedinosaurus</a></li>
              <li><a href="https://twitter.com/seperticuacaz">@seperticuacaz</a></li>
            </ul>
          </Row>
        </Col>
        <Footer />
      </Row>
    </>
  )
}
