import Head from 'next/head'
import 'antd/dist/antd.css';
import './index.css'
import { Row, Col } from 'antd';
import { GROUP } from 'data/constants';

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
      <Row
        justify="center" style={{
          fontFamily: 'Architects Daughter, cursive', margin: '1em'
        }}
      >
        <Col xs={24} md={10}> <Component {...pageProps} />
        </Col>
      </Row>
    </>
  )
}
