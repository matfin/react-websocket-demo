import styled, { css } from 'styled-components'

import { boxShadow, fonts } from '../../styles/vars';
import { font, media } from '../../styles/mixins';

import InstrumentTile from '../../components/instrument/instrument';
import { CompanyMetadata, PriceInfo, PriceItem, Price } from '../../components/instrument/instrument.css';

export const Container = styled.div`
  display: grid;
  width: 100%;
  grid: 1rem auto / auto;
  grid-template-areas:
    '.'
    'instrument-tile-list';
`;

export const InstrumentTileList = styled.ul`
  grid-area: instrument-tile-list;
  display: flex;
  flex-direction: column;

  ${media.md(`
    flex-direction: row;
    flex-flow: row wrap;
  `)}
`;

export const InstrumentItem = styled(InstrumentTile)`
  flex: 1;
  margin: 1rem;
  padding: 0.5rem;
  ${boxShadow};

  ${media.md(css`
    margin: 0.5rem;
    flex: 0 1 calc(50% - 1rem);
  `)}

  ${media.lg(css`
    flex: 0 1 calc(33% - 1rem);
  `)}

  ${media.xl(css`
    flex: 0 1 calc(25% - 1rem);
  `)}

  ${CompanyMetadata} {
    ${media.lg(`
      ${font(fonts.md)}
    `)}
  }

  ${PriceInfo} {
    ${media.lg(`
      flex-direction: column;
      justify-items: flex-end;
    `)}
  }

  ${PriceItem} {
    ${media.lg(`
      margin: 0.5rem 0;
      flex-direction: row;
      justify-content: space-between;
      ${font(fonts.md)}
    `)}
  }

  ${Price} {
    ${media.lg(`
      ${font(fonts.lg)}
    `)}
  }

`;

export const NoInstruments = styled.h2`
  margin: 2rem 1rem 0;
`;