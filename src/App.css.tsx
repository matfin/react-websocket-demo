import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: grid;
  width: 100vw;
  min-height: 100vh;
  grid: 4rem auto / 1rem auto 1rem;
  grid-template-areas:
    "header header header"
    ". main ."
`;

export const Header = styled.header`
  grid-area: header;
  background-color: blue;
`

export const Main = styled.main`
  grid-area: main;
  background-color: red;
`
