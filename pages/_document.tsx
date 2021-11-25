import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head lang="en">
          {/* for example if you want to add GTM you will do it here with a script -
          take a look at NextJs examples https://github.com/vercel/next.js/tree/canary/examples/with-google-tag-manager */}
          <link rel="manifest" href="/manifest.json" />
          {/* are this 2 lines needed? */}
          {/* <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#0F0C41" /> */}
          <link rel="preload" as="font" />
        </Head>
        <body>
          {/* add this script in lesson 2 where you explain the toggle light dark mode */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              function getUserPreference() {
                if(window?.localStorage.getItem('theme')) {
                  return window?.localStorage.getItem('theme')
                }
                return 'dark'
              }
              document.body.dataset.theme = getUserPreference();
            `
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
