import { Bitter } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';

const bitter = Bitter({
  variable: '--font-bitter',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const metaTitle = 'Daimoku Corso Donne Nazionale';

  const metaDescription =
    '24 e 25 febbraio il territorio Salerno ospiterá il corso Donne Nazionale Macroarea Sud Italia';

  const imageURL = '/api/image';
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

        <meta property="og:image" content={imageURL} />
        <meta name="twitter:image" content={imageURL} />

        <meta property="og:image:alt" content="Daimoku per il corso Donne"></meta>

        <meta name="twitter:title" content={metaTitle} />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <main className={bitter.className}>{children}</main>
    </>
  );
}
