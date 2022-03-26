import styled from 'styled-components';
import { font } from 'styles/mixins';
import { colours, fonts } from 'styles/vars';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputBox = styled.input`
  flex-grow: 1;
  border: 0;
  border-radius: 0;
  border-bottom: 0.125rem solid ${colours.primary};

  ::placeholder {
    color: ${colours.tertiary};
  }

  ${font(fonts.md)};
`;

export const Label = styled.label`
  flex: 0 1 1rem;
  ${font(fonts.sm)};
`;