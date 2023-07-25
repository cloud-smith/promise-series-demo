import React, { useState, useCallback } from 'react';
import { promiseSeries, dummyTask, SeriesStateUpdate } from '../../promiseSeries';
import { Column, Button, UL, LI } from '../../styles/FlexStyles';

const useRollbacks = () => {
  const [state, onStateChange] = useState<SeriesStateUpdate>({
    taskIndex: 0,
    taskName: '',
    taskLabel: '',
    isRunning: false,
    isComplete: false,
    tasks: [],
  });

  // const [basket, setBasket] = useState({
  //   apples: 0,
  //   organges: 0,
  //   grapes: 0,
  // });

  let basket = {
    apples: 0,
    organges: 0,
    grapes: 0,
  };

  const delay = 500;

  const handleSetBasket = useCallback((item: string, value: number) => {
    const update = {
      ...basket,
      [item]: value,
    };
    console.log('SET', update);
    // setBasket(update);
    basket = update;
  }, []);

  const getTasks = ({ shouldFail }: { shouldFail?: boolean }) => ({
    getApples: async () => {
      await dummyTask({ delay });
      handleSetBasket('apples', 1);
    },
    getOrganges: async () => {
      await dummyTask({ delay });
      handleSetBasket('organges', 1);
    },
    getGrapes: async () => {
      console.log('I will add grapes!');
      await dummyTask({ delay, shouldFail });
      handleSetBasket('grapes', 1);
    },
    deliverBasket: () => {
      console.log('Your basket sir, ', basket);
    },
  });

  const rollbacks = {
    getApples: async () => {
      await dummyTask({ delay });
      handleSetBasket('apples', 0);
      return 'removed apples';
    },
    getOrganges: async () => {
      await dummyTask({ delay });
      handleSetBasket('organges', 0);
      return 'removed organges';
    },
    getGrapes: async () => {
      console.log('I will rollback grapes!');
      await dummyTask({ delay });
      handleSetBasket('grapes', 0);
      return 'removed grapes';
    },
    deliverBasket: () => {
      console.log('We ditched your basket sir, ', basket);
    },
  };

  const handleSimulateSuccess = async () =>
    await promiseSeries({
      tasks: getTasks({}),
      rollbacks,
      onStateChange,
    })
      .then(console.log)
      .catch(console.error);

  const handleSimulateFailure = async () =>
    await promiseSeries({
      tasks: getTasks({ shouldFail: true }),
      rollbacks,
      onStateChange,
    })
      .then(console.log)
      .catch(console.error);

  return {
    state,
    basket,
    handleSimulateSuccess,
    handleSimulateFailure,
  };
};

export const Rollbacks = () => {
  const {
    state,
    basket,
    handleSimulateSuccess,
    handleSimulateFailure,
  } = useRollbacks();

  return (
    <Column style={{ flex: 1, display: 'block' }}>
      <h1>Rollbacks</h1>
      <ul style={{ display:'flex', listStyle:'none', margin:'1em 0' }}>
        <li style={{ marginRight:'0.5em' }}><Button onClick={handleSimulateSuccess}>Simulate Success</Button></li>
        <li><Button onClick={handleSimulateFailure}>Simulate Failure</Button></li>
      </ul>
      <Column>
        <UL>
          <LI>Apples: {basket.apples}</LI>
          <LI>Organges: {basket.organges}</LI>
          <LI>Grapes: {basket.grapes}</LI>
        </UL>
        <Column style={{ paddingTop:'1em' }}>
          <p>isRunning: {String(state.isRunning)}</p>
          <p>isComplete: {String(state.isComplete)}</p>
          <p>Index: {JSON.stringify(state.taskIndex)}</p>
          <p>Name: {String(state.taskName)}</p>
          <p>Label: {String(state.taskLabel)}</p>
          <p>Results: {JSON.stringify(state.tasks)}</p>
        </Column>
      </Column>
    </Column>
  );
};
