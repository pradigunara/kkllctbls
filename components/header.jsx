import { Button, Col, Row } from 'antd'
import Link from 'next/link'
import { StarFilled, StarOutlined } from '@ant-design/icons'

export default function Header() {
  return (
    <Row justify="space-between" align="middle">
      <Col>
        <Link href="/">
          <a>
            <div
              style={{
                lineHeight: '0.2em',
                fontSize: '1.5em',
                marginTop: '1em',
                marginBottom: '1em',
              }}
            >
              <h1>Kkollectibles</h1>
              <h5>.nakko.fans</h5>
            </div>
          </a>
        </Link>
      </Col>
      <Link href="/wishlist">
        <Button
          type="primary"
          shape="circle"
          icon={<StarFilled />}
          size="large"
        />
      </Link>
    </Row>
  )
}
