import React from 'react';
import { useContents } from './useContents';
import { Row, Column, UL, LI, Link } from '../styles/FlexStyles';

export const App = () => {
  const {
    content,
    setPage,
  } = useContents();
  return (
    <Row>
      <UL style={{padding:'1em'}}>
        <LI>
          <Link onClick={() => setPage('welcome')}>
            Welcome
          </Link>
        </LI>
        <LI>
          <Link onClick={() => setPage('array-series')}>
            Array Series
          </Link>
        </LI>
      </UL>
      <Column style={{padding:'1em'}}>
        {content}
      </Column>
    </Row>
  );
};
