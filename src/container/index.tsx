import React, { memo } from 'react';
import Canvas from '../components/Canvas';
import { Sequence } from '../components/Sequnce/Sequence';
import { SequenceTimetick } from '../components/Sequnce/SequenceTimetick';
import { CanvasProvider } from '../contexts/canvas';
import { SequenceProvider } from '../contexts/Sequence';

const DEFAULT_TIME = 10000;

export const Container = memo(() => {
  return (
    <CanvasProvider>
      <SequenceProvider>
        <div className="w-full min-h-screen bg-gray-700">
          <div className="grid grid-cols-1">
            <div
              className="p-24 box-border w-full max-w-6xl"
              style={{
                height: 900
              }}
            >
              <Canvas />
            </div>
          </div>

          <div className="h-96 bg-gray-800 ">
            <div className="w-full overflow-x-scroll p-10 box-border">
              <div className="mb-10">
                <SequenceTimetick />
              </div>
              <Sequence />
            </div>
          </div>
        </div>
      </SequenceProvider>
    </CanvasProvider>
  );
});
export default Container;
