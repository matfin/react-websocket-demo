import React from 'react';
import { connect } from 'react-redux';

import { CombinedAppState } from '../../store.types';
import ListState from '../../services/isin-list/list.state';
import { Instrument } from '../../services/isin-list/list.state.types';

import {
  Container,
  InstrumentTileList,
  InstrumentItem,
  NoInstruments,
} from './list.css';

export interface Props {
  unsubscribe: (instrument: Instrument) => void;
  instruments: Instrument[];
}

export const List = ({ unsubscribe, instruments }: Props): JSX.Element => {
  const shouldShowNoInstruments: boolean = instruments.length === 0;

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
              <InstrumentItem
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
  reset: ListState.actions.reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
