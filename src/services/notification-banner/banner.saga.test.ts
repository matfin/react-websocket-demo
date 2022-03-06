import { expectSaga } from 'redux-saga-test-plan';

import { BannerType } from 'services/notification-banner/banner.state.types';
import bannerState from './banner.state';
import rootSaga from './banner.saga';

import mockState from 'mocks/mockState';

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