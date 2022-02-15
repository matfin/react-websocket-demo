import React from 'react';

export interface Props {
  componentId?: string;
}

export const List = ({ componentId }: Props): JSX.Element => {
  return (
    <div>
      <h1>This will be a list of ISINs</h1>
    </div>
  );
};

export default List;
