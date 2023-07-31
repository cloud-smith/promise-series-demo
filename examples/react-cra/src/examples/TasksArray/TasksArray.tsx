import React, { useState } from 'react';
import { promiseSeries, dummyTask, SeriesTaskWrapper } from '../../libs/promiseSeries';
import { Column, Button, UL, LI } from '../../styles/FlexStyles';

export const TasksArray = () => {
  const defaultState = {
    results: [],
    error: null,
  };

  const [state, setState] = useState<any>(defaultState);

  const delay = 500;

  const onSuccess = (results: SeriesTaskWrapper[]) =>
    setState({
      error: null,
      results,
    });
  
  const onError = (error: any) =>
    setState({
      results: [],
      error
    });

  const handleReset = () => {
    console.clear();
    setState(defaultState);
  };

  const handleTasksSuccessfully = async () => {
    handleReset();
    await promiseSeries({
      tasks: [
        () => dummyTask({ delay }),
        () => dummyTask({ delay }),
        () => dummyTask({ delay }),
      ],
    })
    .then(onSuccess)
    .catch(onError);
  };

  const handleTasksWithFailure = async () => {
    handleReset();
    await promiseSeries({
      tasks: [
        () => dummyTask({ delay }),
        () => dummyTask({ delay, shouldFail: true }),
        () => dummyTask({ delay }),
      ],
    })
    .then(onSuccess)
    .catch(onError);
  };

  return (
    <Column style={{ flex: 1, display: 'block' }}>
      <h1>Array of promises</h1>
      <ul style={{ display:'flex', listStyle:'none', margin:'1em 0' }}>
        <li style={{ marginRight:'0.5em' }}>
          <Button onClick={handleTasksSuccessfully}>
            Simulate Success
          </Button>
        </li>
        <li>
          <Button onClick={handleTasksWithFailure}>
            Simulate Failure
          </Button>
        </li>
      </ul>
      <Column>
        {state.results.length ? (
          <>
            <p>Results:</p>
            <UL>
              {state.results.map((item: any, index: number) => (
                <LI key={index}>{JSON.stringify(item)}</LI>
              ))}
            </UL>
          </>
        ) : <></>}
        {state.error && (
          <p>Error: {JSON.stringify(state.error)}</p>
        )}
      </Column>
    </Column>
  );
};
