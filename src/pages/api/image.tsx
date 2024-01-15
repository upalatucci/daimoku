import { kv } from '@vercel/kv';
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

{
  /* <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
    <div className="mx-auto place-self-center">
      <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl from-magenta to-[#ac2aed] bg-gradient-to-r inline-block text-transparent bg-clip-text ">
        Daimoku per il corso Donne
      </h1>
      <div>
        <h2 className="gap-2 font-bold text-4xl md:text-5xl xl:text-6xl my-10 from-magenta to-[#ac2aed] bg-gradient-to-r  text-transparent bg-clip-text">
          {daimoku.toLocaleString()}
          Daimoku
        </h2>
      </div>
    </div>
  </div> */
}

export default async function handler() {
  const daimoku = (await kv.get<number>('daimoku')) || 0;

  const bitterFont = await fetch(new URL('/public/Bitter-Bold.ttf', import.meta.url));

  if (!bitterFont.ok) {
    throw new Error('Failed to fetch the font file');
  }

  const bitterData = await bitterFont.arrayBuffer();

  return new ImageResponse(
    (
      <div
        style={{
          padding: '20',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          fontWeight: 900,
          fontSize: '50px',
          color: 'transparent',
          background: 'linear-gradient(90deg, #ED1E79 0%, #ac2aed 100%)',
          backgroundClip: 'text',
          fontFamily: 'Inter',
        }}
      >
        <h1 style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          Daimoku per il corso Donne
        </h1>
        <h2
          style={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 700,
            fontSize: '70px',
          }}
        >
          <div style={{ marginRight: '20px' }}>{daimoku.toLocaleString()}</div>
          Daimoku
        </h2>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: 'Inter',
          data: bitterData,
          style: 'normal',
        },
      ],
    },
  );
}
