import { Row, Col } from 'antd'
import data from 'data/data.js'
import Segment from 'components/segment'

export default function Home() {
  return (
    <>
      <Row justify="center">
        <Col span={22} offset={1}>
          <Row>
            <Col>
              <h1>
                Kkollectibles
              </h1>
            </Col>
          </Row>

          <Row>
            <Col>
              {data.segments.map(segment => (
                <div key={segment.name}>
                  <h3 style={{ fontWeight: '200' }}>{segment.name}</h3>
                  <Segment segment={segment} />
                </div>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}
