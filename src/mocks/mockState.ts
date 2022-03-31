import { CombinedAppState } from 'store.types';
import { BannerType } from 'services/notification-banner/banner.state.types';

const mockState: CombinedAppState = {
  search: {
    companies: [],
    searchTerm: '',
  },
  list: {
    instruments: {},
  },
  connection: {
    socket: null,
  },
  banner: {
    type: BannerType.SUCCESS,
    isShowing: false
  }
};

export default mockState;