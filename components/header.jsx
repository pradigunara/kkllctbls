import { Col, Row } from 'antd'
import Link from 'next/link'

export default function Header({ slotRight }) {
  return (
    <Row justify="space-between" align="middle">
      <Col>
        <Link href="/">
          <a>
            <p
              style={{
                lineHeight: '0.3em',
                fontSize: '1.5em',
                marginTop: '1em',
              }}
            >
              <h1>Kkollectibles</h1>
              <h5>.nakko.fans</h5>
            </p>
          </a>
        </Link>
      </Col>
      {slotRight && <Col>{slotRight}</Col>}
    </Row>
  )
}
