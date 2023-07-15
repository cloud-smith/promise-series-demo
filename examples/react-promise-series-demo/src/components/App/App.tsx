import React, { useState } from 'react';
import { Row, Column, UL, LI, Link } from '../../styles/FlexStyles';

import {
  ArraySeries,
  NamedSeries,
  MixedArrays,
  PromiseState,
  TaskState,
} from '../../examples';

const contents: any = {
  'array-series': { label: 'Array Series', component: <ArraySeries /> },
  'named-series': { label: 'Named Series', component: <NamedSeries /> },
  'mixed-arrays': { label: 'Mixed Arrays', component: <MixedArrays /> },
  'promise-state': { label: 'Promise State', component: <PromiseState /> },
  'task-state': { label: 'Task State', component: <TaskState /> },
};

export const App = () => {
  const [state, setState] = useState({
    screenName: 'array-series',
  });

  const handleScreenChange = (screenName: string) =>
    setState({ screenName });

  const screen = contents[state.screenName].component;

  const navigation = Object.keys(contents).map((item, index) => (
    <LI key={index}>
      <Link onClick={() => handleScreenChange(item)}>
        {contents[item].label}
      </Link>
    </LI>
  ));

  return (
    <Row>
      <UL style={{padding:'1em'}}>
        {navigation}
      </UL>
      <Column style={{padding:'1em'}}>
        {screen}
      </Column>
    </Row>
  );
};
