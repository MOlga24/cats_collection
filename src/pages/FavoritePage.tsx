import { Breadcrumbs } from "../utils/bredcrumps";
import { ShowNothing } from "../components/ShowNothing";
import { useDispatch, useSelector } from "react-redux";
import { TItem } from "../utils/types";
import { AppDispatch } from "../services/store";
import { ShowFavorite } from "../components/ShowFavorite";
import { loadFavoritesFromStorage, removeFavorite } from "../services/slices/itemsSlice";
import { FavoriteItemsSelector } from "../services/slices/itemsSlice";
import { getItemsCountText } from "../utils/utils";
import { useEffect } from "react";
interface BreadcrumbItem {
  label: string;
  link?: string;
}
export const Favorite = () => {
  const breadcrumbsItems: BreadcrumbItem[] = [
    { label: "Главная", link: "/products" },
    { label: "Избранное" },
  ];

  const favoriteItems = useSelector(FavoriteItemsSelector);
  const dispatch = useDispatch<AppDispatch>(); 
  const removeFromFavorites = (item: TItem) => {
    if (!item) return;

    dispatch(removeFavorite(item.id));
  };
  
  useEffect(() => {
    dispatch(loadFavoritesFromStorage());
  }, [dispatch]);
  return (
    <div className="main">
      <Breadcrumbs items={breadcrumbsItems} />
      <p className="profile_page_title">Избранное</p>
      <div className="favorites_count">
        {getItemsCountText(favoriteItems.length)}
      </div>
      <div className="basket_main">
        {favoriteItems.length > 0 ? (
          <ShowFavorite
            items={favoriteItems}
            isFavoritePage={true}
            toggleFavoriteItem={removeFromFavorites}
          />
        ) : (
          <ShowNothing isFavorite={true} />
        )}
      </div>
    </div>
  );
};

export default Favorite;
