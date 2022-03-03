import { CombinedAppState } from '../store.types';
import { BannerType } from '../services/notification-banner/banner.state.types';

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

export default mockState;