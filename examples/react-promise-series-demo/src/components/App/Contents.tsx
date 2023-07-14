import React from 'react';
import {
  ArraySeries,
  NamedSeries,
  MixedArrays,
  PromiseState,
} from '../../examples';

export const contents: any = {
  'array-series': () => <ArraySeries />,
  'named-series': () => <NamedSeries />,
  'mixed-arrays': () => <MixedArrays />,
  'promise-state': () => <PromiseState />,
};
