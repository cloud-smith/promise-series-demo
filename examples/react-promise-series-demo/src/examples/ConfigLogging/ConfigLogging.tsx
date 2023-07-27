import React, { useState } from 'react';
import { promiseSeries, dummyTask } from '../../promiseSeries';
import { Column, Button } from '../../styles/FlexStyles';

export const ConfigLogging = () => {
  const [state, onStateChange] = useState<any>({
    taskIndex: 0,
    taskName: '',
    taskLabel: '',
    isRunning: false,
    isComplete: false,
    tasks: [],
  });

  const delay = 500;

  const handleSimulateSuccess = async (useLogging: boolean) =>
    await promiseSeries({
      useLogging,
      tasks: [
        () => dummyTask({ delay }),
        () => dummyTask({ delay }),
        () => dummyTask({ delay }),
      ],
      onStateChange,
    })
      .then(console.log)
      .catch(console.error);

  const handleSimulateFailure = async (useLogging: boolean) =>
    await promiseSeries({
      useLogging,
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
      <h1>useLogging</h1>
      <div style={{ padding:'1em 0' }}>
        <p>With Logging</p>
        <ul style={{ display:'flex', listStyle:'none', margin:'1em 0' }}>
          <li style={{ marginRight:'0.5em' }}>
            <Button onClick={() => handleSimulateSuccess(true)}>
              Simulate Success
            </Button>
          </li>
          <li>
            <Button onClick={() => handleSimulateFailure(true)}>
              Simulate Failure
            </Button>
          </li>
        </ul>
        <p>Without Logging</p>
        <ul style={{ display:'flex', listStyle:'none', margin:'1em 0' }}>
          <li style={{ marginRight:'0.5em' }}>
            <Button onClick={() => handleSimulateSuccess(false)}>
              Simulate Success
            </Button>
          </li>
          <li>
            <Button onClick={() => handleSimulateFailure(false)}>
              Simulate Failure
            </Button>
          </li>
        </ul>
      </div>
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
