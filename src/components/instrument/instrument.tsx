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
  instrument: Instrument;
  onPressDelete: (company: Company) => void;
}

const InstrumentTile = ({
  className,
  instrument,
  onPressDelete,
}: Props): JSX.Element => {
  const { company, stockData } = instrument;

  const handlePressDelete = useCallback(
    (): void => onPressDelete(instrument.company),
    [instrument.company, onPressDelete]
  );

  return (
    <Container className={className}>
      <CompanyInfo>
        <CompanyName>{company.name}</CompanyName>
        <CompanyMetadata>
          {company.shortName} / {company.isin}
        </CompanyMetadata>
      </CompanyInfo>
      <PriceInfo>
        <PriceItem>
          <PriceItemLabel>Bid</PriceItemLabel>
          <Price>{formattedCurrency(stockData.bid)}</Price>
        </PriceItem>
        <PriceItem>
          <PriceItemLabel>Ask</PriceItemLabel>
          <Price>{formattedCurrency(stockData.ask)}</Price>
        </PriceItem>
        <PriceItem>
          <PriceItemLabel>Price</PriceItemLabel>
          <Price>{formattedCurrency(stockData.price)}</Price>
        </PriceItem>
        <DeleteButton
          onClick={handlePressDelete}
          name="Delete instrument"
          data-testid={`delete-instrument-${instrument.company.isin}`}
        >
          <DeleteIcon aria-hidden="true" />
        </DeleteButton>
      </PriceInfo>
    </Container>
  );
};

export default InstrumentTile;
