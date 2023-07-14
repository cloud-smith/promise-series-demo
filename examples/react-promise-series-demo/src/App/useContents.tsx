import { useState } from 'react';
import { contents } from './Contents';

export const useContents = () => {
  const [state, setState] = useState({
    pageName: 'array-series',
    content: contents['array-series'](),
  });

  const setPage = async (pageName: string) => {
    const target = contents[pageName];
    let content = state.content;

    if (typeof target === 'function') content = target();
    else if (typeof target === 'object') content = await target();

    setState({
      ...state,
      pageName,
      content,
    });
  };

  return {
    ...state,
    setPage,
  };
};
