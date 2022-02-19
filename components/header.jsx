import { Col, Row } from 'antd'
import Link from 'next/link'

export default function Header() {
  return (
    <Row>
      <Col>
        <Link href="/">
          <a>
            <h1>Kkollectibles</h1>
          </a>
        </Link>
      </Col>
    </Row>
  )
}
