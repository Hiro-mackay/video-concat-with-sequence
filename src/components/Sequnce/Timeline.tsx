import React, { FC, memo } from 'react';

interface TimelineProps {
  sequenceScale: number;
  length: number;
  title: string;
}

export const Timeline: FC<TimelineProps> = memo(({ sequenceScale, length, title }) => {
  return (
    <div
      className="bg-yellow-600 cursor-move box-border p-2 rounded-lg"
      style={{ width: length / sequenceScale, marginRight: 1 }}
    >
      {title}
    </div>
  );
});
