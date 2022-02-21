import React, { useCallback } from 'react';

import { formattedCurrency } from '../../utils';

import { Instrument } from '../../services/isin-list/list.state.types';
import {
  Container,
  CompanyInfo,
  CompanyName,
  CompanyMetadata,
  PriceInfo,
  PriceItem,
  DeleteButton,
  DeleteIcon,
} from './instrument.css';

export interface Props {
  className?: string;
  role?: string;
  instrument: Instrument;
  onPressDelete: (instrument: Instrument) => void;
}

const InstrumentTile = ({ className, role, instrument, onPressDelete }: Props): JSX.Element => {
  const {
    company,
    stockData,
  } = instrument;

  const handlePressDelete = useCallback((): void => onPressDelete(instrument), []);

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
          Bid {formattedCurrency(stockData.bid)}
        </PriceItem>
        <PriceItem>
          Ask {formattedCurrency(stockData.ask)}
        </PriceItem>
        <PriceItem>
          Price {formattedCurrency(stockData.price)}
        </PriceItem>
        <DeleteButton data-testid={`delete-instrument-${instrument.company.isin}`}>
          <DeleteIcon />
        </DeleteButton>
      </PriceInfo>
    </Container>
  );
};

export default InstrumentTile;
