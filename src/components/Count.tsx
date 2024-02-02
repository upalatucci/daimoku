import dynamic from 'next/dynamic';
import React, { FC, useRef } from 'react';

type CountProps = {
  daimoku: number;
};
const Count: FC<CountProps> = ({ daimoku }) => {
  const AnimatedNumbers = dynamic(() => import('react-animated-numbers'), {
    ssr: false,
    loading: () => (
      <>
        {daimoku.toLocaleString()} <span> </span>
      </>
    ),
  });

  const initialDaimokuRef = useRef(daimoku);

  return (
    <AnimatedNumbers
      includeComma
      transitions={() => ({
        type: 'spring',
        duration: initialDaimokuRef.current === daimoku ? 0 : 0.5,
      })}
      animateToNumber={daimoku}
      fontStyle={{
        color: '#ED1E79',
      }}
    />
  );
};

export default Count;
