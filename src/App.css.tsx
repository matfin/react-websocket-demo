import styled from 'styled-components';

import { colours } from './styles/vars'

export const Container = styled.div`
  position: relative;
  display: grid;
  width: 100vw;
  min-height: 100vh;
  grid: 3.5rem auto / auto;
  grid-template-areas:
    "header"
    "main"
`;

export const Header = styled.header`
  position: fixed;
  width: 100%;
  height: 3.5rem;
  background-color: ${colours.primary};
`

export const Main = styled.main`
  grid-area: main; 
`
