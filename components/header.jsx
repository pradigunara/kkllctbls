import { Button, Col, Row } from 'antd'
import Link from 'next/link'
import { StarFilled } from '@ant-design/icons'
import { GROUP } from 'data/constants'

export default function Header({ group = GROUP.fromis }) {
  const [title, ...subtitle] = {
    [GROUP.fromis]: 'kkollectibles.nakko.fans',
    [GROUP.newjeans]: 'kkollektiv.newjeans.fans'
  }[group]?.split('.') ?? []

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
              <h1>{title}</h1>
              <h5>{`.${subtitle.join('.')}`}</h5>
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
