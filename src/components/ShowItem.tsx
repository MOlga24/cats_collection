import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { FiHeart, FiX, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../services/store";
import { RootState, TItem } from "../utils/types";

import {
  FavoriteItemsSelector,
  removeItem,
  selectFavoriteItems,
} from "../services/slices/itemsSlice";

export interface ShowItemProps {
  item: TItem;
  activeTab: string;
  toggleFavoriteItem: (item: TItem) => void;
}
const FiTrashIcon = FiTrash2 as React.ElementType;
const FiHeartIcon = FiHeart as React.ElementType;
const FiXIcon = FiX as React.ElementType;
const ShowItem = React.memo(
  ({ item, activeTab, toggleFavoriteItem }: ShowItemProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const reviewsRef = useRef<HTMLDivElement>(null);
    const favoriteItems = useSelector(FavoriteItemsSelector);
    const isFavorite = favoriteItems.some((favItem) => favItem.id === item.id);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      const ref =
        activeTab === "description"
          ? descriptionRef
          : activeTab === "reviews"
          ? reviewsRef
          : null;
      if (ref?.current) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [activeTab]);

    const mainImage = useMemo(() => {
      const images = item.images || [item.img];
      if (images && images.length > 0) {
        if (typeof images[0] === "object" && images[0].image_url) {
          return images[0].image_url;
        }
        if (typeof images[0] === "string") {
          return images[0];
        }
      }
      return "/placeholder-image.jpg";
    }, [item.images, item.img]);
    const openModal = useCallback(() => {
      setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
      setIsModalOpen(false);
    }, []);

    const handleToggleFavorite = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavoriteItem(item);
      },
      [toggleFavoriteItem, item]
    );
    const handleDeleteItem = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (window.confirm("Вы уверены, что хотите удалить эту карточку?")) {
          dispatch(removeItem(item.id));
          navigate("/");
        }
      },
      [dispatch, item.id, navigate]
    );
    const handleCloseModal = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        closeModal();
      },
      [closeModal]
    );

    if (!item) {
      return (
        <div className="item-not-found">
          <h2>Карточка не найдена</h2>
          <p>Попробуйте вернуться на главную страницу</p>
          <Link to="/">На главную</Link>
        </div>
      );
    }

    return (
      <>
        <div className="full_item">
          <div className="full_item_descriprion">
            <div className="full_item_image_icons">
              <FiTrashIcon
                onClick={handleDeleteItem}
                stroke="#868282ff"
                className="icon full_item_heart"
              />
              <FiHeartIcon
                onClick={handleToggleFavorite}
                fill={isFavorite ? "red" : "none"}
                color={isFavorite ? "red" : "gray"}
                className="icon full_item_heart"
              />
            </div>
            <img
              src={mainImage}
              alt={item.title}
              onClick={openModal}
              style={{ cursor: "pointer" }}
            />

            <p className="full_item_sub_title">Общая информация</p>
            <div className="full_item_description">
              <p className="full_item_title">{item.title}</p>
              <p className="full_item_desc">{item.description}</p>
            </div>

            <div ref={descriptionRef}>
              <p className="full_item_sub_title">Описание</p>
              <p className="full_item_sub_description">
                {item.fulldescription}
              </p>
            </div>

            <div ref={reviewsRef}>
              <p className="full_item_sub_title">Отзывы</p>
              <div className="full_item_description">
                <p>отзывов пока нет</p>
              </div>
            </div>
          </div>{" "}
          <div className="full_item_button">
            <button className="button" onClick={() => navigate("/products")}>
              Вернуться на главную
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className="image_modal" onClick={closeModal}>
            <div
              className="image_modal_content"
              onClick={(e) => e.stopPropagation()}
            >
              <FiXIcon
                className="image_modal_close"
                onClick={handleCloseModal}
              />
              <img
                src={mainImage}
                alt={item.title}
                className="image_modal_img"
              />
            </div>
          </div>
        )}
      </>
    );
  }
);

export default ShowItem;
