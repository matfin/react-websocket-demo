import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';

import { CombinedAppState } from 'store.types';
import ListState from 'services/isin-list/list.state';
import { Company } from 'services/isin-search/search.state.types';
import { Instrument } from 'services/isin-list/list.state.types';
import { Props as InstrumentTileProps } from 'components/instrument/instrument';

import {
  Container,
  InstrumentTileList,
  InstrumentItem,
  NoInstruments,
} from './list.css';

export interface Props {
  unsubscribe: (company: Company) => void;
  unsubscribeAll: () => void;
  resubscribeAll: () => void;
  instruments: Instrument[];
}

const MemoInstrumentItem = memo(
  (props: InstrumentTileProps): JSX.Element => <InstrumentItem {...props} />
);

MemoInstrumentItem.displayName = 'InstrumentTile';

export const List = ({
  unsubscribe,
  unsubscribeAll,
  resubscribeAll,
  instruments,
}: Props): JSX.Element => {
  const shouldShowNoInstruments: boolean = instruments.length === 0;

  useEffect((): (() => void) => {
    resubscribeAll();

    return (): void => unsubscribeAll();
  }, []);

  return (
    <Container>
      {shouldShowNoInstruments ? (
        <NoInstruments>
          Add some companies to see the latest updates!
        </NoInstruments>
      ) : (
        <InstrumentTileList>
          {instruments.map(
            (instrument: Instrument): JSX.Element => (
              <MemoInstrumentItem
                role="instrument"
                key={instrument.company.isin}
                instrument={instrument}
                onPressDelete={unsubscribe}
              />
            )
          )}
        </InstrumentTileList>
      )}
    </Container>
  );
};

/* istanbul ignore next */
const mapStateToProps = (store: CombinedAppState) => ({
  instruments: ListState.selectors.getInstruments(store),
});

const mapDispatchToProps = {
  unsubscribe: ListState.actions.unsubscribe,
  unsubscribeAll: ListState.actions.unsubscribeAll,
  resubscribeAll: ListState.actions.resubscribeAll,
  reset: ListState.actions.reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
