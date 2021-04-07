import { createContext, useContext, useEffect } from 'react';
import { Dispatch, useState, FC, memo, SetStateAction } from 'react';

import { useCanvasContext } from './canvas';

const DEFAULT_TIME = 10000;

export interface IContext {
  timeDuration: number;
  timeTicks: number[];
  sequenceScale: number;

  setTimeDuration: Dispatch<SetStateAction<number>>;
  setTimeTicks: Dispatch<SetStateAction<number[]>>;
  setSequenceScale: Dispatch<SetStateAction<number>>;
}

function createCtx<T extends {} | null>() {
  const ctx = createContext<T | undefined>(undefined);

  function useCtx() {
    const c = useContext(ctx);
    if (c === undefined) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }

  return [useCtx, ctx] as const;
}

const createTimeTicks = (time: number) => [...Array(Math.ceil(time / 1000))].map((_, i) => i * 1000);

export const [useSequenceContext, SequenceContext] = createCtx<IContext>();

export const SequenceProvider: FC = memo(({ children }) => {
  const { viewingTime, currentTime } = useCanvasContext();
  const [timeDuration, setTimeDuration] = useState(DEFAULT_TIME);
  const [timeTicks, setTimeTicks] = useState(createTimeTicks(timeDuration));
  const [sequenceScale, setSequenceScale] = useState(10);

  useEffect(() => {
    if (timeDuration < DEFAULT_TIME) return;

    const ticks = createTimeTicks(timeDuration);
    setTimeTicks(ticks);
  }, [timeDuration]);

  useEffect(() => {
    if (viewingTime < DEFAULT_TIME) return;

    setTimeDuration(viewingTime + 1000);
  }, [viewingTime]);

  return (
    <SequenceContext.Provider
      value={{
        timeDuration,
        timeTicks,
        sequenceScale,
        setTimeDuration,
        setTimeTicks,
        setSequenceScale
      }}
    >
      {children}
    </SequenceContext.Provider>
  );
});
