import React, { useCallback } from 'react';

import { Company } from '../../services/isin-search/search.state.types';
import { Container, Isin, ShortName, Title } from './search-result.css';

export interface Props {
  className?: string;
  company: Company;
  onPress?: (company: Company) => void;
}

const SearchResult = ({ className, company, onPress }: Props): JSX.Element => {
  const handleOnClick = useCallback((): void => {
    onPress && onPress(company);
  }, [company]);

  return (
    <Container className={className} onClick={handleOnClick} role="button">
      <Title>
        {company.name}
      </Title>
      <Isin>
        {company.isin}
      </Isin>
      <ShortName>
        {company.shortName}
      </ShortName>
    </Container>
  );
};

export default SearchResult;