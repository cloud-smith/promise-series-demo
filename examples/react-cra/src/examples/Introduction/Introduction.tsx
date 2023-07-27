import React from 'react';
import ReactMarkdown from 'react-markdown'

const basicExample = `
  ~~~js
  import { promiseSeries } from '@cloud-smith/promise-series';

  const tasks = [
    () => dummyTask({ delay: 500 }),
    () => dummyTask({ delay: 500 }),
    () => dummyTask({ delay: 500 }),
  ];

  await promiseSeries(tasks)
    .then(console.log);
    .catch(console.error);
  ~~~
`;

export const Introduction = () => (
  <div>
    <h1>PromiseSeries v1.1.0</h1>
    <div style={{ padding:'1em 0'}}>
      <h2>Introduction</h2>
      <p>A Javascript promise-series utility for running tasks in series.</p>
    </div>
    <div style={{ padding:'1em 0'}}>
      <h2>Basic Usage</h2>
      <ReactMarkdown children={basicExample} />
    </div>
  </div>
);
