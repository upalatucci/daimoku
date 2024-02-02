import Image from 'next/image';
import React, { FC, useEffect, useRef, useState } from 'react';
import FlowersIMG from '../assets/flower.png';

type FlowersProps = {
  daimoku: number;
};

const getRandomAnimationDuration = () => {
  const ms = Math.random() * 500 + 500;

  return `${ms}ms`;
};

const Flowers: FC<FlowersProps> = ({ daimoku }) => {
  const nFlowers = Math.round(daimoku / 1_000);
  const [load, setLoad] = useState(false);
  const flowerSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!flowerSectionRef?.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (!entries || !entries?.[0]?.isIntersecting) return;

      if (entries[0].isIntersecting) {
        setLoad(true);
        observer.disconnect();
      }
    });

    const flowerSection = flowerSectionRef.current;

    observer.observe(flowerSection);

    return () => {
      if (flowerSection) {
        observer.unobserve(flowerSection);
      }
    };
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:py-16 lg:px-6">
      <div className="flex flex-wrap-reverse flex-row-reverse" ref={flowerSectionRef}>
        {load ? (
          new Array(nFlowers)
            .fill(0)
            .map((_, index) => (
              <Image
                src={FlowersIMG}
                key={index}
                width={40}
                height={40}
                alt="1000 daimoku"
                className="animate-[daimoku_1s_ease-out]"
                style={{ animationDuration: getRandomAnimationDuration() }}
              />
            ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Flowers;
