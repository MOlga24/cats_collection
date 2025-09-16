import React from "react";
import Item from "./Item";
import { TItem } from "../utils/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../services/store";
import { toggleFavorite } from "../services/slices/itemsSlice";

interface ItemsProps {
  items: TItem[];
}

export const Items = React.memo(({ items }: ItemsProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleFavorite = (item: TItem) => {
    dispatch(toggleFavorite(item.id));
  };

  if (!items || !Array.isArray(items)) {
    return <p>Товары отсутствуют</p>;
  }

  if (items.length === 0) {
    return <p>Товары не найдены</p>;
  }

  return (
    <main>
      {items.map((el) => (
        <Item
          key={el.id}
          item={el}
          isFavoritePage={false}
          toggleFavoriteItem={handleToggleFavorite}
        />
      ))}
    </main>
  );
});

export default Items;
