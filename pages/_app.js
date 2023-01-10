import Head from 'next/head'
import { Row, Col } from 'antd';
import { GROUP, PRIMARY_COLOR, BACKGROUND } from 'data/constants';
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css';
import './index.css'

export default function MyApp({ Component, pageProps }) {
  const group = process.env.NEXT_PUBLIC_GROUP
  const title = group === GROUP.fromis
    ? 'kkollectibles'
    : 'kkollektiv'

  return (
    <>
      <Head>
        <title>{title}</title>
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
          content={title}
          key="ogsitename"
        />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta
          property="og:description"
          content="gotta kkollect 'em all!"
          key="ogdesc"
        />
      </Head>

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: PRIMARY_COLOR[group],
            colorLink: PRIMARY_COLOR[group],
            colorLinkActive: PRIMARY_COLOR[group],
            colorLinkHover: PRIMARY_COLOR[group],
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
