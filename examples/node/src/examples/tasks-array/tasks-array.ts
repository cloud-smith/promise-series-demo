import { promiseSeries, dummyTask } from '../../lib/promiseSeries';

type TaskArrayProps = {
  delay: number;
  shouldFail: boolean;
};

export const tasksArray = async ({ delay, shouldFail }: TaskArrayProps) => {

  const tasks = [
    () => dummyTask({ delay }),
    () => dummyTask({ delay, shouldFail }),
    () => dummyTask({ delay }),
  ];

  return promiseSeries({
    tasks,
  });

};
