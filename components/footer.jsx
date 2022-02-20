import { Row, Col } from 'antd'
export default function Footer() {
  return (
    <Row
      style={{
        margin: '2em',
      }}
      justify="center"
    >
      <Col span={24}>
        <p style={{ textAlign: 'center' }}>
          Made with ♡ for fromis_9 by <a href="https://twitter.com/bucinakko">@bucinakko</a>
          <br />
          Source template by <a href="https://twitter.com/kiombocore">@kiombocore</a>
        </p>
      </Col>
    </Row>
  )
}
