import styled from 'styled-components'

import { boxShadow } from '../../styles/vars';
import InstrumentTile from '../../components/instrument/instrument';

export const Container = styled.div`
  display: grid;
  width: 100%;
  grid: 1rem auto / auto;
  grid-template-areas:
    'actionbox'
    'instrument-tile-list';
`;

export const InstrumentTileList = styled.ul`
  grid-area: instrument-tile-list;
`;

export const InstrumentItem = styled(InstrumentTile)`
  margin: 1rem;
  padding: 0.5rem;
  ${boxShadow};
`;

export const NoInstruments = styled.h2`
  margin: 2rem 1rem 0;
`;