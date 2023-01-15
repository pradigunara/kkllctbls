import Head from 'next/head'
import { Row, Col } from 'antd'
import { getPrimaryColor } from 'data/constants'
import { ConfigProvider } from 'antd'
import {useRouter} from 'next/router'
import 'antd/dist/reset.css'
import './index.css'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const group = router.query?.group

  return (
    <>
      <Head>
        <title>kkollectibles</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          key="viewport"
        />
        <meta
          name="description"
          content="gotta kkollect 'em all!"
          key="desc"
        />
        <meta property="og:image" content="preview.jpg" key="ogimage" />
        <meta
          property="og:site_name"
          content="kkollectibles"
          key="ogsitename"
        />
        <meta property="og:title" content="kkollectibles" key="ogtitle" />
        <meta
          property="og:description"
          content="gotta kkollect 'em all!"
          key="ogdesc"
        />
      </Head>

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
    </>
  )
}
