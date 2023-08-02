export type PromiseResolver = (resolve: PromiseResolve, reject: PromiseReject) => void;

export type PromiseResolve = (results: any) => void;
export type PromiseReject = (error: any) => void;

export type PromiseThen = (results: any) => void;
export type PromiseCatch = (results: any) => void;
export type PromiseFinally = () => void;

export type PromiseCondition = number;

export type PromiseProto = {
  until: (condition: PromiseCondition) => PromiseProto;
  then: (callback: PromiseThen) => PromiseProto;
  catch: (callback: PromiseCatch) => PromiseProto;
  finally: (callback: PromiseFinally) => PromiseProto;
};

export type PromiseCallbacks = {
  onFinally?: PromiseFinally;
};
