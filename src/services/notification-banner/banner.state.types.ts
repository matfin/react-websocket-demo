export enum BannerType {
  WARN,
  SUCCESS,
  ERROR,
}

export interface Payload {
  message?: string;
  type?: BannerType;
  delay?: number;
}

export interface BannerAction {
  type: string;
  payload?: Payload
}

export interface BannerState {
  isShowing: boolean;
  message?: string;
  type: BannerType
}