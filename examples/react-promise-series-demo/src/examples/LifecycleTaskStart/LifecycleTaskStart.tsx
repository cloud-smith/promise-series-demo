import React, { useState } from 'react';
import { promiseSeries, dummyTask, SeriesStateUpdate } from '../../promiseSeries';
import { Column, Button } from '../../styles/FlexStyles';

export const LifecycleTaskStart = () => {
  const [state, onStateChange] = useState<SeriesStateUpdate>({
    taskIndex: 0,
    taskName: '',
    taskLabel: '',
    isRunning: false,
    isComplete: false,
    tasks: [],
  });

  const delay = 500;

  const onTaskStart = (update: SeriesStateUpdate) => {
    console.log('onTaskStart state: ', update);
  };

  const handleSimulateSuccess = async () =>
    await promiseSeries({
      tasks: [
        () => dummyTask({ delay }),
        () => dummyTask({ delay }),
        () => dummyTask({ delay }),
      ],
      onStateChange,
      onTaskStart,
    })
      .then(console.log)
      .catch(console.error);

  const handleSimulateFailure = async () =>
    await promiseSeries({
      tasks: [
        () => dummyTask({ delay }),
        () => dummyTask({ delay, shouldFail: true }),
        () => dummyTask({ delay }),
      ],
      onStateChange,
    })
      .then(console.log)
      .catch(console.error);

  return (
    <Column style={{ flex: 1, display: 'block' }}>
      <h1>Lifecycle onTaskStart</h1>
      <ul style={{ display:'flex', listStyle:'none', margin:'1em 0' }}>
        <li style={{ marginRight:'0.5em' }}><Button onClick={handleSimulateSuccess}>Simulate Success</Button></li>
        <li><Button onClick={handleSimulateFailure}>Simulate Failure</Button></li>
      </ul>
      <Column>
        <p>isRunning: {String(state.isRunning)}</p>
        <p>isComplete: {String(state.isComplete)}</p>
        <p>Index: {JSON.stringify(state.taskIndex)}</p>
        <p>Name: {String(state.taskName)}</p>
        <p>Label: {String(state.taskLabel)}</p>
        <p>Results: {JSON.stringify(state.tasks)}</p>
      </Column>
    </Column>
  );
};
