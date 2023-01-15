import { Row, Col } from 'antd'
import Link from 'next/link'

export default function Footer() {
  let footerText = 
      <p style={{ textAlign: 'center' }}>
        made with ♡ by 
        <br />
        <a href="https://twitter.com/bucinakko">@bucinakko</a> & <Link href="/contrib">collaborators</Link>
      </p>

  return (
    <Row
      style={{
        margin: '2em',
      }}
      justify="center"
    >
      <Col span={24}>{footerText}</Col>
    </Row>
  )
}
