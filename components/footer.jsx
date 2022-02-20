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
        <span style={{ textAlign: 'center' }}>
          Made with ♡ by <a href="https://twitter.com/bucinakko">@bucinakko</a>
        </span>
      </Col>
    </Row>
  )
}
