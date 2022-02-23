import { CombinedAppState } from '../../store.types';
import { BannerState, BannerType } from './banner.state.types';
import bannerState from './banner.state';

describe('banner state', (): void => {
  describe('actions', (): void => {
    it('returns the correct payload for showBanner', (): void => {
      expect(
        bannerState.actions.showBanner('Test', BannerType.SUCCESS, 3000)
      ).toEqual({
        type: bannerState.types.SHOW_BANNER,
        payload: {
          message: 'Test',
          type: BannerType.SUCCESS,
          delay: 3000,
        },
      });

      expect(
        bannerState.actions.showBanner('Test', BannerType.SUCCESS)
      ).toEqual({
        type: bannerState.types.SHOW_BANNER,
        payload: {
          message: 'Test',
          type: BannerType.SUCCESS,
          delay: 2000,
        },
      });
    });

    it('returns the correct payload for hideBanner', (): void => {
      expect(bannerState.actions.hideBanner()).toEqual({
        type: bannerState.types.HIDE_BANNER,
      });
    });
  });

  describe('reducer', (): void => {
    it('sets the state with SHOW_BANNER', (): void => {
      const result: BannerState = bannerState.reducer(
        undefined,
        bannerState.actions.showBanner('Test', BannerType.SUCCESS, 3000)
      );
      const expected: BannerState = {
        isShowing: true,
        message: 'Test',
        type: BannerType.SUCCESS,
      };

      expect(result).toEqual(expected);
    });

    it('sets the state with HIDE_BANNER', (): void => {
      const result: BannerState = bannerState.reducer(
        undefined,
        bannerState.actions.hideBanner()
      );
      const expected: BannerState = {
        isShowing: false,
        message: undefined,
        type: BannerType.SUCCESS,
      };

      expect(result).toEqual(expected);
    });

    it('returns the default state', (): void => {
      const result: BannerState = bannerState.reducer(undefined, {
        type: 'SOMETHING_ELSE',
      });
      const expected: BannerState = {
        isShowing: false,
        message: undefined,
        type: BannerType.SUCCESS,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('selectors', (): void => {
    const appState: CombinedAppState = {
      search: {
        companies: [],
        searchTerm: ''
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
        isShowing: false,
        message: 'Test'
      }
    };

    it('getMessage', (): void => {
      expect(bannerState.selectors.getMessage(appState)).toEqual('Test');
    });

    it('getType', (): void => {
      expect(bannerState.selectors.getType(appState)).toEqual(BannerType.SUCCESS);
    });

    it('getIsShowing', (): void => {
      expect(bannerState.selectors.getIsShowing(appState)).toEqual(false);
    });
  });
});
