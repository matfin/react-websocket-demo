import React from 'react';

import { formattedCurrency } from '../../utils';

import { Instrument } from '../../services/isin-list/list.state.types';
import {
  Container,
  CompanyInfo,
  CompanyName,
  CompanyMetadata,
  PriceInfo,
  PriceItem
} from './instrument.css';

export interface Props {
  className?: string;
  instrument: Instrument;
}

const InstrumentTile = ({ className, instrument }: Props): JSX.Element => {
  const {
    company,
    bid,
    price,
    ask
  } = instrument;

  return (
    <Container className={className}>
      <CompanyInfo>
        <CompanyName>
          {company.name}
        </CompanyName>
        <CompanyMetadata>
          {company.shortName} / {company.isin}
        </CompanyMetadata>
      </CompanyInfo>
      <PriceInfo>
        <PriceItem>
          Bid {formattedCurrency(bid)}
        </PriceItem>
        <PriceItem>
          Ask {formattedCurrency(ask)}
        </PriceItem>
        <PriceItem>
          Price {formattedCurrency(price)}
        </PriceItem>
      </PriceInfo>
    </Container>
  );
};

export default InstrumentTile;
