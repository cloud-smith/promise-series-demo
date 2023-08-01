import {
  tasksArray,
  tasksObject,
} from './examples';

const examples = {
  'tasks-array': tasksArray,
  'tasks-object': tasksObject,
};

(async () => {

  const example = {
    name: 'tasks-array',
    props: {
      delay: 500,
      shouldFail: false,
    },
  };
  
  await examples[example.name](example.props)
    .then(console.log)
    .catch(console.error);

})();
