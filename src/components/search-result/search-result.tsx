import React, { useCallback } from 'react';

import { Company } from 'services/isin-search/search.state.types';
import {
  BookmarkButton,
  BookmarkIcon,
  BookmarkFilledIcon,
  Container,
  CompanyDetails,
  Title,
} from './search-result.css';

export interface Props {
  className?: string;
  company: Company;
  onPress: (company: Company) => void;
}

const SearchResult = ({ className, company, onPress }: Props): JSX.Element => {
  const buttonName: string = company.bookmarked
    ? 'Remove bookmark'
    : 'Add bookmark';

  const handleOnClick = useCallback((): void => {
    onPress(company);
  }, [company]);

  return (
    <Container className={className}>
      <Title>{company.name}</Title>
      <CompanyDetails>
        {company.isin} / {company.shortName}
      </CompanyDetails>
      <BookmarkButton name={buttonName} aria-label={buttonName} onClick={handleOnClick}>
        {company.bookmarked ? (
          <BookmarkFilledIcon aria-hidden="true" />
        ) : (
          <BookmarkIcon aria-hidden="true" />
        )}
      </BookmarkButton>
    </Container>
  );
};

export default SearchResult;
