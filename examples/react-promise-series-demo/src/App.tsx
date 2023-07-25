import React, { useState } from 'react';
import { Row, Column, UL, LI, Link } from './styles/FlexStyles';

import {
  Introduction,
  TasksArray,
  TasksArrayMixed,
  TasksObject,
  TasksObjectMixed,
  TaskState,
  PromiseState,
  LifecycleStarting,
  LifecycleTaskStart,
  LifecycleTaskComplete,
  LifecycleTaskFailed,
  LifecycleFinished,
  Rollbacks,
  ConfigLogging,
  ConfigLogger,
} from './examples';

export const App = () => {
  const [screenName, setScreenName] = useState('introduction');

  const screens: any = {
    'introduction': <Introduction />,
    'tasks-array': <TasksArray />,
    'tasks-array-mixed': <TasksArrayMixed />,
    'tasks-object': <TasksObject />,
    'tasks-object-mixed': <TasksObjectMixed />,
    'task-state': <TaskState />,
    'promise-state': <PromiseState />,
    'lifecycle-starting': <LifecycleStarting />,
    'lifecycle-task-start': <LifecycleTaskStart />,
    'lifecycle-task-complete': <LifecycleTaskComplete />,
    'lifecycle-task-failed': <LifecycleTaskFailed />,
    'lifecycle-finished': <LifecycleFinished />,
    'rollbacks': <Rollbacks />,
    'config-logging': <ConfigLogging />,
    'config-logger': <ConfigLogger />,
  };

  return (
    <Row>
      <div style={{ minWidth:'5em', padding:'1em' }}>
        <UL style={{ paddingTop:0 }}>
          <LI>
            <Link onClick={() => setScreenName('introduction')}>
              Introduction
            </Link>
          </LI>
          <LI style={{ paddingTop:'1em' }}>
            Task Formats
            <UL style={{ paddingLeft: '0.5em'}}>
              <LI>
                <Link onClick={() => setScreenName('tasks-array')}>
                  Array of promises
                </Link>
              </LI>
              <LI>
                <Link onClick={() => setScreenName('tasks-array-mixed')}>
                  Array of functions and promises
                </Link>
              </LI>
              <LI>
                <Link onClick={() => setScreenName('tasks-object')}>
                  Object of promises
                </Link>
              </LI>
              <LI>
                <Link onClick={() => setScreenName('tasks-object-mixed')}>
                  Object of functions and promises
                </Link>
              </LI>
            </UL>
          </LI>
          <LI style={{ paddingTop:'1em' }}>
            State
            <UL style={{ paddingLeft: '0.5em'}}>
              <LI>
                <Link onClick={() => setScreenName('task-state')}>
                  Task State
                </Link>
              </LI>
              <LI>
                <Link onClick={() => setScreenName('promise-state')}>
                  Promise State
                </Link>
              </LI>
            </UL>
          </LI>
          <LI style={{ paddingTop:'1em' }}>
            Lifecycle Events
            <UL style={{ paddingLeft: '0.5em'}}>
              <LI>
                <Link onClick={() => setScreenName('lifecycle-starting')}>
                  onStarting
                </Link>
              </LI>
              <LI>
                <Link onClick={() => setScreenName('lifecycle-task-start')}>
                  onTaskStart
                </Link>
              </LI>
              <LI>
                <Link onClick={() => setScreenName('lifecycle-task-complete')}>
                  onTaskComplete
                </Link>
              </LI>
              <LI>
                <Link onClick={() => setScreenName('lifecycle-task-failed')}>
                  onTaskFailed
                </Link>
              </LI>
              <LI>
                <Link onClick={() => setScreenName('lifecycle-finished')}>
                  onFinished
                </Link>
              </LI>
            </UL>
          </LI>
          <LI style={{ paddingTop:'1em' }}>
            Rolling Back
            <UL style={{ paddingLeft: '0.5em'}}>
              <LI>
                <Link onClick={() => setScreenName('rollbacks')}>
                  Rollbacks
                </Link>
              </LI>
            </UL>
          </LI>
          <LI style={{ paddingTop:'1em' }}>
            Configuration
            <UL style={{ paddingLeft: '0.5em'}}>
              <LI>
                <Link onClick={() => setScreenName('config-logging')}>
                  useLogging
                </Link>
              </LI>
              <LI>
                <Link onClick={() => setScreenName('config-logger')}>
                  useLogger
                </Link>
              </LI>
            </UL>
          </LI>
        </UL>
      </div>
      <Column style={{ flex: 6, padding:'1em' }}>
        { screens[screenName] }
      </Column>
    </Row>
  );
};
