import { promiseSeries, dummyTask } from '../../lib/promiseSeries';

it('should run array series', async () => {
  const results = await promiseSeries({
		tasks: {
      getApples: () => dummyTask({ delay: 100 }),
      getOrganges: () => dummyTask({ delay: 100 }),
      getGrapes: () => dummyTask({ delay: 100 }),
    },
	});
	expect(JSON.stringify(results)).toStrictEqual(
    `[{\"number\":1,\"name\":\"getApples\",\"results\":\"Task Success\"},{\"number\":2,\"name\":\"getOrganges\",\"results\":\"Task Success\"},{\"number\":3,\"name\":\"getGrapes\",\"results\":\"Task Success\"}]`
  );
});

it('should test array series error handling', async () => {
  expect.assertions(1);
  try {
    await promiseSeries({
      tasks: {
        getApples: () => dummyTask({ delay: 100 }),
        getOrganges: () => dummyTask({ delay: 100, shouldFail: true }),
        getGrapes: () => dummyTask({ delay: 100 }),
      },
    });
  } catch (error) {
    expect(JSON.stringify(error)).toStrictEqual(`{\"number\":2,\"name\":\"getOrganges\",\"error\":\"Task Failed\"}`);
  }
});
