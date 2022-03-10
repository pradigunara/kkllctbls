import Head from 'next/head'
import 'antd/dist/antd.css';
import './index.css'
import { Row, Col } from 'antd';
import previewImage from 'public/preview.jpg'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Kkollectibles</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          key="viewport"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="gotta kkollect 'em all!"
          key="desc"
        />
        <meta property="og:image" content={previewImage} key="ogimage" />
        <meta property="og:site_name" content="Kkollectibles" key="ogsitename" />
        <meta property="og:title" content="Kkollectibles" key="ogtitle" />
        <meta property="og:description" content="gotta kkollect 'em all!" key="ogdesc" />
      </Head>
      <Row
        justify="center"
        style={{
          fontFamily: 'Architects Daughter, cursive',
          margin: '1em'
        }}>
        <Col xs={24} md={10}>
          <Component {...pageProps} />
        </Col>
      </Row>
    </>
  )
}
