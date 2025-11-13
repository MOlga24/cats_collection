import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useDispatch } from "../services/store";
import { FiHeart } from "react-icons/fi";
import { searchItems } from "../utils/search";
import { getImagePath } from "../utils/utils";
import AddItemModal from "./AddItemModal";

interface SearchItem {
  id: string;
  title: string;
  price: string;
  images: Array<
    string | { id: number; image_url: string; sort_order?: number }
  >;
}
export default function Header() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [showResults, setShowResults] = useState(false);
  const items = useSelector((state: RootState) => state.items.items);
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const [isClicked, setIsClicked] = useState(location.pathname === "/favorite");
  const [isFocused, setIsFocused] = useState(false);
  const HeartIcon = FiHeart as React.ElementType;
  const SearchLineIcon = RiSearchLine as React.ElementType;
  const FiPlusIcon = FiPlus as React.ElementType;

  const handlePlusClick = () => {
    setIsAddModalOpen(true);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      const results = searchItems(query, items);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);    
  };
  const handleSearchBlur = () => {
    setTimeout(() => {
      setIsSearchFocused(false);
      setShowResults(false);
      setSearchQuery("");
    }, 200);
  };

  return (
    <header className="header">
      <div className="main_menu">
        <div className="sub_menu_search">
          <div className="search_left_icon">
            <HeartIcon
              tabIndex={0}
              className="icon_fav"
              style={{
                fill: isClicked ? "red" : "none",
                stroke: isHovered || isClicked || isFocused ? "red" : "white",
              }}
              onFocus={() => {
                setIsFocused(true);
                setIsHovered(true);
              }}
              onMouseLeave={() => setIsHovered(false)}
              onMouseEnter={() => setIsHovered(true)}
              onClick={() => {
                setIsClicked(true);
                navigate("/favorite");
              }}
              role="button"
              aria-label="Избранное"
            />
          </div>
          <div className="search_input_container">
            <SearchLineIcon
              className="icon_search"
              style={{ display: isSearchFocused ? "none" : "block" }}
            />
            <input
              id="search"
              className="search"
              value={searchQuery}
              onChange={handleSearch}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              placeholder="Поиск..."
            />

            {showResults && searchResults.length > 0 && (
              <div className="search_results">
                {searchResults.map((item) => (
                  <NavLink
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="search_result_item"
                  >
                    {item.images && item.images.length > 0 && (
                      <img
                        src={getImagePath(item.images[0])}
                        alt={item.title}
                        width="50"
                      />
                    )}
                    <div>
                      <p>{item.title}</p>
                      <p>{item.price} </p>
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
            {showResults && searchResults.length === 0 && (
              <div className="search_results">
                <p className="no_results">Ничего не найдено</p>
              </div>
            )}
          </div>

          <div className="search_right_icon" onClick={handlePlusClick}>
            <p>Добавить карточку</p>
            <FiPlusIcon
              className="icon_plus"
              onClick={handlePlusClick}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </header>
  );
}
