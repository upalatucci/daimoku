import { kv } from '@vercel/kv';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import Count from 'src/components/Count';
import Flowers from 'src/components/Flowers';
import AddDaimoku from 'src/components/Modals/AddDaimoku';
import FlowersIMG from '../assets/flower.png';

const Home: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ initialDaimoku }) => {
  const [daimoku, setDaimoku] = useState(initialDaimoku);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/api/daimoku')
        .then((response) => response.json())
        .then((response) => {
          if ('daimoku' in (response as any)) setDaimoku((response as any).daimoku);
        });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl from-magenta to-[#ac2aed] bg-gradient-to-r inline-block text-transparent bg-clip-text ">
              Daimoku per il corso Donne Nazionale
            </h1>
            <p className="mx-auto mb-6 max-w-2xl font-light text-gray-600 md:text-lg lg:mb-8 lg:text-xl">
              24 e 25 febbraio il territorio Salerno ospitera&apos; il corso{' '}
              <strong className="font-bold">Donne Macroarea Sud Italia</strong>
            </p>
            <div className="text-left max-w-lg mx-auto my-8 text-gray-600">
              <span className="font-bold">Obiettivi del Corso:</span>
              <ul className="list-disc list-inside pl-2 mt-2">
                <li>100 min di Daimoku al giorno</li>
                <li>
                  10 dialoghi con 10 persone diverse, impegnandoci in modo che almeno una di queste
                  persone inizi a partecipare alle nostre riunioni
                </li>
                <li>
                  <a
                    href="https://ilnuovorinascimento.org/c/la-nuova-rivoluzione-umana/"
                    target="_blank"
                    className="underline text-magenta"
                    rel="noreferrer"
                  >
                    Studio del NRU Vol. 30 Capitolo Il Voto
                  </a>
                </li>
                <li>
                  <a
                    href="https://ilnuovorinascimento.org/a/siate-la-colonna-della-fiducia-e-della-speranza-nella-societa/"
                    className="underline text-magenta"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Studio delle linee guida per l&apos;Italia
                  </a>
                </li>
              </ul>
            </div>
            <em className="text-gray-600">
              La vera forza motrice del cambiamento sono le preghiere delle donne e le loro attività
              profondamente radicate nella vita quotidiana. Il potere delle donne può essere
              paragonato al potere della terra. Quando la terra si muove, ogni cosa si muove. I
              baluardi del potere crollano e anche le montagne apparentemente inamovibili si
              spostano. La forza delle donne è illimitata. Nulla può superarla» (NRU, 11, 50).
            </em>
            <div>
              <h2 className="flex  items-center justify-center gap-2 font-bold text-4xl md:text-5xl xl:text-6xl my-10 from-magenta to-[#ac2aed] bg-gradient-to-r  text-transparent bg-clip-text">
                <Count daimoku={daimoku} />
                Daimoku
              </h2>
            </div>

            <AddDaimoku setNewDaimoku={setDaimoku} />
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6 flex items-center justify-center">
          <Image src={FlowersIMG} width={40} height={40} alt="1000 daimoku" />{' '}
          <span className="font-bold ml-2">= 1.000 Daimoku</span>{' '}
          <span className="mx-2">= 20 min</span>
        </div>
        <Flowers daimoku={daimoku} />
      </section>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const initialDaimoku = (await kv.get<number>('daimoku')) || 0;

  return {
    props: {
      initialDaimoku,
    },
    revalidate: 60,
  };
};
