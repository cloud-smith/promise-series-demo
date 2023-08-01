import React, { useState } from 'react';
import { promiseSeries, dummyTask, SeriesTaskWrapper } from '../../libs/promiseSeries';
import { Column, Button, UL, LI } from '../../styles/FlexStyles';

export const Rollbacks = () => {
  const defaultState = {
    results: [],
    error: null,
    basket: {
      apples: 0,
      oranges: 0,
      grapes: 0,
    },
  };

  const [state, setState] = useState<any>(defaultState);

  const delay = 500;

  const getTasks = ({ shouldFail }: { shouldFail?: boolean }) => ({
    getApples: async () => await dummyTask({ delay })
      .then(results => {
        handleUpdateBasket({ apples: 1 });
        return results;
      }),
    getOranges: async () => await dummyTask({ delay, shouldFail })
      .then(results => {
        handleUpdateBasket({ oranges: 1 });
        return results;
      }),
    getGrapes: async () => await dummyTask({ delay })
      .then(results => {
        handleUpdateBasket({ grapes: 1 });
        return results;
      }),
  });

  const rollbacks = {
    getApples: async () => await dummyTask({ delay })
      .then(results => {
        handleUpdateBasket({ apples: 0 });
        return results;
      }),
    getOranges: async () => await dummyTask({ delay })
      .then(results => {
        handleUpdateBasket({ oranges: 0 });
        return results;
      }),
    getGrapes: async () => await dummyTask({ delay })
      .then(results => {
        handleUpdateBasket({ grapes: 0 });
        return results;
      }),
  };

  const onSuccess = (results: SeriesTaskWrapper[]) => {
    console.log(results);
    setState({
      ...state,
      error: null,
      results,
    });
  };
  
  const onError = (error: any) => {
    console.error(error);
    setState({
      ...state,
      results: [],
      error
    });
  };

  const handleUpdateBasket = (updates: Record<string, any>) =>
    setState({
      ...state,
      basket: {
        ...state.basket,
        ...updates,
      },
    });

  const handleReset = () => {
    console.clear();
    setState(defaultState);
  };

  const handleTasksSuccessfully = async () => {
    handleReset();
    await promiseSeries({
      tasks: getTasks({}),
      rollbacks,
    })
    .then(onSuccess)
    .catch(onError);
  };

  const handleTasksWithFailure = async () => {
    handleReset();
    await promiseSeries({
      tasks: getTasks({ shouldFail: true }),
      rollbacks,
    })
    .then(onSuccess)
    .catch(onError);
  };

  return (
    <Column style={{ flex: 1, display: 'block' }}>
      <h1>Rollbacks</h1>
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
        <UL>
          <LI>Apples: {state.basket.apples}</LI>
          <LI>Organges: {state.basket.organges}</LI>
          <LI>Grapes: {state.basket.grapes}</LI>
        </UL>
      </Column>
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
