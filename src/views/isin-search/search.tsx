import React, { useEffect } from 'react';

export interface Props {
  componentId?: string;
}

export const Search = ({ componentId }: Props): JSX.Element => {
  useEffect((): (() => void) => {
    console.log(`${componentId} mounted`);

    return (): void => console.log(`${componentId} unmounted`)
  });

  return (
    <div>
      <h1>This will be ISIN search</h1>
    </div>
  );
};

export default Search;
