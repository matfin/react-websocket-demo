import React, { useCallback } from 'react';

import { Company } from 'services/isin-search/search.state.types';
import { BookmarkIcon, BookmarkFilledIcon, Container, CompanyDetails, Title } from './search-result.css';

export interface Props {
  className?: string;
  company: Company;
  onPress: (company: Company) => void;
}

const SearchResult = ({ className, company, onPress }: Props): JSX.Element => {
  const handleOnClick = useCallback((): void => {
    onPress(company);
  }, [company]);

  return (
    <Container className={className} onClick={handleOnClick} role="button">
      <Title>
        {company.name}
      </Title>
      <CompanyDetails>
        {company.isin} / {company.shortName}
      </CompanyDetails>
      {company.bookmarked ? (
        <BookmarkFilledIcon />
      ) : (
        <BookmarkIcon />
      )}
    </Container>
  );
};

export default SearchResult;