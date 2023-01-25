import { Button, Col, Row } from 'antd'
import Link from 'next/link'
import { StarFilled } from '@ant-design/icons'

export default function Header() {
  return (
    <Row justify="space-between" align="middle">
      <Col>
        <Link href="/">
          <a>
            <div
              style={{
                lineHeight: '0.2em',
                marginTop: '1em',
                marginBottom: '1em',
              }}
            >
              <h1 style={{ fontSize: '2.5em' }}>kkollectibles</h1>
              <h5>k-pop girl group photocard template</h5>
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
    </Row >
  )
}
