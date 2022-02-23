import { expectSaga } from 'redux-saga-test-plan';

import { CombinedAppState } from '../../store.types';
import { BannerType } from '../notification-banner/banner.state.types';
import bannerState from './banner.state';
import rootSaga from './banner.saga';

const mockState: CombinedAppState = {
  search: {
    companies: [],
    searchTerm: '',
  },
  list: {
    instruments: {},
  },
  connection: {
    connected: false,
    error: null,
    socket: null,
    listening: false,
  },
  banner: {
    type: BannerType.SUCCESS,
    isShowing: false
  }
};

describe('banner saga', (): void => {
  it('should handle showing then hiding the banner', async (): Promise<void> => {
    await expectSaga(rootSaga)
      .withState(mockState)
      .provide({
        /* eslint-disable */ 
        call: () => {} // because .delay() doesn't work
      })
      .put(bannerState.actions.hideBanner())
      .dispatch(bannerState.actions.showBanner('Test', BannerType.SUCCESS, 2000))
      .silentRun()
  });
});