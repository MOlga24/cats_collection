import React from 'react';
import Item from "./Item";
import { ShowNothing } from "./ShowNothing";
import { TItem } from "../utils/types";

interface ShowFavoriteProps {
  items: TItem[];
  isFavoritePage: boolean;
  toggleFavoriteItem: (item: TItem) => void;
}

export const ShowFavorite: React.FC<ShowFavoriteProps> = ({ 
  items, 
  isFavoritePage, 
  toggleFavoriteItem 
}) => {
  if (!items) return <div>Loading...</div>;
  if (!Array.isArray(items)) {
    return <ShowNothing />;
  }

  return (
    <div className="favorite_main">
      {items.map((el) => (
        <Item
          key={el.id}
          item={el} 
          isFavoritePage={isFavoritePage}
          toggleFavoriteItem={toggleFavoriteItem}
        />
      ))}
    </div>
  );
};