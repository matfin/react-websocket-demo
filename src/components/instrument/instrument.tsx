import React, { useCallback } from 'react';

import { formattedCurrency } from 'utils';

import { Company } from 'services/isin-search/search.state.types';
import { Instrument } from 'services/isin-list/list.state.types';
import {
  Container,
  CompanyInfo,
  CompanyName,
  CompanyMetadata,
  PriceInfo,
  PriceItem,
  PriceItemLabel,
  Price,
  DeleteButton,
  DeleteIcon,
} from './instrument.css';

export interface Props {
  className?: string;
  role?: string;
  instrument: Instrument;
  onPressDelete: (company: Company) => void;
}

const InstrumentTile = ({ className, role, instrument, onPressDelete }: Props): JSX.Element => {
  const {
    company,
    stockData,
  } = instrument;

  const handlePressDelete = useCallback((): void => onPressDelete(instrument.company), []);

  return (
    <Container role={role} className={className} onClick={handlePressDelete}>
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
          <PriceItemLabel>
            Bid
          </PriceItemLabel>
          <Price>
            {formattedCurrency(stockData.bid)}
          </Price>
        </PriceItem>
        <PriceItem>
          <PriceItemLabel>
            Ask
          </PriceItemLabel>
          <Price>
            {formattedCurrency(stockData.ask)}
          </Price>
        </PriceItem>
        <PriceItem>
          <PriceItemLabel>
            Price
          </PriceItemLabel>
          <Price>
            {formattedCurrency(stockData.price)}
          </Price>
        </PriceItem>
        <DeleteButton data-testid={`delete-instrument-${instrument.company.isin}`}>
          <DeleteIcon />
        </DeleteButton>
      </PriceInfo>
    </Container>
  );
};

export default InstrumentTile;
