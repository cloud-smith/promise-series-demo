import React, { useState } from 'react';
import { promiseSeries, dummyTask, SeriesReport } from '../../../libs/promiseSeries';
import { Column, Button, UL, LI } from '../../../styles/FlexStyles';

export const FindRollback = () => {
  const defaultState = {
    results: [],
    error: null,
  };

  const [state, setState] = useState<any>(defaultState);

  const delay = 500;

  const onSuccess = (results: SeriesReport) =>
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

  const handleFindRollback = async () => {
    handleReset();
    await promiseSeries({
      tasks: {
        taskA: () => dummyTask({ delay }),
        taskB: () => dummyTask({ delay }),
        taskC: () => dummyTask({ delay, shouldFail: true }),
      },
      rollbacks: {
        taskA: () => dummyTask({ delay }),
        taskB: async ({ findRollback }) => {
          const rollbackTaskC = findRollback('taskC');
          console.log('rollback task-c results: ', rollbackTaskC?.results);
          return await dummyTask({ delay });
        },
        taskC: () => dummyTask({ delay }),
      },
    })
    .then(onSuccess)
    .catch(onError);
  };

  return (
    <Column style={{ flex: 1, display: 'block' }}>
      <h1>FindRollback</h1>
      <ul style={{ display:'flex', listStyle:'none', margin:'1em 0' }}>
        <li style={{ marginRight:'0.5em' }}>
          <Button onClick={handleFindRollback}>
            Find Rollback
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
