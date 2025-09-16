import  {store, rootReducer } from "../services/store";
export type AppDispatch = typeof store.dispatch;
export type TServerResponse<T> = {
  success: boolean;
} & T;

export type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;
export type TItem = {
  id: string;
  title: string;
  description: string; 
  img?: string;
    images: Array<string | { id: number; image_url: string; sort_order?: number }>;
  fulldescription?: string;
  isFavorite?: boolean;
};

export type FavoritesResponse = {
  success: boolean;
  favorites: TItem[];
};
export type RootState = ReturnType<typeof rootReducer>;
export interface UserParams {
  id: string;
}

export const enum RequestStatus {
  Idle = "Idle",
  Loading = "Loading",
  Success = "Success",
  Failed = "Failed",
}



export type TItemsResponse = TServerResponse<{
  items: TItem[];
}>;




