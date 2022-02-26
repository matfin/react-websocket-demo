import { createSelector } from '@reduxjs/toolkit';

import { BannerAction, BannerState, BannerType } from './banner.state.types';

const REDUCER_NAME = `banner`;

/** Action types */
const SHOW_BANNER = `${REDUCER_NAME}/SHOW_BANNER`;
const HIDE_BANNER = `${REDUCER_NAME}/HIDE_BANNER`;

/** Actions */
const showBanner = (
  message: string,
  type: BannerType,
  delay = 2000
): BannerAction => ({
  type: SHOW_BANNER,
  payload: {
    message,
    type,
    delay,
  },
});

const hideBanner = (): BannerAction => ({
  type: HIDE_BANNER,
});

/** Reducer */
const initialState: BannerState = {
  isShowing: false,
  message: undefined,
  type: BannerType.SUCCESS,
};

const reducer = (
  state: BannerState = initialState,
  action: BannerAction
): BannerState => {
  const { type, payload } = action;

  switch (type) {
    case SHOW_BANNER: {
      return {
        ...state,
        isShowing: true,
        message: payload!.message!,
        type: payload!.type!,
      };
    }
    case HIDE_BANNER: {
      return {
        ...state,
        isShowing: false,
        message: undefined,
        type: BannerType.SUCCESS,
      };
    }
    default: {
      return state;
    }
  }
};

/** Selectors */
const isShowingSelector = ({ banner: { isShowing } }: { banner: BannerState }): boolean => isShowing;
const messageSelector = ({ banner: { message } }: { banner: BannerState }): string | undefined => message;
const typeSelector = ({ banner: { type } }: { banner: BannerState }): BannerType => type;

const selectIsShowing = createSelector(
  isShowingSelector,
  (isShowing: boolean): boolean => isShowing
);

const selectMessage = createSelector(
  messageSelector,
  (message: string | undefined): string | undefined => message
);

const selectType = createSelector(
  typeSelector,
  (type: BannerType): BannerType => type
);

const bannerState = {
  name: REDUCER_NAME,
  reducer,
  types: {
    SHOW_BANNER,
    HIDE_BANNER,
  },
  selectors: {
    getMessage: selectMessage,
    getType: selectType,
    getIsShowing: selectIsShowing,
  },
  actions: {
    showBanner,
    hideBanner,
  },
};

export default bannerState;
