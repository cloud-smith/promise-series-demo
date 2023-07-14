import { promiseSeries } from '@cloud-smith/promise-series';
import { dummyTask } from '../../utilites/dummyTask';

it('should run array series', async () => {
  const results = await promiseSeries({
		tasks: [
			() => dummyTask({ delay: 100 }),
			() => dummyTask({ delay: 100 }),
			() => dummyTask({ delay: 100 }),
		],
	});
	expect(results).toStrictEqual({
    "task-1": "Task Success",
    "task-2": "Task Success",
    "task-3": "Task Success",
  });
});
