import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap"
            rel="stylesheet"
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`/favicon-32x32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`/favicon-16x16.png`}
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="google-site-verification" content="TkQ-Ynws2zX32l0dGBCIpWvYaMDhHIOUydTNJp-UTsc" />
        </Head>
        <body >
          <Main />
          <NextScript />

          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "a0b2ad60e02f41be93de262eeb3012bd"}`}
          />
          <script> </script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
