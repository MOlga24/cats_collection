import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { TItem } from "../../utils/types";
import { getItemsApi } from "../../utils/TestApi";

export interface ItemsListState {
  items: TItem[];
  isLoading: boolean;
  error: string | undefined;
}

export const initialState: ItemsListState = {
  items: [],
  isLoading: false,
  error: "",
};

export const fetchItems = createAsyncThunk("api/fetchAll", async () => {
  const response = await getItemsApi();
  return response;
});

const selectItems = (state: ItemsListState) => state.items;
const selectIsLoading = (state: ItemsListState) => state.isLoading;

export const selectIsLoadingState = createSelector(
  [selectIsLoading],
  (isLoading) => isLoading
);

export const selectAllItems = createSelector([selectItems], (items) => items);
export const selectFavoriteItems = createSelector([selectItems], (items) =>
  items.filter((item) => item.isFavorite === true)
);

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TItem>) => {
      state.items.unshift(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      const favoriteItems = state.items.filter((it) => it.isFavorite);
      const itemIds = favoriteItems.map((it) => it.id);

      localStorage.setItem("favoriteState", JSON.stringify({ items: itemIds }));
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        item.isFavorite = !item.isFavorite;

        const favoriteItems = state.items.filter((it) => it.isFavorite);
        const itemIds = favoriteItems.map((it) => it.id);
        localStorage.setItem(
          "favoriteState",
          JSON.stringify({ items: itemIds })
        );
      }
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && !item.isFavorite) {
        item.isFavorite = true;

        const favoriteItems = state.items.filter((it) => it.isFavorite);
        const itemIds = favoriteItems.map((it) => it.id);
        localStorage.setItem(
          "favoriteState",
          JSON.stringify({ items: itemIds })
        );
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.isFavorite) {
        item.isFavorite = false;

        const favoriteItems = state.items.filter((it) => it.isFavorite);
        const itemIds = favoriteItems.map((it) => it.id);
        localStorage.setItem(
          "favoriteState",
          JSON.stringify({ items: itemIds })
        );
      }
    },
    loadFavoritesFromStorage: (state) => {
      try {
        const stored = localStorage.getItem("favoriteState");
        if (stored) {
          const { items: favoriteIds } = JSON.parse(stored);

          state.items.forEach((item) => {
            item.isFavorite = false;
          });

          favoriteIds.forEach((id: string) => {
            const item = state.items.find((item) => item.id === id);
            if (item) {
              item.isFavorite = true;
            }
          });
        }
      } catch (error) {
        console.error("Error loading favorites from localStorage:", error);
      }
    },
  },
  selectors: {
    getCategoriesSelector: selectItems,
    isLoadingSelector: selectIsLoading,
    FavoriteItemsSelector: selectFavoriteItems,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload || [];
        state.isLoading = false;
        state.error = "";
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const {
  addItem,
  removeItem,
  toggleFavorite,
  addFavorite,
  removeFavorite,
  loadFavoritesFromStorage,
} = itemsSlice.actions;
export const {
  getCategoriesSelector,
  isLoadingSelector,
  FavoriteItemsSelector,
} = itemsSlice.selectors;
export default itemsSlice.reducer;
