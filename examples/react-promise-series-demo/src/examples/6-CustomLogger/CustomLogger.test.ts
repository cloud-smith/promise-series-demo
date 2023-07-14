import { promiseSeries } from '@cloud-smith/promise-series';
import { dummyTask } from '../../utilites/dummyTask';

it('should run custom logger', async () => {
  const logs: any[] = [];

  const customLogger = (log: string) => {
    logs.push(log);
    console.log(log);
  };

  await promiseSeries({
    config: {
      useLogging: true,
      useLogger: customLogger,
    },
		tasks: [
			() => dummyTask({ delay: 100 }),
		],
	});

	expect(logs).toStrictEqual(["starting...", "task 1 of 1: task-1, starting", "task 1 of 1: task-1, finished", "finished"]);
});
