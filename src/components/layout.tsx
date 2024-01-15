import { Bitter } from "next/font/google";
import Head from "next/head"
import { useRouter } from "next/router"


const bitter = Bitter({
  variable: "--font-bitter",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const metaTitle = "Daimoku Corso Donne"

  const metaDescription = "24 e 25 febbraio il territorio Salerno ospiterá il corso Donne Sud Italia"


  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="twitter:description" content={metaDescription} />
        <meta property="og:description" content={metaDescription} />

        <meta property="og:locale" content="it_IT" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:url" content={router.asPath} />
        <meta property="og:site_name" content="Il Nuovo Rinascimento" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* {imageURL && (
          <>
            <meta property="og:image" content={imageURL} />
            <meta name="twitter:image" content={imageURL} />
          </>
        )}

        {imageCaption && (
          <meta property="og:image:alt" content={imageCaption}></meta>
        )} */}

        <meta name="twitter:title" content={metaTitle} />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="144x144"
          href="/favicon/android-icon-144x144.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
      </Head>

        <main>{children}</main>
    </>
  )
}
