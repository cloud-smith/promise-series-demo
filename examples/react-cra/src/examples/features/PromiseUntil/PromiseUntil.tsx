import React from 'react';
import { promiseUntil } from '../../../libs/promiseUntil';
import { dummyTask } from '@cloud-smith/promise-series';

export const PromiseUntil = () => {

  const handleGo = ({ shouldFail }: { shouldFail: boolean }) => {
    console.clear();

    promiseUntil(async (resolve, reject) => {
      await dummyTask({ delay: 2500, shouldFail })
        .then(resolve)
        .catch(reject);
    })
      .until(1000)
      .then(results => {
        console.log('then: ', results);
      })
      .catch(error => {
        console.error('catch: ', error);
      })
      .finally(() => {
        console.log('finally!');
      });
  };

  return (
    <div>
      <button onClick={() => handleGo({ shouldFail: false })}>
        Test Success
      </button>&nbsp;
      <button onClick={() => handleGo({ shouldFail: true })}>
        Test Fail
      </button>
    </div>
  )
}