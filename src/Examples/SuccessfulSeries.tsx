import React, { useState } from 'react';
import { promiseSeries, SeriesState } from '@cloud-smith/promise-series';

export const SuccessfulSeries = () => {
  const [state, onStateChange] = useState({
    taskName: '',
    isRunning: false,
    isComplete: false,
    results: {},
    error: '',
  });

  const handler = async () => {
    const dummyTask = ({ delay, shouldFail, state }: {
      delay: number;
      shouldFail?: Boolean;
      state?: any;
    }) => new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state) console.log(state);
        if (shouldFail) reject(`Task Failed`);
        else resolve(`Task Success`);
      }, delay);
    });

    const tasksArray = [
      (state: SeriesState) => dummyTask({ delay: 500, state }),
      (state: SeriesState) => dummyTask({ delay: 500, state, shouldFail: false }),
      (state: SeriesState) => dummyTask({ delay: 500, state }),
      () => {
        console.log('herererere');
      }
    ];
    
    const tasksObject = {
      task1: (state: SeriesState) => dummyTask({ delay: 500, state }),
      task2: (state: SeriesState) => dummyTask({ delay: 500, state, shouldFail: false }),
      task3: (state: SeriesState) => dummyTask({ delay: 500, state }),
      task4: () => {
        console.log('herererere');
      }
    };

    await promiseSeries({
      tasks: tasksArray,
      onStateChange,
    })
      .then(console.log)
      .catch(console.error);
  };

  return (
    <div>
      <h1>Successful Series</h1>
      <div>
        <p>Task Name: {String(state.taskName)}</p>
        <p>Running: {String(state.isRunning)}</p>
        <p>Complete: {String(state.isComplete)}</p>
        <p>Error: {JSON.stringify(state.error)}</p>
        <p>Results: {JSON.stringify(state.results)}</p>
      </div>
      <button onClick={handler}>Run Successful Series</button>
    </div>
  );
};
