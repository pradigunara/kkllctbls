import Head from 'next/head'
import dynamic from 'next/dynamic'
import 'antd/dist/reset.css'
import './index.css'

const AppBody = dynamic(() => import("components/appbody"), { ssr: false })

export default function MyApp({ Component, pageProps }) {
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

      <AppBody Component={Component} pageProps={pageProps} />
    </>
  )
}
