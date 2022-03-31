## React Websocket Demo

This is a single page web application created using [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) and demonstrates the use of [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) to track prices for a particular companys stock.

In this app, users select a company they are interested in from a searchable list, and a tile shows the companys stock info in real time.

### Installation

#### You will need the following to run this app:

- [NodeJS](https://nodejs.org/en/) v16.13.2
  - *Note* Use [NVM](https://github.com/nvm-sh/nvm) to install the correct version
- The [Yarn](https://yarnpkg.com/) package manager
- A modern web browser such as [Google Chrome](https://www.google.com/intl/en_ie/chrome/)

#### Set up instructions
- Navigate to the root directory for this project
- Install dependencies with `$> yarn`

#### Commands
- `$> yarn start` runs the application and serves from [http://localhost:3000](http://localhost:3000)
- `$> yarn test` runs all the tests
- `$> yarn coverage` runs all tests with a coverage report
- `$> yarn lint` runs code quality checks
- `$> yarn csslint` runs css style checks

#### Tech stack
- This project has been written in [TypeScript](https://www.typescriptlang.org/)
- This app uses [ReactJS](https://reactjs.org/), a Javascript library for creating single page applications.
- Functional components are used with React hooks, as opposed to class based components with built-in lifecycle methods.
- For state management, [Redux Saga](https://redux-saga.js.org/) is used.
- To improve state management, [Redux Reselect](https://github.com/reduxjs/reselect) is used to create memoized selectors.
- For styling, [styled-components](https://styled-components.com/) are used. Styled components facilitate [css-in-js](https://en.wikipedia.org/wiki/CSS-in-JS) but it's not a component library in and of itself. You need to be comfortable with vanilla CSS to use it.
- For testing, the following set up is used:
  - components are tested using [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  - redux sagas are tested using [Redux Saga Test Plan](https://github.com/jfairbank/redux-saga-test-plan)
  - the test runner used is [Jest](https://jestjs.io/) for running tests and creating mocks and stubs

#### Architecture
- Inside the `src/services/` directory, there are four main services as follows:
  - **connection** takes care of setting up a connection to the WebSocket server and tracking it.
  - **isin-list** takes care of managing a list of subscribed companies, including subscribing to them and unsubscribing them when they are added and removed from the list.
  - **isin-search** takes care of filtering search results for company isins.
  - **notification-banner** takes care of showing notifications to the user.

- Inside the `src/views/` directory, there are the two main views as follows:
  - **isin-list** for displaying a list of subscribed instruments
    - `list.css.tsx` contains the styling for the list
    - `list.test.tsx` contains component unit tests
    - `list.tsx` contains the component logic and uses [Redux connect](https://react-redux.js.org/api/connect) to wire it up to the state.
  - **isin-search**
    - `search.css.tsx` contains styling
    - `search.test.tsx` for component unit tests
    - `search.tsx` contains the component logic as above.

- Inside the `src/styles` directory, there is the following:
  - `global.ts` contains the global styles for the app and some rules to implement resets for certain elements.
  - `mixins.ts` contains CSS mixins to be used in styled components, such as for media queries or setting fonts.
  - `vars.ts` contains variables for things such as breakpoints, font sizes, colours etc.
  - `vars.types.ts` contains the type definitions for the style variables.

#### FAQ

##### Q: What happens if the websocket connection is lost?
When the WebSocket disconnects, a banner is shown to the user informing them that the connection is lost. When the connection is re-established, the websocket automatically receives data being sent to the server and the feeds update in real time.

Aside from that, a warning is also shown if the server goes down. In this instance, the current connection is reset and an attempt is made to re-establish the connection every 5 seconds until success.

##### Q: What happens if a user tries to add an instrument multiple times?
When using this app, a user won't be able to add an instrument more than once, because the state management keeps track of instruments already added when conducing a search. If the user taps on a search result from the list of items on the search view, and the company is already and subscribed and in the list, the company will be unsubscribed.

The list of instruments displayed with real time data are designed to call to subscribe to the websocket by sending a `{ subscribe: <isin> }` payload when they are added. When an instrument is removed from the list, a call to unsubscribe is made by sending `{ unsubscribe: <isin> }`. Once the call to unsubscribe has succeeded, the instrument is removed from the list.

##### Q: What other performance considerations have been made?
It's also worth noting that when the user has a list of instruments they are subscribed to and they navigate to the list view, a call to subscribe to the websocket feed for al these insturments is made.

When the user navigates away from the list view, a call to unsibscribe from all feeds is made, so as not to create any unnecessary connection and state updates.

The use of selectors has also been included when accessing state variables from either the components themselves or the redux sagas for state management. Redux `createSelect` memoizes selectors, so if the inputs are the same, the output will be cached for improved performance.

A custom memoization function has been added when fetching a list of ISINs to determine which ones should be bookmarked on the search results view. The output for the selector has a custom equality check to prevent unnecessary updates to `mapDispatchToProps`, which then may trigger unnecessary re-renders in the search view component.

Careful consideration has also been given to potentially expensive operations, so these are kept in the Redux saga logic and out of the components.

A strict teardown for WebSocket connections has also been implemented to prevent memory leaks.

