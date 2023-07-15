import React, { useState } from 'react';
import { promiseSeries } from '@cloud-smith/promise-series';
import { dummyTask } from '../../utilites/dummyTask';
import { Column, Button } from '../../styles/FlexStyles';

export const MixedArrays = () => {
  const [state, onStateChange] = useState({
    taskName: '',
    isRunning: false,
    isComplete: false,
    results: {},
    error: '',
  });

  const delay = 100;

	const tasks = [
		() => dummyTask({ delay }),
		() => dummyTask({ delay }),
		() => dummyTask({ delay }),
    () => {
      const results = 'Task Success';
      console.log(results);
      return results;
    },
	];

  const handleTasks = async () =>
    await promiseSeries({
      tasks,
      onStateChange,
    })
      .then(console.log)
      .catch(console.error);

  return (
    <Column style={{ flex: 1, display: 'block' }}>
      <h1>Mixed Arrays</h1>

      <Column style={{ paddingTop: '1em', paddingBottom: '1em' }}>
        <p>Task Name: {String(state.taskName)}</p>
        <p>Running: {String(state.isRunning)}</p>
        <p>Complete: {String(state.isComplete)}</p>
        <p>Results: {JSON.stringify(state.results)}</p>
        <p>Error: {JSON.stringify(state.error)}</p>
      </Column>

      <Button onClick={handleTasks}>Run Demo</Button>
    </Column>
  );
};
