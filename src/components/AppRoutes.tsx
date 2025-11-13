import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import { Home } from "../pages/HomePage";
import { ItemFull } from "../pages/ItemPage";
import { fetchItems } from "../services/slices/itemsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../services/store";
import { AppDispatch } from "../services/store";
import Favorite from "../pages/FavoritePage";
import { StartPage } from "../pages/StartPage";

const AppRoutes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.items);

  useEffect(() => {
    dispatch(fetchItems())
      .unwrap()
      .catch((err:any) => console.error("Fetch error:", err));
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/products" element={<Home />} />
        <Route path="/favorite" element={<Favorite />} />       
        <Route path="/product/:id" element={<ItemFull />} />{" "}
      </Routes>
    </div>
  );
};

export default AppRoutes;
