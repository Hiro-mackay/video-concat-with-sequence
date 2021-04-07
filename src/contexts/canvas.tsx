import { createContext, useContext, useEffect } from 'react';
import { Dispatch, useState, FC, memo, SetStateAction } from 'react';
import * as PIXI from 'pixi.js';
import {
  getResources,
  getViewTime,
  loadCurrentSource,
  loadNextSource,
  render,
  Resources,
  setResources as setPIXIResources,
  Source,
  loop as PIXIloop,
  pause,
  play,
  getCurrentTime,
  paused,
  stop
} from '../hooks/Pixi';

export function createCtx<T extends {} | null>() {
  const ctx = createContext<T | undefined>(undefined);

  function useCtx() {
    const c = useContext(ctx);
    if (c === undefined) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }

  return [useCtx, ctx] as const;
}

export interface IEntity {
  app: PIXI.Application;
  currentTime: number;
  viewingTime: number;
  deltaTime: number;
  resources: Resources;
  source: Source;
  nextSource: Source;
}

export interface IContext {
  app: PIXI.Application;
  currentTime: number;
  viewingTime: number;
  deltaTime: number;
  resources: Resources;
  source: Source;
  nextSource: Source;

  setApp: Dispatch<SetStateAction<PIXI.Application>>;
  setCurrentTime: Dispatch<SetStateAction<number>>;
  setViewingTime: Dispatch<SetStateAction<number>>;
  setDeltaTime: Dispatch<SetStateAction<number>>;
  setResources: Dispatch<SetStateAction<Resources>>;
  setSource: Dispatch<SetStateAction<Source>>;
  setNextSource: Dispatch<SetStateAction<Source>>;

  deltaPlay: () => void;
  deltaPause: () => void;
  deltaStop: () => void;
}

export const [useCanvasContext, CanvasContext] = createCtx<IContext>();

export const CanvasProvider: FC = memo(({ children }) => {
  const [app, setApp] = useState<PIXI.Application>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [viewingTime, setViewingTime] = useState(0);
  const [deltaTime, setDeltaTime] = useState(0);
  const [resources, setResources] = useState<Resources>([]);
  const [source, setSource] = useState<Source>({
    sprite: null,
    video: null
  });

  const [nextSource, setNextSource] = useState<Source>({ sprite: null, video: null });

  const loop = () => {
    const time = getCurrentTime();
    setCurrentTime(time);
  };

  const deltaLoop = PIXIloop(loop);

  const renderer = () => {
    if (paused) return;

    deltaLoop();
    requestAnimationFrame(renderer);
  };

  const deltaPlay = () => {
    play();
    renderer();
  };

  const deltaPause = () => {
    pause();
  };

  const deltaStop = () => {
    stop();
    setCurrentTime(0);
  };

  useEffect(() => {
    setPIXIResources(resources);

    const source = loadCurrentSource(currentTime);
    // const next = loadNextSource(currentTime);

    source.video?.pause();
    // next.video?.pause();

    const viewTime = getViewTime();
    setViewingTime(viewTime);
    console.log(resources);
  }, [resources]);

  return (
    <CanvasContext.Provider
      value={{
        app,
        currentTime,
        viewingTime,
        deltaTime,
        resources,
        source,
        nextSource,
        setApp,
        setCurrentTime,
        setViewingTime,
        setDeltaTime,
        setResources,
        setSource,
        setNextSource,
        deltaPlay,
        deltaPause,
        deltaStop
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
});
