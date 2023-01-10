import Document, { Html, Head, Main, NextScript } from 'next/document'
import { CF_TOKEN, BACKGROUND } from 'data/constants'

class MyDocument extends Document {
  render() {
    const group = process.env.GROUP
    const bgImage = BACKGROUND[group]

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
            href={`/${group}/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`/${group}/favicon-32x32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`/${group}/favicon-16x16.png`}
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body 
          style={{ 
            backgroundImage: bgImage,
            backgroundSize: 'cover',
            minWidth: '100vw',
            minHeight: '100vh'
          }}
        >
          <Main />
          <NextScript />

          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${CF_TOKEN[group]}"}`}
          />
          <script>
            {
              function(){
                if (typeof window === 'undefined') return

                document.onreadystatechange = function() {
                  if (document.readyState !== "complete") {
                    document.querySelector("body").style.visibility = "hidden"
                  } else {
                    document.querySelector("body").style.visibility = "visible"
                  }
                }
              }()
            }
          </script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
