import React, { FC, memo, useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { useCanvasContext } from '../../contexts/canvas';
import { useSequenceContext } from '../../contexts/Sequence';
import { Timeline } from './Timeline';
import { reloadResource } from '../../hooks/Pixi';

export const Sequence: FC = memo(() => {
  const { resources, setResources } = useCanvasContext();
  const {} = useCanvasContext();
  const { sequenceScale } = useSequenceContext();

  return (
    <ReactSortable
      className="flex flex-nowrap w-min"
      list={resources}
      setList={(state) => {
        const resources = reloadResource(state);
        setResources(resources);
      }}
      swapThreshold={0.8}
      ghostClass="bg-green-300"
      animation={300}
      delay={1}
    >
      {resources.map((item) => (
        <Timeline key={item.id} title={`${item.id}`} length={item.outFrame} sequenceScale={sequenceScale} />
      ))}
    </ReactSortable>
  );
});
