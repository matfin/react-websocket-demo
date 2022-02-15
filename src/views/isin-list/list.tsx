import React, { useEffect } from 'react';

export interface Props {
  componentId?: string;
}

export const List = ({ componentId }: Props): JSX.Element => {
  useEffect((): (() => void) => {
    console.log(`${componentId} mounted`);

    return (): void => console.log(`${componentId} unmounted`)
  });

  return (
    <div>
      <h1>This will be a list of ISINs</h1>
    </div>
  );
};

export default List;
