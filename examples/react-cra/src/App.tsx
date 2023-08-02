import React, { useState } from 'react';
import { Row, Column, UL, LI, Link } from './styles/FlexStyles';

import * as Examples from './examples';

export const App = () => {
  const screens: any = {
    default: 'Introduction',
    config: [
      'ConfigLogging',
      'ConfigLogger',
      'ConfigForceRollbacks',
      'ConfigForceParallelRollbacks',
    ],
    features: [
      'Rollbacks',
      'Timeouts',
      'PromiseUntil',
      'FindTask',
      'FindRollback',
    ],
    formats: [
      'TasksArray',
      'TasksArrayMixed',
      'TasksObject',
      'TasksObjectMixed',
    ],
    lifecycle: [
      'LifecycleStarting',
      'LifecycleTaskStart',
      'LifecycleTaskComplete',
      'LifecycleTaskFailed',
      'LifecycleFinished',
    ],
    state: [
      'PromiseState',
      'TaskState',
    ],
  };

  const [screenName, setScreenName] = useState(screens.default);
  const Screen = (Examples as any)[screenName];

  const getMenuItems = (menuName: string) => {
    return screens[menuName].map((item: any, index: number) => (
      <LI key={index}>
        <Link onClick={() => setScreenName(item)}>
          {item}
        </Link>
      </LI>
    ))
  };

  return (
    <Row>
      <div style={{ minWidth:'5em', padding:'1em' }}>
        <UL style={{ paddingTop:0 }}>
          <LI>
            <Link onClick={() => setScreenName('Introduction')}>
              Introduction
            </Link>
          </LI>
          <LI style={{ paddingTop:'1em' }}>
            Task Formats
            <UL style={{ paddingLeft: '0.5em'}}>
              {getMenuItems('formats')}
            </UL>
          </LI>
          <LI style={{ paddingTop:'1em' }}>
            State
            <UL style={{ paddingLeft: '0.5em'}}>
            {getMenuItems('state')}
            </UL>
          </LI>
          <LI style={{ paddingTop:'1em' }}>
            Lifecycle Events
            <UL style={{ paddingLeft: '0.5em'}}>
              {getMenuItems('lifecycle')}
            </UL>
          </LI>
          <LI style={{ paddingTop:'1em' }}>
            Misc Features
            <UL style={{ paddingLeft: '0.5em'}}>
              {getMenuItems('features')}
            </UL>
          </LI>
          <LI style={{ paddingTop:'1em' }}>
            Configuration
            <UL style={{ paddingLeft: '0.5em'}}>
              {getMenuItems('config')}
            </UL>
          </LI>
        </UL>
      </div>
      <Column style={{ flex: 6, padding:'1em' }}>
        <Screen />
      </Column>
    </Row>
  );
};
