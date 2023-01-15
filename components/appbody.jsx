import { Row, Col } from 'antd'
import { getPrimaryColor } from 'data/constants'
import { ConfigProvider } from 'antd'
import { useRouter } from 'next/router'

export default function AppBody({ Component, pageProps }) {
  const router = useRouter()
  const group = router.query?.group

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: getPrimaryColor(group),
          colorLink: getPrimaryColor(group),
          colorLinkActive: getPrimaryColor(group),
          colorLinkHover: getPrimaryColor(group),
          fontFamily: 'Architects Daughter, cursive',
        },
      }}
    >
      <Row justify="center" style={{ margin: '1em' }}>
        <Col xs={24} md={10}> <Component {...pageProps} />
        </Col>
      </Row>
    </ConfigProvider>
  )
}