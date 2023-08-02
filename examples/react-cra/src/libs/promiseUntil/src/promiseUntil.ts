import * as Types from './PromiseUntil.types';

export const promiseUntil = (resolver: Types.PromiseResolver) => {
  let state: any = {
    isCanceled: false,
    isComplete: false,
    results: undefined,
    error: undefined,
  };

  const promise = new Promise((resolve, reject) => {
    const onSuccess = (results: any) => {
      state.isComplete = true;
      state.results = results;
      resolve(results);
    };
    const onError = (error: any) => {
      state.isComplete = true;
      state.error = error;
      reject(error);
    };
    resolver(onSuccess, onError);
  });

  const callbacks: Types.PromiseCallbacks = {};

  const proto: Types.PromiseProto = {
    then: callback => {
      (async () => {

        await promise
          .then(results => {
            if (state.isCanceled) return;
            callback(state.results = results);
          })
          .catch(() => {});

      })();
      return proto;
    },
    catch: (callback: Types.PromiseCatch) => {
      (async () => {

        await promise
          .catch(error => {
            if (state.isCanceled) return;
            callback(state.error = error);
          });

      })();
      return proto;
    },
    finally: (callback: Types.PromiseFinally) => {
      callbacks.onFinally = callback;
      (async () => {

        await promise
          .finally(() => {
            if (state.isCanceled) return;
            callback();
          })
          .catch(() => {});

      })();
      return proto;
    },
    until: (condition: Types.PromiseCondition) => {
      if (typeof condition === 'number') {
        setTimeout(() => {
          state.isCanceled = true;
          if (!state.isComplete && callbacks.onFinally) callbacks.onFinally();
        }, condition);
      }
      return proto;
    },
  };

  return proto;
};
