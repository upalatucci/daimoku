import { Metadata } from "next"
import Image from "next/image"
import AddDaimoku from "components/Modals/AddDaimoku"
import Flower from '../flower.png'

export const metadata: Metadata = {
  title: "Daimoku Corso Donne",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://next-enterprise.vercel.app/",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/project-logo.png",
      },
    ],
  },
}

export default function Web() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl from-magenta to-[#ac2aed] bg-gradient-to-r inline-block text-transparent bg-clip-text ">
              Daimoku per il corso Donne
            </h1>
            <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              24 e 25 febbraio il territorio Salerno ospitera&apos; il corso <strong className="font-bold">Donne Sud Italia</strong>
            </p>
            <div>
              <h2 className="font-bold text-4xl md:text-5xl xl:text-6xl my-10 from-magenta to-[#ac2aed] bg-gradient-to-r inline-block text-transparent bg-clip-text"> 1 000 000 Daimoku</h2>
            </div>

            <AddDaimoku />

          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900">
     
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6 flex items-center justify-center"> <Image src="/flower.png" width={40} height={40} alt="1000 daimoku"/> <span className="font-bold ml-2">= 1000 Daimoku</span> <span className="mx-2">= 10 min</span></div>
        <div className="mx-auto max-w-screen-xl px-4 sm:py-16 lg:px-6">
          <div className="flex flex-wrap-reverse flex-row-reverse">
              {new Array(400).fill(0).map((_, index) => (<Image src="/flower.png" key={index} width={40} height={40} alt="1000 daimoku"/>))}

              <Image src="/flower.png" width={40} height={40} alt="1000 daimoku" className="animate-[daimoku_1s_ease-out]" style={{animationDelay: '150ms'}}/>

              <Image src="/flower.png" width={40} height={40} alt="1000 daimoku" className="animate-[daimoku_1s_ease-out]" style={{animationDelay: '250ms'}}/>
              <Image src="/flower.png" width={40} height={40} alt="1000 daimoku" className="animate-[daimoku_1s_ease-out]" style={{animationDelay: '350ms'}}/>

          </div>
        </div>
      </section>
    </>
  )
}
