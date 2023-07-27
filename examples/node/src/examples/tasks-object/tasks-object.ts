import { promiseSeries, dummyTask } from '../../lib/promiseSeries';

type TaskArrayProps = {
  delay: number;
  shouldFail: boolean;
};

export const tasksObject = async ({ delay, shouldFail }: TaskArrayProps) => {

  const tasks = {
    getApples: () => dummyTask({ delay }),
    getOrganges: () => dummyTask({ delay, shouldFail }),
    getGrapes: () => dummyTask({ delay }),
  };

  return promiseSeries({
    tasks,
  });

};
