import { useSelector, useDispatch } from "react-redux";
import React, { useCallback, useMemo } from "react";
import { FiHeart, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { TItem } from "../utils/types";
import { RootState, AppDispatch } from "../services/store";
import {
  addFavorite,
  removeFavorite,
  removeItem,
} from "../services/slices/itemsSlice";

interface ItemProps {
  item: TItem;
  isFavoritePage: boolean;
  toggleFavoriteItem: (item: TItem) => void;
}

const Item = ({ item, isFavoritePage, toggleFavoriteItem }: ItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const mainImage = useMemo(() => {
    const images = item.images;
    if (images && images.length > 0) {
      if (typeof images[0] === "object" && images[0].image_url) {
        return images[0].image_url;
      }

      if (typeof images[0] === "string") {
        return images[0];
      }
    }
    return "/placeholder-image.jpg";
  }, [item.images]);
  const isFavorite = useSelector((state: RootState) =>
    state.items.items.some(
      (favItem) => favItem.id === item.id && favItem.isFavorite
    )
  );
  const handleDeleteClick = useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();
      e.preventDefault();

      if (window.confirm("Вы уверены, что хотите удалить карточку?")) {
        dispatch(removeItem(item.id));
      }
    },
    [dispatch, item.id]
  );
  const handleFavoriteClick = useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();
      e.preventDefault();

      if (isFavoritePage || toggleFavoriteItem) {
        toggleFavoriteItem(item);
      } else {
        if (isFavorite) {
          dispatch(removeFavorite(item.id));
        } else {
          dispatch(addFavorite(item.id));
        }
      }
    },
    [dispatch, isFavoritePage, item, isFavorite, toggleFavoriteItem]
  );

  const HeartIcon = FiHeart as React.ElementType;
  const FiTrashIcon = FiTrash2 as React.ElementType;

  return (
    <div className="item">
      <div className="full_item_image_icons">
        <HeartIcon
          onClick={handleFavoriteClick}
          fill={isFavorite ? "red" : "none"}
          color={isFavorite ? "red" : "gray"}
          className="icon_favorite"
          style={{ cursor: "pointer" }}
        />

        <FiTrashIcon onClick={handleDeleteClick} className="icon_delete" />
      </div>
      <Link
        to={`/product/${item.id}`}
        state={{ item }}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="item_image_container">
          <img
            src={mainImage}
            alt={item.title}
            className="item_image"
            onError={(e) => {
              if (e.currentTarget.src.startsWith("data:image/")) {
                e.currentTarget.src = "../../public/placeholder-image.jpg";
              } else {
                e.currentTarget.src = mainImage;
              }
            }}
          />
        </div>
        <h2 className="item_title">{item.title}</h2>
        <p className="item_description">{item.description}</p>
      </Link>
    </div>
  );
};

export default React.memo(Item);
